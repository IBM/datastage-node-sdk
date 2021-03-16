/* eslint-disable no-console */
/**
 * (C) Copyright IBM Corp. 2021.
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
const DatastageV3 = require('../../dist/datastage/v3');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');
const fs = require('fs');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'datastage_v3.env';

const describe = authHelper.prepareTests(configFile);

let assetID;

let cloneID;

let importID;

const dataIntgFlowName = 'nodesdkTestFlow1';

describe('DatastageV3_integration', () => {
  const datastageService = DatastageV3.newInstance({});

  expect(datastageService).not.toBeNull();

  const config = readExternalSources(DatastageV3.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  const projectID = config.projectId;

  jest.setTimeout(timeout);

  test('datastageFlowsList()', async () => {
    const params = {
      projectId: projectID,
      sort: 'name',
      limit: 100,
    };

    const res = await datastageService.datastageFlowsList(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsCreate()', async () => {
    // Request models needed by this operation.
    const pipelineJsonFromFile = JSON.parse(fs.readFileSync('testInput/rowgen_peek.json', 'utf-8'));

    const params = {
      dataIntgFlowName: dataIntgFlowName,
      pipelineFlows: pipelineJsonFromFile,
      projectId: projectID,
      assetCategory: 'system',
    };

    const res = await datastageService.datastageFlowsCreate(params);
    assetID = res.result.metadata.asset_id;
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsGet()', async () => {
    const params = {
      dataIntgFlowId: assetID,
      projectId: projectID,
    };

    const res = await datastageService.datastageFlowsGet(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsUpdate()', async () => {
    // Request models needed by this operation.
    const pipelineJsonFromFile = JSON.parse(
      fs.readFileSync('testInput/rowgen_peek_update.json', 'utf-8')
    );
    const params = {
      dataIntgFlowId: assetID,
      dataIntgFlowName: dataIntgFlowName,
      pipelineFlows: pipelineJsonFromFile,
      projectId: projectID,
      assetCategory: 'system',
    };

    const res = await datastageService.datastageFlowsUpdate(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });

  test('datastageFlowsClone()', async () => {
    const params = {
      dataIntgFlowId: assetID,
      projectId: projectID,
    };

    const res = await datastageService.datastageFlowsClone(params);
    cloneID = res.result.metadata.asset_id;
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsCompile()', async () => {
    const params = {
      dataIntgFlowId: assetID,
      projectId: projectID,
    };

    const res = await datastageService.datastageFlowsCompile(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationCreate()', async () => {
    const params = {
      body: Buffer.from(fs.readFileSync('testInput/rowgen_peek.isx')),
      projectId: projectID,
      onFailure: 'continue',
      conflictResolution: 'rename',
      attachmentType: 'isx',
      fileName: 'rowgen_peek.isx',
    };
    const res = await datastageService.migrationCreate(params);
    
    importID = res.result.metadata.id;
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationGet()', async () => {
    const params = {
      importId: importID,
      projectId: projectID,
    };

    const res = await datastageService.migrationGet(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationDelete()', async () => {
    const params = {
      importId: importID,
      projectId: projectID,
    };

    const res = await datastageService.migrationDelete(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsDelete()', async () => {
    const params = {
      id: [assetID,cloneID],
      projectId: projectID,
      force: true,
    };

    const res = await datastageService.datastageFlowsDelete(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
