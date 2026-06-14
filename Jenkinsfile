pipeline {
    agent any

    parameters {
        choice(
            name: 'BROWSER',
            choices: ['chrome', 'safari'],
            description: 'Browser'
        )

        string(
            name: 'SPECFILE',
            defaultValue: 'upload-download.spec.js',
            description: 'Spec file'
        )
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install') {
            steps {
                sh '''
                npm install
                npx playwright install
                '''
            }
        }

        stage('Run Playwright') {
            steps {
                sh """
                npx playwright test tests/${params.SPECFILE} \
                --config=playwright.config1.js \
                --project=${params.BROWSER}
                """
            }
        }
    }

   post {
        success {
            emailext(
                subject: "SUCCESS: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Build Successful

                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}

                URL:
                ${env.BUILD_URL}
                """,
                to: 'shivanikatkar18@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "FAILED: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
                Build Failed

                Job: ${env.JOB_NAME}
                Build: ${env.BUILD_NUMBER}

                URL:
                ${env.BUILD_URL}
                """,
                to: 'shivanikatkar18@gmail.com'
            )
        }
    }
}
