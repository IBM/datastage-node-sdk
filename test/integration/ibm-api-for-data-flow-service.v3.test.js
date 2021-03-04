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
const IbmApiForDataFlowServiceV3 = require('../../dist/ibm-api-for-data-flow-service/v3');
const { readExternalSources } = require('ibm-cloud-sdk-core');
const authHelper = require('../resources/auth-helper.js');

// testcase timeout value (200s).
const timeout = 200000;

// Location of our config file.
const configFile = 'ibm_api_for_data_flow_service_v3.env';

const describe = authHelper.prepareTests(configFile);

describe('IbmApiForDataFlowServiceV3_integration', () => {
  const ibmApiForDataFlowServiceService = IbmApiForDataFlowServiceV3.newInstance({});

  expect(ibmApiForDataFlowServiceService).not.toBeNull();

  const config = readExternalSources(IbmApiForDataFlowServiceV3.DEFAULT_SERVICE_NAME);
  expect(config).not.toBeNull();

  jest.setTimeout(timeout);

  test('datastageFlowsList()', async () => {
    const params = {
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
      sort: 'testString',
      start: 'testString',
      limit: 100,
      entityName: 'testString',
      entityDescription: 'testString',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsList(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsCreate()', async () => {
    // Request models needed by this operation.

    // Pipelines
    const pipelinesModel = {
      id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
      description: 'A test DataStage flow',
      runtime_ref: 'pxOsh',
      nodes: { foo: 'bar' },
      app_data: { foo: 'bar' },
    };

    // PipelineJson
    const pipelineJsonModel = {
      doc_type: 'pipeline',
      version: '3.0',
      json_schema: 'http://api.dataplatform.ibm.com/schemas/common-pipeline/pipeline-flow/pipeline-flow-v3-schema.json',
      id: '84c2b6fb-1dd5-4114-b4ba-9bb2cb364fff',
      primary_pipeline: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
      pipelines: [pipelinesModel],
      schemas: { foo: 'bar' },
      runtimes: { foo: 'bar' },
      app_data: { foo: 'bar' },
    };

    const params = {
      dataIntgFlowName: 'testString',
      pipelineFlows: pipelineJsonModel,
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
      assetCategory: 'system',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsCreate(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsGet()', async () => {
    const params = {
      dataIntgFlowId: 'testString',
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsGet(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsUpdate()', async () => {
    // Request models needed by this operation.

    // Pipelines
    const pipelinesModel = {
      id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
      description: 'A test DataStage flow',
      runtime_ref: 'pxOsh',
      nodes: { foo: 'bar' },
      app_data: { foo: 'bar' },
    };

    // PipelineJson
    const pipelineJsonModel = {
      doc_type: 'pipeline',
      version: '3.0',
      json_schema: 'http://api.dataplatform.ibm.com/schemas/common-pipeline/pipeline-flow/pipeline-flow-v3-schema.json',
      id: '84c2b6fb-1dd5-4114-b4ba-9bb2cb364fff',
      primary_pipeline: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
      pipelines: [pipelinesModel],
      schemas: { foo: 'bar' },
      runtimes: { foo: 'bar' },
      app_data: { foo: 'bar' },
    };

    const params = {
      dataIntgFlowId: 'testString',
      dataIntgFlowName: 'testString',
      pipelineFlows: pipelineJsonModel,
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsUpdate(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsClone()', async () => {
    const params = {
      dataIntgFlowId: 'testString',
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsClone(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsCompile()', async () => {
    const params = {
      dataIntgFlowId: 'testString',
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
      runtimeType: 'testString',
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsCompile(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationCreate()', async () => {
    const params = {
      body: Buffer.from('This is a mock file.'),
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
      onFailure: 'continue',
      conflictResolution: 'rename',
      attachmentType: 'isx',
      fileName: 'myFlows.isx',
    };

    const res = await ibmApiForDataFlowServiceService.migrationCreate(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationGet()', async () => {
    const params = {
      importId: 'testString',
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
    };

    const res = await ibmApiForDataFlowServiceService.migrationGet(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('migrationDelete()', async () => {
    const params = {
      importId: 'cc6dbbfd-810d-4f0e-b0a9-228c328aff29',
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
    };

    const res = await ibmApiForDataFlowServiceService.migrationDelete(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
  test('datastageFlowsDelete()', async () => {
    const params = {
      id: ['testString'],
      catalogId: 'testString',
      projectId: 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23',
      force: true,
    };

    const res = await ibmApiForDataFlowServiceService.datastageFlowsDelete(params);
    expect(res).toBeDefined();
    expect(res.result).toBeDefined();
  });
});
