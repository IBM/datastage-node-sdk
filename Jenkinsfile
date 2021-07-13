#!groovy

def GH_CREDS = '2c69d250-a91e-4941-a11b-b4c831b59b90'
//slackChannel = 'ds-nextgen-'
//slackTeamDomain = 'ibm-analytics'
//slackTokenCredentialId = '1d960160-45e6-48fe-a99c-66c1e25b4ced'
def afaasCredentialsId = '10a795c2-fc1a-4b35-a0e7-644dcfcacfb8'
def NPM_REGISTRY_DOMAIN="https://registry.npmjs.org/"

properties([
   buildDiscarder(logRotator(artifactDaysToKeepStr: '5', artifactNumToKeepStr: '5', daysToKeepStr: '5', numToKeepStr: '5'))
])
pipeline {

  agent {
    label 'ds_worker'
  }

  options {
    skipDefaultCheckout()
  }

  stages {
    stage('Checkout') {
      steps {
        withCredentials([usernamePassword(credentialsId: GH_CREDS, passwordVariable: 'GH_CREDS_PSW', usernameVariable: 'GH_CREDS_USR')]) {
        script {
          defaultInit()
          applyCustomizations()
          checkoutResult = checkout scm
          //checkourResult = checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: GH_CREDS, url: 'https://github.com/IBM/datastage-java-sdk.git']]])
          //commitHash = "${checkoutResult.GIT_COMMIT[0..6]}"
            sh '''
              #git config --global user.email $GH_SDKS_AUTOMATION_MAIL
              git config --global user.name ${GH_CREDS_USR}
              git config --global credential.username ${GH_CREDS_USR}
              git config --global credential.helper "!f() { echo password=${GH_CREDS_PSW}; echo; }; f"
              #set +e
              #  pip3 install --upgrade bump2version
              #  bump2version -h
              #set -e
            '''
          }
        }
      }
    }//checkout

    stage('Publish[repository]') {
      when {
        beforeAgent true
        allOf {
          // Publish master branch, but not on the version update commit after just publishing
          branch 'main'
        }
      }
      steps {

        withCredentials(string(credentialsId: 'cfa6040f-f05b-4b44-92dd-ee3ee371e546', variable: 'NPM_TOKEN')]){
          // Throw away any temporary version changes used for stage/test
          //sh 'git reset --hard'
          //bumpVersion(false)
          // Push the version bump and release tag
          //sh 'git push --tags origin HEAD:main'
          //publishPublic()
          sh'''
              npm install
              npm config set registry "${NPM_REGISTRY_DOMAIN}"
              npm set "${NPM_REGISTRY_DOMAIN}":_authToken "{NPM_TOKEN}"
              npm build
              npm publish
          '''
          //publishDocs()
        }
      }
    }//publish repository
  }
}
