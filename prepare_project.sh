#!/bin/bash
set -e

print_usage () {
    echo "
usage:
   ./prepare_project.sh -n <npm-package-name> -p <sdk-project-name> -d <project-description> -g <git-repo-url> -s <service-category-description> -c <service-category-name>
where:
   -n: specify the NPM package name (e.g. ibm-platform-services)
   -p: specify project name (e.g. platform-services-node-sdk)
   -d: specify project description string (e.g. \"IBM Cloud Platform Services Node.js SDK\")
   -g: specify the git url (e.g. https://github.com/IBM/platform-services-node-sdk)
   -s: specify sdk name string (e.g. \"Platform Services\")
   -c: specify the service category (e.g. platform-services)
   -h: view usage instructions
"
}

# Parse flags and arguments
while getopts 'n:p:d:g:s:c:h' flag; do
  case "${flag}" in
    n) NPM_PACKAGE_NAME=${OPTARG} ;;
    p) PROJECT_NAME=${OPTARG} ;;
    d) PROJECT_DESCRIPTION=${OPTARG} ;;
    g) PROJECT_GIT_URL=${OPTARG} ;;
    s) SDK_NAME=${OPTARG} ;;
    c) SERVICE_CATEGORY=${OPTARG} ;;
    *) print_usage
        exit 1 ;;
  esac
done

if [[ -z "$NPM_PACKAGE_NAME" || -z "$PROJECT_NAME" || -z "$PROJECT_DESCRIPTION" || -z "$PROJECT_GIT_URL" || -z "$SDK_NAME" || -z "$SERVICE_CATEGORY" ]]; then
    printf "Please provide all required inputs.\n\n"
    print_usage

else

    printf "\n>>>>> Project Initialization In Progress...\n\t NPM_PACKAGE_NAME: ${NPM_PACKAGE_NAME}\n\t PROJECT_NAME: ${PROJECT_NAME}\n\t PROJECT_DESCRIPTION: ${PROJECT_DESCRIPTION}\n\t PROJECT_GIT_URL: ${PROJECT_GIT_URL}\n\t SDK_NAME: ${SDK_NAME}\n\t SERVICE_CATEGORY: ${SERVICE_CATEGORY}\n"

    # Remove sample files
    rm -r example-service
    rm test/integration/example-service.v1.test.js
    rm test/unit/example-service.v1.test.js
    printf "\n>>>>> Example Service files removed."

    # Update gitignore
    sed -i.bak 's/^example-service/# example-service/' .gitignore
    rm .gitignore.bak
    printf "\n>>>>> .gitignore updated."

    # Update package.json
    sed -i.bak 's/mysdk/'${NPM_PACKAGE_NAME}'/' package.json
    sed -i.bak "s/IBM Cloud Node SDK/${PROJECT_DESCRIPTION}/" package.json
    sed -i.bak 's~https://github.ibm.com/CloudEngineering/node-sdk-template~'${PROJECT_GIT_URL}'~' package.json
    rm package.json.bak
    printf "\n>>>>> package.json updated."

    # Update .travis.yml
    sed -i.bak '/# After creating your SDK project from this template repository,/d' .travis.yml
    sed -i.bak '/# uncomment this section to enable builds on the appropriate node versions./d' .travis.yml
    sed -i.bak 's/# node_js:/node_js:/' .travis.yml
    sed -i.bak 's/# - 10/- 10/' .travis.yml
    sed -i.bak 's/# - 12/- 12/' .travis.yml
    sed -i.bak '/# remove this entire "jobs" section as this is only applicable/,/        - .\/setup_and_generate.sh -l ibm-node -t $TRAVIS_BRANCH/d' .travis.yml
    rm .travis.yml.bak
    printf "\n>>>>> .travis.yml updated."

    # Update supplemental files
    sed -i.bak 's/my-node-sdk/'${PROJECT_NAME}'/' lib/common.ts
    rm lib/common.ts.bak
    printf "\n>>>>> lib/common.ts updated."

    sed -i.bak "s/my-node-sdk/${PROJECT_NAME}/" test/unit/common.test.js
    rm test/unit/common.test.js.bak
    printf "\n>>>>> test/unit/common.test.js updated."

    # Update documentation
    sed -i.bak "s/^# .*/# ${PROJECT_DESCRIPTION}/" README.md
    sed -i.bak "s/travis.ibm.com/travis-ci.com/" README.md
    sed -i.bak "s/MySDK Service/${SDK_NAME}/" README.md
    sed -i.bak "s/MySDK/${SDK_NAME}/" README.md
    sed -i.bak "s/mysdk/${NPM_PACKAGE_NAME}/" README.md
    sed -i.bak "s~<github-repo-url>~${PROJECT_GIT_URL}~" README.md
    sed -i.bak "s/<service-category>/${SERVICE_CATEGORY}/" README.md
    sed -i.bak "s~^\[Example Service\].*~<!-- [Example Service](https://cloud.ibm.com/apidocs/example-service) | ${NPM_PACKAGE_NAME}/example-service/v1 -->~" README.md
    GH_SLUG="$( sed 's~.*.com/~~' <<< "$PROJECT_GIT_URL" )"
    sed -i.bak "s~CloudEngineering/node-sdk-template~${GH_SLUG}~g" README.md
    sed -i.bak "s/node-sdk-template/${NPM_PACKAGE_NAME}/" README.md

    rm README.md.bak
    printf "\n>>>>> README.md updated."

    sed -i.bak "s~<github-repo-url>~${PROJECT_GIT_URL}~" CONTRIBUTING.md
    rm CONTRIBUTING.md.bak
    printf "\n>>>>> CONTRIBUTING.md updated."

    printf "\n>>>>> Project Initialized Successfully!\n"
fi
