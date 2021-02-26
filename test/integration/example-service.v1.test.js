/**
 * (C) Copyright IBM Corp. 2020.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

const ExampleServiceV1 = require('../../dist/example-service/v1');
const authHelper = require('../resources/auth-helper.js');

// Use this to retrieve test-specific config properties from your credentials file.
const { readExternalSources } = require('ibm-cloud-sdk-core');

// testcase timeout value (10s).
const timeout = 10000;

// Location of our config file.
// This file contains config properties like these:
//   EXAMPLE_SERVICE_AUTHTYPE
//   EXAMPLE_SERVICE_URL
//   EXAMPLE_SERVICE_TEST_RESOURCE_ID   <== test-specific property
// Rename `example-service.env.hide` in the project directory to `example-service.env`
// to use the filename provided below.
const configFile = 'example-service.env';
// Use authHelper to skip tests if our configFile is not available
// This step also sets env var IBM_CREDENTIALS_FILE=<configFile>
const describe = authHelper.prepareTests(configFile);

describe('ExampleServiceV1_integration', () => {
  jest.setTimeout(timeout);

  // Service client used throughout the tests.
  let service;

  // Object containing our config properties.
  let config;

  // Test-specific config property values.
  let testResourceId;
  let testTitle;
  let testTag;

  it('should successfully complete initialization', () => {
    // Initialize the service client.
    service = ExampleServiceV1.newInstance({});
    expect(service).not.toBeNull();

    // Grab our test-specific config properies:
    // Example: EXAMPLE_SERVICE_TEST_RESOURCE_ID=my-resource-id
    // Property names have the service name stripped off and then
    // folded to camel case:
    // EXAMPLE_SERVICE_TEST_RESOURCE_ID ==> testResourceId
    config = readExternalSources(ExampleServiceV1.DEFAULT_SERVICE_NAME);
    expect(config).not.toBeNull();
    expect(config).toHaveProperty('testResourceId');

    // Retrieve the test-specific properties we'll use later.
    testResourceId = config.testResourceId;
    expect(testResourceId).toBeTruthy();

    testTitle = config.testTitle;
    expect(testTitle).toBeTruthy();

    testTag = config.testTag;
    expect(testTag).toBeTruthy();
  });

  // nested describe statements are helpful when organizing multiple categories of an api
  describe('resources', () => {
    // variable shared among the test blocks that follow.
    let resourceId;

    it('listResources', async () => {
      const response = await service.listResources();

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
    });

    it('createResource', async () => {
      // Create a new resource using our test properties.
      const params = {
        name: testTitle,
        resourceId: testResourceId,
        tag: testTag,
      };

      const response = await service.createResource(params);

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
      expect(result.resource_id).toBe(testResourceId);
      expect(result.name).toBe(testTitle);
      expect(result.tag).toBe(testTag);

      // extract the id for the created resource to be used in later tests
      resourceId = result.resource_id;
    });

    it('getResource', async () => {
      // if the resource creation failed, skip this test
      if (!resourceId) {
        return;
      }

      const params = {
        resourceId,
      };

      const response = await service.getResource(params);

      expect(response).toBeDefined();
      const { result } = response || {};
      expect(result).toBeDefined();
    });
  });
});
