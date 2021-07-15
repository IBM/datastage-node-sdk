#!groovy

def GH_CREDS = '2c69d250-a91e-4941-a11b-b4c831b59b90'
//slackChannel = 'ds-nextgen-'
//slackTeamDomain = 'ibm-analytics'
//slackTokenCredentialId = '1d960160-45e6-48fe-a99c-66c1e25b4ced'
//def NPM_REGISTRY_DOMAIN="https://registry.npmjs.org/"

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
          checkout scm
          defaultInit()
          applyCustomizations()
          //checkourResult = checkout([$class: 'GitSCM', branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[credentialsId: GH_CREDS, url: 'https://github.com/IBM/datastage-java-sdk.git']]])
          //commitHash = "${checkoutResult.GIT_COMMIT[0..6]}"
            sh '''
              #git config --global user.email $GH_SDKS_AUTOMATION_MAIL
              git config --global user.name ${GH_CREDS_USR}
              git config --global credential.username ${GH_CREDS_USR}
              git config --global credential.helper "!f() { echo password=${GH_CREDS_PSW}; echo; }; f"
              set +e
                pip3 install --upgrade bump2version
              set -e
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

        withCredentials([string(credentialsId: 'cfa6040f-f05b-4b44-92dd-ee3ee371e546', variable: 'NPM_TOKEN')]){
          // Throw away any temporary version changes used for stage/test
          sh 'git reset --hard'
          bumpVersion(false)
          // Push the version bump and release tag
          sh 'git push --tags origin HEAD:main'
          //publishPublic()
          sh'''
              scripts/updateNode.sh
              node -v
              npm install
              echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" >> ~/.npmrc
              #npm run build
              npm publish
          '''
          //publishDocs()
        }
      }
    }//publish repository
  }
}
void defaultInit() {
  // Default to using bump2version
  bumpVersion = { isDevRelease ->
    newVersion = getNextVersion(isDevRelease)
    // Set an env var with the new version
    env.NEW_SDK_VERSION = newVersion
    doVersionBump(isDevRelease, newVersion)
  }

  doVersionBump = { isDevRelease, newVersion, allowDirty ->
    sh "/home/jenkins/.local/bin/bump2version --new-version ${newVersion} ${allowDirty ? '--allow-dirty': ''} ${isDevRelease ? '--no-commit' : '--tag --tag-message "Release {new_version}"'} patch"
  }

  getNextVersion = { isDevRelease ->
    // Identify what the next patch version is
    patchBumpedVersion = sh returnStdout: true, script: 'bump2version --list --dry-run patch | grep new_version=.* | cut -f2 -d='
    // Now the customized new version
    return getNewVersion(isDevRelease, patchBumpedVersion)
  }

  // Default no-op implementation to use semverFormatVersion
  customizeVersion = { semverFormatVersion ->
    semverFormatVersion
  }
}

String getNewVersion(isDevRelease, version) {
  wipVersion = ''
  if (isDevRelease) {
    // Add uniqueness and build metadata to dev build versions
    wipVersion = "${version.trim()}-dev${currentBuild.startTimeInMillis}+${commitHash}.${currentBuild.number}"
  } else {
    wipVersion = "${version.trim()}"
  }
  // Customize with lang specific requirements
  return customizeVersion(wipVersion)
}

void applyCustomizations() {
  bumpVersion = { isDevRelease ->
    // Get the dependencies
    sh 'npm ci'
    // Update to the next patch version
    sh "npm version ${isDevRelease ? '--no-git-tag-version' : '-m "Update version -> %s"'} patch"
    // Set env variable version from package.json
    env.NEW_SDK_VERSION = sh returnStdout: true, script: 'jq -r .version package.json'
    if (isDevRelease) {
      // For a dev release append the metadata
      devRelease = getNewVersion(isDevRelease, "${env.NEW_SDK_VERSION}")
      sh "npm version --allow-same-version --no-git-tag-version ${devRelease}"
      env.NEW_SDK_VERSION = sh returnStdout: true, script: 'jq -r .version package.json'
    }
  }
}
