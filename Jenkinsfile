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
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }
    }
}
