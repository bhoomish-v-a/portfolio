pipeline {
    agent any

    environment {
        IMAGE_NAME = "bhoomish-portfolio"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                // Correct branch name
                git branch: 'main', url: 'https://github.com/bhoomish-v-a/portfolio.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    script {
                        docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-creds') {
                            docker.image("${IMAGE_NAME}:${IMAGE_TAG}").push()
                        }
                    }
                }
            }
        }
    }
}
