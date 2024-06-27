pipeline {
    agent any

    environment {
        GITHUB_REPO_URL = 'https://github.com/ashanwijebandara/lp_gas_backend.git'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: "${env.GITHUB_REPO_URL}"
            }
        }
        stage('Docker Build') {
            steps {
                sh 'docker build . -t lp-server3'
            }
        }
        stage('Run Docker Image') {
            steps {
                sh 'docker run -d --name lp-server3 -p 3010:3010 lp-server3'
            }
        }
    }
    
}