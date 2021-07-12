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
  describe('deleteDatastageFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDatastageFlows
        const id = ['testString'];
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const force = true;
        const params = {
          id,
          catalogId,
          projectId,
          force,
        };

        const deleteDatastageFlowsResult = datastageService.deleteDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(deleteDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.id).toEqual(id);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.force).toEqual(force);
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

        datastageService.deleteDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.deleteDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDatastageFlowsPromise = datastageService.deleteDatastageFlows();
        expectToBePromise(deleteDatastageFlowsPromise);

        deleteDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDatastageFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDatastageFlows
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const sort = 'testString';
        const start = 'testString';
        const limit = 100;
        const entityName = 'testString';
        const entityDescription = 'testString';
        const params = {
          catalogId,
          projectId,
          sort,
          start,
          limit,
          entityName,
          entityDescription,
        };

        const listDatastageFlowsResult = datastageService.listDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(listDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.sort).toEqual(sort);
        expect(options.qs.start).toEqual(start);
        expect(options.qs.limit).toEqual(limit);
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

        datastageService.listDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        datastageService.listDatastageFlows({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createDatastageFlows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow.',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        name: 'ContainerC1',
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
        // Construct the params object for operation createDatastageFlows
        const dataIntgFlowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const assetCategory = 'system';
        const params = {
          dataIntgFlowName,
          pipelineFlows,
          catalogId,
          projectId,
          assetCategory,
        };

        const createDatastageFlowsResult = datastageService.createDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(createDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.pipeline_flows).toEqual(pipelineFlows);
        expect(options.qs.data_intg_flow_name).toEqual(dataIntgFlowName);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.asset_category).toEqual(assetCategory);
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

        datastageService.createDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.createDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createDatastageFlowsPromise = datastageService.createDatastageFlows();
        expectToBePromise(createDatastageFlowsPromise);

        createDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDatastageFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDatastageFlows
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId,
          catalogId,
          projectId,
        };

        const getDatastageFlowsResult = datastageService.getDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(getDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_flow_id).toEqual(dataIntgFlowId);
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

        datastageService.getDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.getDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDatastageFlowsPromise = datastageService.getDatastageFlows();
        expectToBePromise(getDatastageFlowsPromise);

        getDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDatastageFlows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow.',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        name: 'ContainerC1',
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
        // Construct the params object for operation updateDatastageFlows
        const dataIntgFlowId = 'testString';
        const dataIntgFlowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId,
          dataIntgFlowName,
          pipelineFlows,
          catalogId,
          projectId,
        };

        const updateDatastageFlowsResult = datastageService.updateDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(updateDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}', 'PUT');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.pipeline_flows).toEqual(pipelineFlows);
        expect(options.qs.data_intg_flow_name).toEqual(dataIntgFlowName);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_flow_id).toEqual(dataIntgFlowId);
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

        datastageService.updateDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.updateDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateDatastageFlowsPromise = datastageService.updateDatastageFlows();
        expectToBePromise(updateDatastageFlowsPromise);

        updateDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('cloneDatastageFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cloneDatastageFlows
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgFlowId,
          catalogId,
          projectId,
        };

        const cloneDatastageFlowsResult = datastageService.cloneDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(cloneDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/{data_intg_flow_id}/clone', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_flow_id).toEqual(dataIntgFlowId);
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

        datastageService.cloneDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.cloneDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const cloneDatastageFlowsPromise = datastageService.cloneDatastageFlows();
        expectToBePromise(cloneDatastageFlowsPromise);

        cloneDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('compileDatastageFlows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation compileDatastageFlows
        const dataIntgFlowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const runtimeType = 'testString';
        const params = {
          dataIntgFlowId,
          catalogId,
          projectId,
          runtimeType,
        };

        const compileDatastageFlowsResult = datastageService.compileDatastageFlows(params);

        // all methods should return a Promise
        expectToBePromise(compileDatastageFlowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/ds_codegen/compile/{data_intg_flow_id}', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.runtime_type).toEqual(runtimeType);
        expect(options.path.data_intg_flow_id).toEqual(dataIntgFlowId);
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

        datastageService.compileDatastageFlows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.compileDatastageFlows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const compileDatastageFlowsPromise = datastageService.compileDatastageFlows();
        expectToBePromise(compileDatastageFlowsPromise);

        compileDatastageFlowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteDatastageSubflows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteDatastageSubflows
        const id = ['testString'];
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          id,
          catalogId,
          projectId,
        };

        const deleteDatastageSubflowsResult = datastageService.deleteDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(deleteDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/subflows', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.id).toEqual(id);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
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

        datastageService.deleteDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.deleteDatastageSubflows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteDatastageSubflowsPromise = datastageService.deleteDatastageSubflows();
        expectToBePromise(deleteDatastageSubflowsPromise);

        deleteDatastageSubflowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('listDatastageSubflows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation listDatastageSubflows
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const sort = 'testString';
        const start = 'testString';
        const limit = 100;
        const entityName = 'testString';
        const entityDescription = 'testString';
        const params = {
          catalogId,
          projectId,
          sort,
          start,
          limit,
          entityName,
          entityDescription,
        };

        const listDatastageSubflowsResult = datastageService.listDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(listDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/subflows', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.sort).toEqual(sort);
        expect(options.qs.start).toEqual(start);
        expect(options.qs.limit).toEqual(limit);
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

        datastageService.listDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });

      test('should not have any problems when no parameters are passed in', () => {
        // invoke the method with no parameters
        datastageService.listDatastageSubflows({});
        checkForSuccessfulExecution(createRequestMock);
      });
    });
  });
  describe('createDatastageSubflows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow.',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        name: 'ContainerC1',
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
        // Construct the params object for operation createDatastageSubflows
        const dataIntgSubflowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const assetCategory = 'system';
        const params = {
          dataIntgSubflowName,
          pipelineFlows,
          catalogId,
          projectId,
          assetCategory,
        };

        const createDatastageSubflowsResult = datastageService.createDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(createDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/subflows', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.pipeline_flows).toEqual(pipelineFlows);
        expect(options.qs.data_intg_subflow_name).toEqual(dataIntgSubflowName);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.asset_category).toEqual(assetCategory);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgSubflowName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgSubflowName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.createDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.createDatastageSubflows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createDatastageSubflowsPromise = datastageService.createDatastageSubflows();
        expectToBePromise(createDatastageSubflowsPromise);

        createDatastageSubflowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getDatastageSubflows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getDatastageSubflows
        const dataIntgSubflowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgSubflowId,
          catalogId,
          projectId,
        };

        const getDatastageSubflowsResult = datastageService.getDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(getDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/subflows/{data_intg_subflow_id}', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_subflow_id).toEqual(dataIntgSubflowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgSubflowId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgSubflowId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.getDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.getDatastageSubflows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getDatastageSubflowsPromise = datastageService.getDatastageSubflows();
        expectToBePromise(getDatastageSubflowsPromise);

        getDatastageSubflowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('updateDatastageSubflows', () => {
    describe('positive tests', () => {
      // Request models needed by this operation.

      // Pipelines
      const pipelinesModel = {
        app_data: { foo: 'bar' },
        description: 'A test DataStage flow.',
        id: 'fa1b859a-d592-474d-b56c-2137e4efa4bc',
        name: 'ContainerC1',
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
        // Construct the params object for operation updateDatastageSubflows
        const dataIntgSubflowId = 'testString';
        const dataIntgSubflowName = 'testString';
        const pipelineFlows = pipelineJsonModel;
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgSubflowId,
          dataIntgSubflowName,
          pipelineFlows,
          catalogId,
          projectId,
        };

        const updateDatastageSubflowsResult = datastageService.updateDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(updateDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/data_intg_flows/subflows/{data_intg_subflow_id}', 'PUT');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/json;charset=utf-8';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body.pipeline_flows).toEqual(pipelineFlows);
        expect(options.qs.data_intg_subflow_name).toEqual(dataIntgSubflowName);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_subflow_id).toEqual(dataIntgSubflowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgSubflowId = 'testString';
        const dataIntgSubflowName = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgSubflowId,
          dataIntgSubflowName,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.updateDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.updateDatastageSubflows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const updateDatastageSubflowsPromise = datastageService.updateDatastageSubflows();
        expectToBePromise(updateDatastageSubflowsPromise);

        updateDatastageSubflowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('cloneDatastageSubflows', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation cloneDatastageSubflows
        const dataIntgSubflowId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          dataIntgSubflowId,
          catalogId,
          projectId,
        };

        const cloneDatastageSubflowsResult = datastageService.cloneDatastageSubflows(params);

        // all methods should return a Promise
        expectToBePromise(cloneDatastageSubflowsResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(
          options,
          '/v3/data_intg_flows/subflows/{data_intg_subflow_id}/clone',
          'POST'
        );
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.data_intg_subflow_id).toEqual(dataIntgSubflowId);
      });

      test('should prioritize user-given headers', () => {
        // parameters
        const dataIntgSubflowId = 'testString';
        const userAccept = 'fake/accept';
        const userContentType = 'fake/contentType';
        const params = {
          dataIntgSubflowId,
          headers: {
            Accept: userAccept,
            'Content-Type': userContentType,
          },
        };

        datastageService.cloneDatastageSubflows(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.cloneDatastageSubflows({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const cloneDatastageSubflowsPromise = datastageService.cloneDatastageSubflows();
        expectToBePromise(cloneDatastageSubflowsPromise);

        cloneDatastageSubflowsPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('createMigration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation createMigration
        const body = Buffer.from('This is a mock file.');
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const onFailure = 'continue';
        const conflictResolution = 'rename';
        const attachmentType = 'isx';
        const fileName = 'myFlows.isx';
        const params = {
          body,
          catalogId,
          projectId,
          onFailure,
          conflictResolution,
          attachmentType,
          fileName,
        };

        const createMigrationResult = datastageService.createMigration(params);

        // all methods should return a Promise
        expectToBePromise(createMigrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports', 'POST');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = 'application/octet-stream';
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.body).toEqual(body);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.qs.on_failure).toEqual(onFailure);
        expect(options.qs.conflict_resolution).toEqual(conflictResolution);
        expect(options.qs.attachment_type).toEqual(attachmentType);
        expect(options.qs.file_name).toEqual(fileName);
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

        datastageService.createMigration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.createMigration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const createMigrationPromise = datastageService.createMigration();
        expectToBePromise(createMigrationPromise);

        createMigrationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('deleteMigration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation deleteMigration
        const importId = 'cc6dbbfd-810d-4f0e-b0a9-228c328aff29';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          importId,
          catalogId,
          projectId,
        };

        const deleteMigrationResult = datastageService.deleteMigration(params);

        // all methods should return a Promise
        expectToBePromise(deleteMigrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports/{import_id}', 'DELETE');
        const expectedAccept = undefined;
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.import_id).toEqual(importId);
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

        datastageService.deleteMigration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.deleteMigration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const deleteMigrationPromise = datastageService.deleteMigration();
        expectToBePromise(deleteMigrationPromise);

        deleteMigrationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
  describe('getMigration', () => {
    describe('positive tests', () => {
      test('should pass the right params to createRequest', () => {
        // Construct the params object for operation getMigration
        const importId = 'testString';
        const catalogId = 'testString';
        const projectId = 'bd0dbbfd-810d-4f0e-b0a9-228c328a8e23';
        const params = {
          importId,
          catalogId,
          projectId,
        };

        const getMigrationResult = datastageService.getMigration(params);

        // all methods should return a Promise
        expectToBePromise(getMigrationResult);

        // assert that create request was called
        expect(createRequestMock).toHaveBeenCalledTimes(1);

        const options = getOptions(createRequestMock);

        checkUrlAndMethod(options, '/v3/migration/isx_imports/{import_id}', 'GET');
        const expectedAccept = 'application/json;charset=utf-8';
        const expectedContentType = undefined;
        checkMediaHeaders(createRequestMock, expectedAccept, expectedContentType);
        expect(options.qs.catalog_id).toEqual(catalogId);
        expect(options.qs.project_id).toEqual(projectId);
        expect(options.path.import_id).toEqual(importId);
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

        datastageService.getMigration(params);
        checkMediaHeaders(createRequestMock, userAccept, userContentType);
      });
    });

    describe('negative tests', () => {
      test('should enforce required parameters', async (done) => {
        let err;
        try {
          await datastageService.getMigration({});
        } catch (e) {
          err = e;
        }

        expect(err.message).toMatch(/Missing required parameters/);
        done();
      });

      test('should reject promise when required params are not given', (done) => {
        const getMigrationPromise = datastageService.getMigration();
        expectToBePromise(getMigrationPromise);

        getMigrationPromise.catch((err) => {
          expect(err.message).toMatch(/Missing required parameters/);
          done();
        });
      });
    });
  });
});
