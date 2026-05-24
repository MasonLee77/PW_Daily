pipeline {
    agent any

    parameters {
        choice(
            name: 'ENVIRONMENT',
            choices: ['local', 'staging', 'production'],
            description: 'Environment to run tests against'
        )
        booleanParam(
            name: 'HEADED_MODE',
            defaultValue: false,
            description: 'Run tests with visible browser (headed mode)'
        )
        booleanParam(
            name: 'PUBLISH_REPORTS',
            defaultValue: true,
            description: 'Publish Allure and Playwright reports'
        )
    }

    environment {
        NODE_VERSION = '18'
        CI = 'true'
        BASE_URL = 'https://material.playwrightvn.com/'
        TEST_USER_NAME = 'playwright_viet_nam'
        TEST_USER_EMAIL = 'playwrightvietnam@gmail.com'
        ACTION_TIMEOUT = '10000'
        NAVIGATION_TIMEOUT = '30000'
        EXPECT_TIMEOUT = '10000'
        ALLURE_RESULTS_DIR = 'allure-results'
    }

    options {
        // Keep last 20 builds
        buildDiscarder(logRotator(numToKeepStr: '20'))
        // Timeout after 30 minutes
        timeout(time: 30, unit: 'MINUTES')
        // Disable concurrent builds for this project
        disableConcurrentBuilds()
    }

    triggers {
        // Poll GitHub every 5 minutes
        pollSCM('H/5 * * * *')
        // Webhook trigger (GitHub/GitLab will send POST request)
        githubPush()
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    echo '🔄 Checking out code from repository...'
                }
                checkout scm
                script {
                    echo "✅ Repository checked out successfully"
                    echo "Branch: ${env.GIT_BRANCH}"
                    echo "Commit: ${env.GIT_COMMIT}"
                }
            }
        }

        stage('Setup Node.js') {
            tools {
                    nodejs 'NodeJS 26'  // Matches Jenkins NodeJS config
            }
            steps {
                script {
                    echo '📦 Setting up Node.js environment...'
                }
                // Using NodeJS plugin (install via Manage Jenkins -> Manage Plugins)
                // Alternative: use nvm or direct node installation
                sh '''
                    node --version
                    npm --version
                '''
            }
        }

        stage('Install Dependencies') {
            tools {
                    nodejs 'NodeJS 26'  // Matches Jenkins NodeJS config
            }
            steps {
                script {
                    echo '📥 Installing npm dependencies...'
                }
                sh '''
                    npm ci --prefer-offline --no-audit
                '''
            }
        }

        stage('Install Playwright Browsers') {
            tools {
                    nodejs 'NodeJS 26'  // Matches Jenkins NodeJS config
            }
            steps {
                script {
                    echo '🌐 Installing Playwright browsers...'
                }
                sh '''
                    npx playwright install --with-deps chromium
                '''
            }
        }

        stage('Create Environment File') {
            steps {
                script {
                    echo '⚙️ Creating .env configuration file...'
                }
                sh '''
                    cat > .env << EOF
BASE_URL=${BASE_URL}
TEST_USER_NAME=${TEST_USER_NAME}
TEST_USER_EMAIL=${TEST_USER_EMAIL}
HEADED=${HEADED_MODE}
ACTION_TIMEOUT=${ACTION_TIMEOUT}
NAVIGATION_TIMEOUT=${NAVIGATION_TIMEOUT}
EXPECT_TIMEOUT=${EXPECT_TIMEOUT}
ALLURE_RESULTS_DIR=${ALLURE_RESULTS_DIR}
CI=${CI}
EOF
                    echo "✅ .env file created successfully"
                    cat .env
                '''
            }
        }

        stage('Run Tests') {
            tools {
                    nodejs 'NodeJS 26'  // Matches Jenkins NodeJS config
            }
            steps {
                script {
                    echo '🚀 Running Playwright tests...'
                }
                sh '''
                    # Clean previous test results
                    rm -rf test-results playlist-report allure-results 2>/dev/null || true
                    mkdir -p allure-results
                    
                    # Run tests
                    if [ "${HEADED_MODE}" = "true" ]; then
                        npm test -- --headed --project=chromium
                    else
                        npm test -- --project=chromium
                    fi
                '''
            }
        }

        stage('Generate Reports') {
            when {
                expression { params.PUBLISH_REPORTS == true }
            }
            steps {
                script {
                    echo '📊 Generating Allure report...'
                }
                sh '''
                    # Generate Allure report
                    npm run allure:generate || true
                    
                    # List report directories
                    echo "Report directories:"
                    ls -la allure-report/
                    ls -la playwright-report/
                '''
            }
        }

        stage('Publish Artifacts') {
            when {
                expression { params.PUBLISH_REPORTS == true }
            }
            steps {
                script {
                    echo '📦 Publishing test artifacts...'
                }
                // Archive Playwright Report
                publishHTML([
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright HTML Report',
                    keepAll: true,
                    allowMissing: false,
                    alwaysLinkToLastBuild: true
                ])
                
                // Archive Allure Report (requires Allure Jenkins Plugin)
                script {
                    if (fileExists('allure-report/index.html')) {
                        publishHTML([
                            reportDir: 'allure-report',
                            reportFiles: 'index.html',
                            reportName: 'Allure Test Report',
                            keepAll: true,
                            allowMissing: true,
                            alwaysLinkToLastBuild: true
                        ])
                    }
                }

                // Archive test results
                archiveArtifacts(
                    artifacts: 'test-results/**,allure-results/**,playwright-report/**',
                    allowEmptyArchive: true,
                    fingerprint: true
                )
            }
        }

        stage('Publish Allure Report (Optional)') {
            when {
                expression { fileExists('allure-results') }
            }
            steps {
                script {
                    echo '📈 Publishing Allure trends...'
                }
                // This requires the Allure Jenkins Plugin
                allure([
                    jdk: '',
                    reportBuildPolicy: 'ALWAYS',
                    results: [[path: 'allure-results']]
                ])
            }
        }
    }

    post {
        always {
            script {
                echo '🧹 Cleaning up...'
            }
            // Clean workspace after build
            cleanWs(
                deleteDirs: true,
                patterns: [[pattern: '.env', type: 'INCLUDE']]
            )
        }
        success {
            script {
                echo '✅ Build and tests completed successfully!'
            }
            // Send success notification
            sh '''
                echo "Build Status: SUCCESS"
                echo "Build URL: ${BUILD_URL}"
            '''
        }
        failure {
            script {
                echo '❌ Build or tests failed!'
            }
            // Capture failure details
            sh '''
                echo "Build failed. Check logs and reports above."
                if [ -d "test-results" ]; then
                    echo "Test results available in artifacts"
                fi
            '''
        }
        unstable {
            script {
                echo '⚠️ Build is unstable (some tests may have failed)'
            }
        }
    }
}
