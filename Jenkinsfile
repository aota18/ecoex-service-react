pipeline {
    agent any
     //Cron Syntax
     // drive this pipeline every 3 minutes
    triggers { 
        pollSCM('*/2 * * * *')
    }
    // Credentials file
    environment {
        AWS_ACCESS_KEY_ID = credentials('awsAccessKeyId')
        AWS_SECRET_ACCESS_KEY = credentials('awsSecretAccessKey')
        AWS_DEFAULT_REGION = 'ap-northeast-2'
        APP_NAME='ecoex-service-react'
        HOME = '.' // Avoid npm root owned
        SLACK_CHANNEL='#deploy-alert'
    }
    stages {
        // Download Repository
        stage('Prepare'){
            agent any
            steps {
                echo "Let's start Long Journey ! :두_손을_들고_있는_사람: "
                echo "Clonning Repository..."
                git url: "https://github.com/aota18/ecoex-service-react.git",
                    branch: 'master',
                    credentialsId: 'ujs8533'
            }
            // Define the behavior after above steps
            post {
                //If Maven was able to run the tests, even if some of the test
                // failed, record the test results and archive the jar file.
                success {
                    echo 'Successfully Cloned Repository'
                }
                always {
                    echo "I tried..."
                }
                cleanup {
                    echo "after all other post conditipon"
                }
            }
        }
        stage('Build Frontend') {
            agent {
                docker {
                    image 'node:14.15.2-alpine'
                }
            }
            steps {
                echo 'Build Frontend'
                sh 'npm install'
                sh 'npm run build'
            }
            post {
                failure {
                    //Error terminates all
                    error "This pipeline stops here..."
                }
            }
        }
        stage('Build Docker') {
            agent any
            steps {
                dir('./'){
                    sh 'docker build . -t ecoex-service-react'
                }
            }
        }
        stage('Deploy Application'){
            agent any
            steps {
                echo 'Deploy Application'
                sh 'docker ps -f name=ecoex-service-react -q | xargs --no-run-if-empty docker container stop'
                sh 'docker container ls -a -fname=ecoex-service-react -q | xargs -r docker container rm'
                sh 'docker images --no-trunc --all --quiet --filter="dangling=true" | xargs --no-run-if-empty docker rmi'
                sh '''
                docker run -p 80:80 -d --name ecoex-service-react ecoex-service-react
		        '''
            }
        }
    }
}
