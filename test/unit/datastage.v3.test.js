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

// need to import the whole package to mock getAuthenticatorFromEnvironment
const core = require('ibm-cloud-sdk-core');
const { NoAuthAuthenticator, unitTestUtils } = core;

const DatastageV3 = require('../../dist/datastage/v3');

const {
  getOptions,
  checkUrlAndMethod,
  checkMediaHeaders,
  expectToBePromise,
  checkForSuccessfulExecution,
} = unitTestUtils;

const service = {
  authenticator: new NoAuthAuthenticator(),
  url: 'https://datastage.cloud.ibm.com/data_intg',
};

const datastageService = new DatastageV3(service);

// dont actually create a request
const createRequestMock = jest.spyOn(datastageService, 'createRequest');
createRequestMock.mockImplementation(() => Promise.resolve());

// dont actually construct an authenticator
const getAuthenticatorMock = jest.spyOn(core, 'getAuthenticatorFromEnvironment');
getAuthenticatorMock.mockImplementation(() => new NoAuthAuthenticator());

afterEach(() => {
  createRequestMock.mockClear();
  getAuthenticatorMock.mockClear();
});

describe('DatastageV3', () => {
  describe('the newInstance method', () => {
    test('should use defaults when options not provided', () => {
      const testInstance = DatastageV3.newInstance();

      expect(getAuthenticatorMock).toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceName).toBe(DatastageV3.DEFAULT_SERVICE_NAME);
      expect(testInstance.baseOptions.serviceUrl).toBe(DatastageV3.DEFAULT_SERVICE_URL);
      expect(testInstance).toBeInstanceOf(DatastageV3);
    });

    test('should set serviceName, serviceUrl, and authenticator when provided', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
        serviceName: 'my-service',
      };

      const testInstance = DatastageV3.newInstance(options);

      expect(getAuthenticatorMock).not.toHaveBeenCalled();
      expect(testInstance.baseOptions.authenticator).toBeInstanceOf(NoAuthAuthenticator);
      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
      expect(testInstance.baseOptions.serviceName).toBe('my-service');
      expect(testInstance).toBeInstanceOf(DatastageV3);
    });
  });
  describe('the constructor', () => {
    test('use user-given service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
        serviceUrl: 'custom.com',
      };

      const testInstance = new DatastageV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe('custom.com');
    });

    test('use default service url', () => {
      const options = {
        authenticator: new NoAuthAuthenticator(),
      };

      const testInstance = new DatastageV3(options);

      expect(testInstance.baseOptions.serviceUrl).toBe(DatastageV3.DEFAULT_SERVICE_URL);
    });
  });
  describe('datastageFlowsDelete', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsDelete
        const id = ['testString'];
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const force = true;
        const params = {
          id: id,
          catalogId: catalogId,
          projectId: projectId,
          force: force,
        };

        const datastageFlowsDeleteResult = datastageService.datastageFlowsDelete(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsDeleteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['id']).toEqual(id);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.qs['force']).toEqual(force);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const id = ['testString'];
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          id,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsDelete(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsDelete({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsDeletePromise = datastageService.datastageFlowsDelete();
        expectToBePromise(datastageFlowsDeletePromise);

        datastageFlowsDeletePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('datastageFlowsList', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsList
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const sort = 'testString';
        const start = 'testString';
        const limit = 100;
        const entityName = 'testString';
        const entityDescription = 'testString';
        const params = {
          catalogId: catalogId,
          projectId: projectId,
          sort: sort,
          start: start,
          limit: limit,
          entityName: entityName,
          entityDescription: entityDescription,
        };

        const datastageFlowsListResult = datastageService.datastageFlowsList(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsListResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.qs['sort']).toEqual(sort);
        expect(options.qs['start']).toEqual(start);
        expect(options.qs['limit']).toEqual(limit);
        expect(options.qs['entity.name']).toEqual(entityName);
        expect(options.qs['entity.description']).toEqual(entityDescription);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsList(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        datastageService.datastageFlowsList({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('datastageFlowsCreate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        nodes: [{ foo: 'bar' }],
        runtime_ref: 'pxOsh',
      };

      // PipelineJson
      const pipelineJsonModel = {
        app_data: { foo: 'bar' },
        doc_type: 'pipeline',
        external_paramsets: [{ foo: 'bar' }],
        id: '84c2b6fb-1dd5-4114-b4ba-9bb2cb364fff',
        json_schema:
          'http://api.dataplatform.ibm.com/schemas/common-pipeline/pipeline-flow/pipeline-flow-v3-schema.json',
        parameters: { foo: 'bar' },
        pipelines: [pipelinesModel],
        primary_pipeline: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        runtimes: [{ foo: 'bar' }],
        schemas: [{ foo: 'bar' }],
        version: '3.0',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsCreate
        const dataIntgFlowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const assetCategory = 'system';
        const params = {
          dataIntgFlowName: dataIntgFlowName,
          pipelineFlows: pipelineFlows,
          catalogId: catalogId,
          projectId: projectId,
          assetCategory: assetCategory,
        };

        const datastageFlowsCreateResult = datastageService.datastageFlowsCreate(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsCreateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['pipeline_flows']).toEqual(pipelineFlows);
        expect(options.qs['data_intg_flow_name']).toEqual(dataIntgFlowName);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.qs['asset_category']).toEqual(assetCategory);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgFlowName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgFlowName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsCreate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsCreate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsCreatePromise = datastageService.datastageFlowsCreate();
        expectToBePromise(datastageFlowsCreatePromise);

        datastageFlowsCreatePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('datastageFlowsGet', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsGet
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId: dataIntgFlowId,
          catalogId: catalogId,
          projectId: projectId,
        };

        const datastageFlowsGetResult = datastageService.datastageFlowsGet(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsGetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.path['data_intg_flow_id']).toEqual(dataIntgFlowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgFlowId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgFlowId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsGet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsGet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsGetPromise = datastageService.datastageFlowsGet();
        expectToBePromise(datastageFlowsGetPromise);

        datastageFlowsGetPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('datastageFlowsUpdate', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        nodes: [{ foo: 'bar' }],
        runtime_ref: 'pxOsh',
      };

      // PipelineJson
      const pipelineJsonModel = {
        app_data: { foo: 'bar' },
        doc_type: 'pipeline',
        external_paramsets: [{ foo: 'bar' }],
        id: '84c2b6fb-1dd5-4114-b4ba-9bb2cb364fff',
        json_schema:
          'http://api.dataplatform.ibm.com/schemas/common-pipeline/pipeline-flow/pipeline-flow-v3-schema.json',
        parameters: { foo: 'bar' },
        pipelines: [pipelinesModel],
        primary_pipeline: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        runtimes: [{ foo: 'bar' }],
        schemas: [{ foo: 'bar' }],
        version: '3.0',
      };

      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsUpdate
        const dataIntgFlowId = 'testString';
        const dataIntgFlowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId: dataIntgFlowId,
          dataIntgFlowName: dataIntgFlowName,
          pipelineFlows: pipelineFlows,
          catalogId: catalogId,
          projectId: projectId,
        };

        const datastageFlowsUpdateResult = datastageService.datastageFlowsUpdate(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsUpdateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}', 'PUT');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body['pipeline_flows']).toEqual(pipelineFlows);
        expect(options.qs['data_intg_flow_name']).toEqual(dataIntgFlowName);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.path['data_intg_flow_id']).toEqual(dataIntgFlowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgFlowId = 'testString';
        const dataIntgFlowName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgFlowId,
          dataIntgFlowName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsUpdate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsUpdate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsUpdatePromise = datastageService.datastageFlowsUpdate();
        expectToBePromise(datastageFlowsUpdatePromise);

        datastageFlowsUpdatePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('datastageFlowsClone', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsClone
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId: dataIntgFlowId,
          catalogId: catalogId,
          projectId: projectId,
        };

        const datastageFlowsCloneResult = datastageService.datastageFlowsClone(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsCloneResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}/clone', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.path['data_intg_flow_id']).toEqual(dataIntgFlowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgFlowId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgFlowId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsClone(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsClone({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsClonePromise = datastageService.datastageFlowsClone();
        expectToBePromise(datastageFlowsClonePromise);

        datastageFlowsClonePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('datastageFlowsCompile', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation datastageFlowsCompile
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const runtimeType = 'testString';
        const params = {
          dataIntgFlowId: dataIntgFlowId,
          catalogId: catalogId,
          projectId: projectId,
          runtimeType: runtimeType,
        };

        const datastageFlowsCompileResult = datastageService.datastageFlowsCompile(params);

        // all methods should return a Promise
        expectToBePromise(datastageFlowsCompileResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/ds_codegen/compile/{data_intg_flow_id}', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.qs['runtime_type']).toEqual(runtimeType);
        expect(options.path['data_intg_flow_id']).toEqual(dataIntgFlowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgFlowId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgFlowId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.datastageFlowsCompile(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.datastageFlowsCompile({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const datastageFlowsCompilePromise = datastageService.datastageFlowsCompile();
        expectToBePromise(datastageFlowsCompilePromise);

        datastageFlowsCompilePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('migrationCreate', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation migrationCreate
        const body = Buffer.from('This is a mock file.');
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const onFailure = 'continue';
        const conflictResolution = 'rename';
        const attachmentType = 'isx';
        const fileName = 'myFlows.isx';
        const params = {
          body: body,
          catalogId: catalogId,
          projectId: projectId,
          onFailure: onFailure,
          conflictResolution: conflictResolution,
          attachmentType: attachmentType,
          fileName: fileName,
        };

        const migrationCreateResult = datastageService.migrationCreate(params);

        // all methods should return a Promise
        expectToBePromise(migrationCreateResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/octet-stream';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(body);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.qs['on_failure']).toEqual(onFailure);
        expect(options.qs['conflict_resolution']).toEqual(conflictResolution);
        expect(options.qs['attachment_type']).toEqual(attachmentType);
        expect(options.qs['file_name']).toEqual(fileName);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const body = Buffer.from('This is a mock file.');
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          body,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.migrationCreate(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.migrationCreate({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const migrationCreatePromise = datastageService.migrationCreate();
        expectToBePromise(migrationCreatePromise);

        migrationCreatePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('migrationDelete', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation migrationDelete
        const importId = 'cc6dbbfd-810d-4f0e-b0a9-228c328aff29';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          importId: importId,
          catalogId: catalogId,
          projectId: projectId,
        };

        const migrationDeleteResult = datastageService.migrationDelete(params);

        // all methods should return a Promise
        expectToBePromise(migrationDeleteResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports/{import_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.path['import_id']).toEqual(importId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const importId = 'cc6dbbfd-810d-4f0e-b0a9-228c328aff29';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          importId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.migrationDelete(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.migrationDelete({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const migrationDeletePromise = datastageService.migrationDelete();
        expectToBePromise(migrationDeletePromise);

        migrationDeletePromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('migrationGet', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation migrationGet
        const importId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          importId: importId,
          catalogId: catalogId,
          projectId: projectId,
        };

        const migrationGetResult = datastageService.migrationGet(params);

        // all methods should return a Promise
        expectToBePromise(migrationGetResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports/{import_id}', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs['catalog_id']).toEqual(catalogId);
        expect(options.qs['project_id']).toEqual(projectId);
        expect(options.path['import_id']).toEqual(importId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const importId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          importId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.migrationGet(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.migrationGet({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const migrationGetPromise = datastageService.migrationGet();
        expectToBePromise(migrationGetPromise);

        migrationGetPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
