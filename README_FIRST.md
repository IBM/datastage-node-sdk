# IBM Cloud Node.js SDK Template Usage Instructions

This repository serves as a template for Node SDKs that are produced with the
[IBM OpenAPI SDK Generator](https://github.ibm.com/CloudEngineering/openapi-sdkgen).

You can use the contents of this repository to create your own Node SDK repository.

## Table of Contents
<!--
  The TOC below is generated using the `markdown-toc` node package.

      https://github.com/jonschlinkert/markdown-toc

  You should regenerate the TOC after making changes to this file.

      markdown-toc -i --maxdepth 4 README_FIRST.md
  -->

<!-- toc -->

- [How to use this repository](#how-to-use-this-repository)
  * [1. Create your new github repository from this template](#1-create-your-new-github-repository-from-this-template)
  * [2. Sanity-check your new repository](#2-sanity-check-your-new-repository)
  * [3. Modify selected files](#3-modify-selected-files)
    + [Automatic Script](#automatic-script)
    + [Manual Steps](#manual-steps)
  * [4. Add one or more services to the project](#4-add-one-or-more-services-to-the-project)
  * [5. Build and test the project](#5-build-and-test-the-project)
- [Integration tests](#integration-tests)
- [Continuous Integration](#continuous-integration)
  * [Release management with semantic-release](#release-management-with-semantic-release)
  * [Encrypting secrets](#encrypting-secrets)
- [Setting the ``User-Agent`` Header In Preparation for SDK Metrics Gathering](#setting-the-user-agent-header-in-preparation-for-sdk-metrics-gathering)

<!-- tocstop -->

## How to use this repository

### 1. Create your new github repository from this template
This SDK template repository is implemented as a
[github template](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template),
which makes it easy to create new projects from it.

To create a new SDK repository from this template, follow these instructions:  
1. In your browser, open the link for this
[template repository](https://github.ibm.com/CloudEngineering/node-sdk-template).

2. Click on the `Use this template` button that appears next to the `Clone or download` button.

3. In the next window:  
- Select the `Owner`. This is the github id or organization where the new repository should be created
- Enter the respository name (e.g. `platform-services-node-sdk`):  
  - Recommendation: use a name of the form `<service-category>-<language>-sdk`, where:  
    - `<service-category>` refers to the IBM Cloud service category associated with the services that
	  will be included in the project (e.g. `platform-services`)
    - `<language>` is the language associated with the SDK project (e.g. `node`)

4. Click the `Create repository from template` button to create the new repository  

If your goal is to create the new SDK repository on the `Github Enterprise` server (github.ibm.com),
then you are finished creating the new repository and you can proceed to section 2.

On the other hand, if your goal is to create the new SDK repository on the `Public Github` server (github.com),
then perform these additional steps:

5. Create a new **EMPTY** repository on the Public Github server:  
- Select "No template" for the "Repository template" option
- Select the `Owner` (your personal id or an organization)
- Enter the same respository name that you used when creating the new repository above (e.g. my-node-sdk)
- Do NOT select the `Initialize this repository with a README` option
- Select `None` for the `Add .gitignore` and `Add a license` options
- Click the `Create repository` button.
- After the new empty repository has been created, you will be at the main page
of your new repository, which will include this text:
```
...or push an existing repository from the command line

git remote add origin git@github.com:padamstx/my-node-sdk.git
git push -u origin main
```
- Take note of the two git commands listed above for your new repository, as we'll execute these later

6. Clone your new `Github Enterprise` repository (created in steps 1-3 above)
to your local development environment:  

```sh
[/work/demos]
$ git clone git@github.ibm.com:phil-adams/my-node-sdk.git
Cloning into 'my-node-sdk'...
remote: Enumerating objects: 36, done.
remote: Counting objects: 100% (36/36), done.
remote: Compressing objects: 100% (32/32), done.
remote: Total 36 (delta 1), reused 0 (delta 0), pack-reused 0
Receiving objects: 100% (36/36), 28.74 KiB | 577.00 KiB/s, done.
Resolving deltas: 100% (1/1), done.
```

7. "cd" into your project's root directory:

```sh
[/work/demos]
$ cd my-node-sdk
[/work/demos/my-node-sdk]
$
```

8. Remove the existing remote:  
```sh
[/work/demos/my-node-sdk]
$ git remote remove origin
```

9. Add a new remote which reflects your new `Public Github` repository:

```sh
[/work/demos/my-node-sdk]
$ git remote add origin git@github.com:padamstx/my-node-sdk.git
```

10. Push your local repository to the new remote (Public Github):  

```sh
[/work/demos/my-node-sdk]
$ git push -u origin main
Enumerating objects: 36, done.
Counting objects: 100% (36/36), done.
Delta compression using up to 12 threads
Compressing objects: 100% (31/31), done.
Writing objects: 100% (36/36), 28.74 KiB | 28.74 MiB/s, done.
Total 36 (delta 1), reused 36 (delta 1)
remote: Resolving deltas: 100% (1/1), done.
To github.com:padamstx/my-node-sdk.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

You have now created your new SDK repository on the `Public Github` server.

You may want to now delete the new SDK repository that you created on the `Github Enterprise`
server since it will no longer be used now that you have created your repository on `Public Github`.

### 2. Sanity-check your new repository

After creating your new SDK repository from the template repository, and cloning it
into your local development environment, you can do a quick sanity check by
running these commands in the project root directory:
```
npm install
npm run test-unit
```
You should see output like this:
```
$ npm install
   <npm install output>

$ npm run test-unit

> mysdk@0.0.1 test-unit /work/templates/node
> npm run build && jest test/unit/


> mysdk@0.0.1 build /work/templates/node
> tsc && cp package.json dist/


 PASS  test/unit/common.test.js
 PASS  test/unit/example-service.v1.test.js
-----------------|----------|----------|----------|----------|-------------------|
File             |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------------|----------|----------|----------|----------|-------------------|
All files        |    83.61 |    41.67 |       90 |    82.46 |                   |
 example-service |    80.39 |    41.67 |    88.89 |    78.72 |                   |
  v1.ts          |    80.39 |    41.67 |    88.89 |    78.72 |... 53,54,55,57,74 |
 lib             |      100 |      100 |      100 |      100 |                   |
  common.ts      |      100 |      100 |      100 |      100 |                   |
-----------------|----------|----------|----------|----------|-------------------|

Test Suites: 2 passed, 2 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        2.055s
Ran all test suites matching /test\/unit\//i.

```

Note: the first time you `install`, you'll see output showing
that `npm` is downloading the dependencies needed by the project since
they're not yet cached in your environment.


### 3. Modify selected files

#### Automatic Script
Use the `prepare_project.sh` script to perform the below modifications automatically.
It will delete the `example service` files and update the corresponding sections with the specified values.
Read through the manual steps below to understand the changes performed by the `prepare_project.sh` script.

Here is a description of the various options that you can pass to the script:
```bash
prepare_project.sh -n <npm-package-name> -p <sdk-project-name> -d <project-description> \
        -g <git-repo-url> -s <service-category-description> -c <service-category-name>
```

Here is an example of how to run the script for the `platform-services-node-sdk` project:  
```bash
cd <project-root>
./prepare_project.sh -n ibm-platform-services -p platform-services-node-sdk -d "IBM Cloud Platform Services Node.js SDK" \
       -g https://github.com/IBM/platform-services-node-sdk -s "Platform Services" -c platform-services
```

- To list the files changed by the script, run : `git status`  
- To view the changes made by this script, run: `git diff`  
- To discard the changes made by the script, run `git checkout .`, or `git stash`  
- If satisfied with the changes, then just commit the changes (e.g. `git commit -a -m "chore: prepare SDK project"`)

#### Manual Steps
- In this section, you'll modify various files within your new SDK repository to reflect
the proper names and settings for your specific project.

- The template repository comes with an example service included, but this should be removed
from your project.  Remove the following files and directories:
  - example-service
  - test/integration/example-service.v1.test.js
  - test/unit/example-service.v1.test.js

- Next, here is a list of the various files within the project with comments
that will guide you in the required modifications:

  - `.gitignore`:
    - in the `service-specific tsc outputs` section, comment out the entry for `example-service`.
      Later, you'll add an entry like this for each service added to your project.

  - `package.json`:
    - modify the `name` field to reflect the npm package name associated with your project
      (e.g. `ibm-platform-services`).  It is strongly recommended that you follow the
      pattern: `ibm-<service-category>`.  It is also strongly reccomended that you use the `ibm-cloud`
      [scope](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#creating-a-scoped-public-package),
      such as `@ibm-cloud/ibm-<service-category>`.
    - modify the `description` field to reflect the description of your project
      (e.g. `IBM Cloud Platform Services Node.js SDK`)
    - modify the `repository.url` field to reflect your project's github url
      (e.g. `https://github.ibm.com/ibmcloud/platform-services-node-sdk`)
    - within the `dependencies` field, make sure the version # specified for the `ibm-cloud-sdk-core`
      dependency is the most recent version (check [here](https://github.com/IBM/node-sdk-core/releases)).

  - `.travis.yml`:
    - Uncomment the `node_js` section.
    - Remove the entire `jobs` section, as this is applicable only to the template repository's build.

  - `lib/common.ts`:  
    - modify the `sdkName` value to reflect the name of your project (e.g. `platform-services-node-sdk`)
    - read the instructions for the `getSdkHeaders()` function and follow as appropriate.

  - `test/unit/common.test.js`:
    - modify the regular expression containing the project name to reflect your SDK project's name
      (e.g. `/^platform-services-node-sdk\/.*/`)

  - `README.md`:
    - Change the title to reflect your project
    - Change the `cloud.ibm.com/apidocs` link to reflect the correct service category
      (e.g. `platform-services`)
    - In the Overview section, modify `IBM Cloud MySDK Node.js SDK` to reflect your project
      (e.g. `IBM Cloud Platform Services Node.jsSDK`)
    - In the table of services, remove the entry for the example service; later you'll list each
      service contained in your SDK project in this table, along with a link to the online reference docs
      and the name of the generated service class.
    - In the Installation section, modify `mysdk` to reflect your project's npm package name, which
      should match the `name` field in package.json (e.g. `ibm-platform-services`)
    - In the "Issues" section, modify `<github-repo-url>` to reflect the Github URL for your project.
    - Note that the README.md file contains a link to a common README document where general
      SDK usage information can be found.
    - When finished, read through the document and make any other changes that might be necessary.

  - `CONTRIBUTING.md`:
    - In the "Issues" section, modify `<github-repo-url>` to reflect the Github URL for your project.

At this point, it's probably a good idea to commit the changes that you have made so far.
Be sure to use proper commit messages when committing changes (follow the link in `CONTRIBUTING.md`
to the common CONTRIBUTING document).  
Example:
```sh
cd <project-root>
git commit -a -m "chore: prepare SDK project"
```


### 4. Add one or more services to the project
For each service that you'd like to add to your SDK project, follow
[these instructions](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/CONTRIBUTING_nodejs.md#adding-a-new-service).

### 5. Build and test the project
If you made it this far, congratulate yourself!

After preparing your new SDK project and then generating the service and unit test
code for your service(s), it's time to build and test your project.

This repository uses the [TypeScript](https://www.typescriptlang.org/) framework,
so code must be “built" after being edited using the `npm run build` command.

Note that the built code is written into a separate distribution directory called `dist`.
This is to maintain a clean working directory, uncluttered by `.js`, `.js.map`, and `.d.ts` files.
The project is configured to maintain the desired structure within the `dist` directory and
will automatically release the project from this directory so that the end user is able to import
the modules using the import paths listed in the service table inside the `README.md` file
for each service.

To build and test all of the code within your project, you can run these commands in the project
root directory:
```
npm install

npm run build

npm run test-unit
```

This repository uses `tslint` for linting the TypeScript code and `eslint` for linting the
JavaScript test files.
The rules for each are defined in `tslint.json` and `test/.eslintrc.js`, respectively.
It is recommended that you do not change these files, since the generated code complies with the
defined rules.

You can run the linter with the following commands.
Replacing “check” with “fix” will cause the linter to automatically fix any linting errors that it can.
- `npm run tslint:check`
- `npm run eslint:check`

If you run into linter errors on the generated unit tests, you can use this
[node formatting script](https://github.ibm.com/CloudEngineering/openapi-sdkgen/blob/main/scripts/node_format.sh).
Example:
```sh
cd <project-root>

<location of script>/node_format.sh test/unit/*.js
```

Our goal is to generate the SDK service and unit test code that can be built and tested without
manual intervention.  If we fall short of that goal, we'd love to hear about it.


## Integration tests
Integration tests can be generated by the SDK generator or developed by hand.
The recommended approach is to generate the integration tests and then modify them as
needed to form an effective set of integration tests. For information on how to generate
integration tests, please see
[this page](https://github.ibm.com/CloudEngineering/openapi-sdkgen/wiki/Generating-integration-tests).

For integration tests to run properly with an actual running instance of the service,
credentials (e.g. IAM api key, etc.) must be provided as external configuration properties.
Details about this can be found
[here](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/README.md#using-external-configuration).

An example integration test is located at `test/integration/example-service.v1.js`.
In order to run the "example service" integration test,
you'll need an actual running instance of the example service.
To run this service, clone the [Example Service repo](https://github.ibm.com/CloudEngineering/example-service)
and follow the instructions there for how to start up an instance of the example service.

More details related to developing and running tests can be found
[here](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/CONTRIBUTING_nodejs.md).


## Continuous Integration
This repository is set up to use [Travis](https://travis-ci.com/)
or [Travis Enterprise](https://travis.ibm.com) for continuous integration.

The `.travis.yml` file contains all the instructions necessary to run the build.

For details related to the `.travis.yml` file, see
[this](https://docs.travis-ci.com/user/customizing-the-build/)

### Release management with semantic-release
The `.travis.yml` file included in this template repository is configured to
perform automated release management with
[semantic-release](https://semantic-release.gitbook.io/semantic-release/).
You can see the deployment-related steps in the `deploy` stage of the `.travis.yml` file.

BEFORE you enable automated builds in Travis and AFTER you perform the initial project preparation,
you should add an initial tag (`v0.0.1`) to your repo and push it to remote:  
```sh
cd <project-root>
git tag v0.0.1
git push --tags
```
This creates an initial "baseline" which `semantic-release` will use when merging the initial set of
commits into the main branch.   This tag represents the initial version of the project.
After adding this tag, be sure to use proper commit messages when making changes to the project.
See the CONTRIBUTING document for information about commit messages.

When you configure your SDK project in Travis, be sure to set these environment variables in your
Travis build settings:  
- `GH_TOKEN`: set this to the Github oauth token for a user having "push" access to your repository
- `NPM_TOKEN`: set this to the user access token associated with the [NPM repository](https://www.npmjs.com/)
user that has the necessary privileges to publish the project's package to NPM.

If you are using `Travis Enterprise` (travis.ibm.com), you'll need to add these environment variables
as well:  
- `GH_URL`: set this to the string `https://github.ibm.com`
- `GH_PREFIX`: set this to the string `/api/v3`

As a final step, be sure to uncomment the `deploy` stage within `.travis.yml`.

#### NPM Scope
It is strongly recommended that your package be scoped with `ibm-cloud` (e.g. `@ibm-cloud/ibm-platform-services`). The [steps to do
this](https://docs.npmjs.com/creating-and-publishing-scoped-public-packages#creating-a-scoped-public-package) are
fairly straightforward once you have access to the scope organization.  To get access to publish under the `@ibm-cloud`
scope, please open an [issue in the SDK Squad repo](https://github.ibm.com/arf/planning-sdk-squad/issues/new) with
the following information.

```
Title: @ibm-cloud scope access for my-service

Node SDK Repo:
NPM Package Name: @ibm-cloud/platform-services
NPM ID(s):
```

Once these steps have been completed, your project should be ready for automated release management
with `semantic-release`.  This means that whenever you merge a PR into the main branch, the commit
messages are analyzed by `semantic-release` to determine the next version number for the project
(i.e. a new patch, minor or major version).  Once that is determined, `semantic-release` will perform
actions to modify certain files within the project to reflect the new version, as well as
build a new entry in the project's changelog and add a tag for the new version.

### Encrypting secrets
To run integration tests within a Travis build, you'll need to encrypt the file containing the
required external configuration properties.
For details on how to do this, please see
[this](https://github.com/IBM/ibm-cloud-sdk-common/blob/main/EncryptingSecrets.md)


## Setting the ``User-Agent`` Header In Preparation for SDK Metrics Gathering

If you plan to gather metrics for your SDK, the `User-Agent` header value must be
a string similar to the following:
`my-node-sdk/0.0.1 (lang=node.js; os.name=Linux; os.version=19.3.0; node.version=v10.15.3)`

The key parts are the sdk name (`my-node-sdk`), version (`0.0.1`) and the
language name (`lang=node.js`).
This is required because the analytics data collector uses the User-Agent header included
with each request to gather usage data for IBM Cloud services.

The default implementation of the `getSdkHeaders` method provided in this SDK template
repository will need to be modified slightly for your SDK.
Replace the `my-node-sdk/0.0.1` part with the name and version of your
Node SDK. The rest of the system information should remain as-is.

For example, suppose your Node SDK project is called `platform-services-node-sdk` and its
version is `2.3.1`.
The `User-Agent` header value should be:
`platform-services-node-sdk/2.3.1 (lang=node.js; os.name=Linux; os.version=19.3.0; node.version=v10.15.3)`

__Note__: It is very important that the sdk name ends with the string `-sdk`,
as the analytics data collector uses this to gather usage data.

More information about the analytics tool, and other steps you should take to start gathering
metrics for your SDK can be found [here](https://github.ibm.com/CloudEngineering/sdk-analytics).
