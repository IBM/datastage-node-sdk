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

/**
 * IBM OpenAPI SDK Code Generator Version: 3.28.0-55613c9e-20210220-164656
 */


import * as extend from 'extend';
import { IncomingHttpHeaders, OutgoingHttpHeaders } from 'http';
import { Authenticator, BaseService, getAuthenticatorFromEnvironment, getMissingParams, UserOptions } from 'ibm-cloud-sdk-core';
import { getSdkHeaders } from '../lib/common';

/**
 * The IBM DataStage service provides APIs to manage, edit, and run data flows in supported runtimes such as PX-Engine.
 */

class DatastageV3 extends BaseService {

  static DEFAULT_SERVICE_URL: string = 'https://datastage.cloud.ibm.com/data_intg';
  static DEFAULT_SERVICE_NAME: string = 'datastage';

  /*************************
   * Factory method
   ************************/

  /**
   * Constructs an instance of DatastageV3 with passed in options and external configuration.
   *
   * @param {UserOptions} [options] - The parameters to send to the service.
   * @param {string} [options.serviceName] - The name of the service to configure
   * @param {Authenticator} [options.authenticator] - The Authenticator object used to authenticate requests to the service
   * @param {string} [options.serviceUrl] - The URL for the service
   * @returns {DatastageV3}
   */

  public static newInstance(options: UserOptions): DatastageV3 {
    options = options || {};

    if (!options.serviceName) {
      options.serviceName = this.DEFAULT_SERVICE_NAME;
    }
    if (!options.authenticator) {
      options.authenticator = getAuthenticatorFromEnvironment(options.serviceName);
    }
    const service = new DatastageV3(options);
    service.configureService(options.serviceName);
    if (options.serviceUrl) {
      service.setServiceUrl(options.serviceUrl);
    }
    return service;
  }


  /**
   * Construct a DatastageV3 object.
   *
   * @param {Object} options - Options for the service.
   * @param {string} [options.serviceUrl] - The base url to use when contacting the service. The base url may differ between IBM Cloud regions.
   * @param {OutgoingHttpHeaders} [options.headers] - Default headers that shall be included with every request to the service.
   * @param {Authenticator} options.authenticator - The Authenticator object used to authenticate requests to the service
   * @constructor
   * @returns {DatastageV3}
   */
  constructor(options: UserOptions) {
    options = options || {};

    super(options);
    if (options.serviceUrl) {
      this.setServiceUrl(options.serviceUrl);
    } else {
      this.setServiceUrl(DatastageV3.DEFAULT_SERVICE_URL);
    }
  }

  /*************************
   * dataStageFlows
   ************************/

  /**
   * Delete DataStage flows.
   *
   * Deletes the specified data flows in a project or catalog (either `project_id` or `catalog_id` must be set).
   *
   * If the deletion of the data flows and their runs will take some time to finish, then a 202 response will be
   * returned and the deletion will continue asynchronously.
   *          All the data flow runs associated with the data flows will also be deleted. If a data flow is still
   * running, it will not be deleted unless the force parameter is set to true. If a data flow is still running and the
   * force parameter is set to true, the call returns immediately with a 202 response. The related data flows are
   * deleted after the data flow runs are stopped.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.id - The list of DataStage flow IDs to delete.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {boolean} [params.force] - Whether to stop all running data flows. Running DataStage flows must be stopped
   * before the DataStage flows can be deleted.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.Empty>>}
   */
  public deleteDatastageFlows(params: DatastageV3.DeleteDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'id': _params.id,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'force': _params.force
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get metadata and lock information for DataStage flows.
   *
   * Lists the metadata, entity and lock information for DataStage flows that are contained in the specified project.
   *
   * Use the following parameters to filter the results:
   *
   * | Field                    | Match type   | Example                                 |
   * | ------------------------ | ------------ | --------------------------------------- |
   * | `entity.name`              | Equals           | `entity.name=MyDataStageFlow`  |
   * | `entity.name`              | Starts with      | `entity.name=starts:MyData`  |
   * | `entity.description`       | Equals           | `entity.description=movement`  |
   * | `entity.description`       | Starts with      | `entity.description=starts:data`  |
   *
   * To sort the results, use one or more of the parameters  described in the following section. If no sort key is
   * specified, the results are sorted in descending order on `metadata.create_time` (i.e. returning the most  recently
   * created data flows first).
   *
   * | Field                          | Example |
   * | ------------------------- | ----------------------------------- |
   * | sort     | `sort=+entity.name` (sort by ascending name)  |
   * | sort     | `sort=-metadata.create_time` (sort by descending creation time) |
   *
   * Multiple sort keys can be specified by delimiting them with a comma. For example, to sort in descending order on
   * `create_time` and then in ascending order on name use: `sort=-metadata.create_time`,`+entity.name`.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.sort] - The field to sort the results on, including whether to sort ascending (+) or
   * descending (-), for example, sort=-metadata.create_time.
   * @param {string} [params.start] - The page token indicating where to start paging from.
   * @param {number} [params.limit] - The limit of the number of items to return, for example limit=50. If not specified
   * a default of 100 will be  used.
   * @param {string} [params.entityName] - Filter results based on the specified name.
   * @param {string} [params.entityDescription] - Filter results based on the specified description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataFlowPagedCollection>>}
   */
  public listDatastageFlows(params?: DatastageV3.ListDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.DataFlowPagedCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'sort': _params.sort,
      'start': _params.start,
      'limit': _params.limit,
      'entity.name': _params.entityName,
      'entity.description': _params.entityDescription
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'listDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create DataStage flow.
   *
   * Creates a DataStage flow in the specified project or catalog (either `project_id` or `catalog_id` must be set). All
   * subsequent calls to use the data flow must specify the project or catalog ID the data flow was created in.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgFlowName - The data flow name.
   * @param {PipelineJson} [params.pipelineFlows] - Pipeline flow to be stored.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.assetCategory] - The category of the asset. Must be either SYSTEM or USER. Only a
   * registered service can use this parameter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public createDatastageFlows(params: DatastageV3.CreateDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgFlowName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'pipeline_flows': _params.pipelineFlows
    };

    const query = {
      'data_intg_flow_name': _params.dataIntgFlowName,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'asset_category': _params.assetCategory
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'createDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get DataStage flow.
   *
   * Lists the DataStage flow that is contained in the specified project. Attachments, metadata and a limited number of
   * attributes from the entity of each DataStage flow is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgFlowId - The DataStage flow ID to use.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlowJson>>}
   */
  public getDatastageFlows(params: DatastageV3.GetDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlowJson>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgFlowId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_flow_id': _params.dataIntgFlowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'getDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/{data_intg_flow_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update DataStage flow.
   *
   * Modifies a data flow in the specified project or catalog (either `project_id` or `catalog_id` must be set). All
   * subsequent calls to use the data flow must specify the project or catalog ID the data flow was created in.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgFlowId - The DataStage flow ID to use.
   * @param {string} params.dataIntgFlowName - The data flow name.
   * @param {PipelineJson} [params.pipelineFlows] - Pipeline flow to be stored.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public updateDatastageFlows(params: DatastageV3.UpdateDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgFlowId', 'dataIntgFlowName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'pipeline_flows': _params.pipelineFlows
    };

    const query = {
      'data_intg_flow_name': _params.dataIntgFlowName,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_flow_id': _params.dataIntgFlowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'updateDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/{data_intg_flow_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Clone DataStage flow.
   *
   * Create a DataStage flow in the specified project or catalog based on an existing DataStage flow in the same project
   * or catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgFlowId - The DataStage flow ID to use.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public cloneDatastageFlows(params: DatastageV3.CloneDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgFlowId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_flow_id': _params.dataIntgFlowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'cloneDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/{data_intg_flow_id}/clone',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Compile DataStage flow to generate runtime assets.
   *
   * Generate the runtime assets for a DataStage flow in the specified project or catalog for a specified runtime type.
   * Either project_id or catalog_id must be specified.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgFlowId - The DataStage flow ID to use.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.runtimeType] - The type of the runtime to use. e.g. dspxosh or Spark etc. If not provided
   * queried from within pipeline flow if available otherwise default of dspxosh is used.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.FlowCompileResponse>>}
   */
  public compileDatastageFlows(params: DatastageV3.CompileDatastageFlowsParams): Promise<DatastageV3.Response<DatastageV3.FlowCompileResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgFlowId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'runtime_type': _params.runtimeType
    };

    const path = {
      'data_intg_flow_id': _params.dataIntgFlowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'compileDatastageFlows');

    const parameters = {
      options: {
        url: '/v3/ds_codegen/compile/{data_intg_flow_id}',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * dataStageSubflows
   ************************/

  /**
   * Delete DataStage subflows.
   *
   * Deletes the specified data subflows in a project or catalog (either `project_id` or `catalog_id` must be set).
   *
   * If the deletion of the data subflows will take some time to finish, then a 202 response will be returned and the
   * deletion will continue asynchronously.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string[]} params.id - The list of DataStage subflow IDs to delete.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.Empty>>}
   */
  public deleteDatastageSubflows(params: DatastageV3.DeleteDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['id'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'id': _params.id,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows',
        method: 'DELETE',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get metadata and lock information for DataStage subflows.
   *
   * Lists the metadata, entity and lock information for DataStage subflows that are contained in the specified project.
   *
   *
   * Use the following parameters to filter the results:
   *
   * | Field                    | Match type   | Example                                 |
   * | ------------------------ | ------------ | --------------------------------------- |
   * | `entity.name`              | Equals           | `entity.name=MyDataStageSubFlow`  |
   * | `entity.name`              | Starts with      | `entity.name=starts:MyData`  |
   * | `entity.description`       | Equals           | `entity.description=movement`  |
   * | `entity.description`       | Starts with      | `entity.description=starts:data`  |
   *
   * To sort the results, use one or more of the parameters  described in the following section. If no sort key is
   * specified, the results are sorted in descending order on `metadata.create_time` (i.e. returning the most  recently
   * created data flows first).
   *
   * | Field                          | Example |
   * | ------------------------- | ----------------------------------- |
   * | sort     | `sort=+entity.name` (sort by ascending name)  |
   * | sort     | `sort=-metadata.create_time` (sort by descending creation time) |
   *
   * Multiple sort keys can be specified by delimiting them with a comma. For example, to sort in descending order on
   * `create_time` and then in ascending order on name use: `sort=-metadata.create_time`,`+entity.name`.
   *
   * @param {Object} [params] - The parameters to send to the service.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.sort] - The field to sort the results on, including whether to sort ascending (+) or
   * descending (-), for example, sort=-metadata.create_time.
   * @param {string} [params.start] - The page token indicating where to start paging from.
   * @param {number} [params.limit] - The limit of the number of items to return, for example limit=50. If not specified
   * a default of 100 will be  used.
   * @param {string} [params.entityName] - Filter results based on the specified name.
   * @param {string} [params.entityDescription] - Filter results based on the specified description.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataFlowPagedCollection>>}
   */
  public listDatastageSubflows(params?: DatastageV3.ListDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.DataFlowPagedCollection>> {
    const _params = Object.assign({}, params);

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'sort': _params.sort,
      'start': _params.start,
      'limit': _params.limit,
      'entity.name': _params.entityName,
      'entity.description': _params.entityDescription
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'listDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows',
        method: 'GET',
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Create DataStage subflow.
   *
   * Creates a DataStage subflow in the specified project or catalog (either `project_id` or `catalog_id` must be set).
   * All subsequent calls to use the data flow must specify the project or catalog ID the data flow was created in.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgSubflowName - The DataStage subflow name.
   * @param {PipelineJson} [params.pipelineFlows] - Pipeline flow to be stored.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.assetCategory] - The category of the asset. Must be either SYSTEM or USER. Only a
   * registered service can use this parameter.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public createDatastageSubflows(params: DatastageV3.CreateDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgSubflowName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'pipeline_flows': _params.pipelineFlows
    };

    const query = {
      'data_intg_subflow_name': _params.dataIntgSubflowName,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'asset_category': _params.assetCategory
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'createDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get DataStage subflow.
   *
   * Lists the DataStage subflow that is contained in the specified project. Attachments, metadata and a limited number
   * of attributes from the entity of each DataStage flow is returned.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgSubflowId - The DataStage subflow ID to use.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlowJson>>}
   */
  public getDatastageSubflows(params: DatastageV3.GetDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlowJson>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgSubflowId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_subflow_id': _params.dataIntgSubflowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'getDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows/{data_intg_subflow_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Update DataStage subflow.
   *
   * Modifies a data subflow in the specified project or catalog (either `project_id` or `catalog_id` must be set). All
   * subsequent calls to use the data flow must specify the project or catalog ID the data flow was created in.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgSubflowId - The DataStage subflow ID to use.
   * @param {string} params.dataIntgSubflowName - The DataStage subflow name.
   * @param {PipelineJson} [params.pipelineFlows] - Pipeline flow to be stored.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public updateDatastageSubflows(params: DatastageV3.UpdateDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgSubflowId', 'dataIntgSubflowName'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = {
      'pipeline_flows': _params.pipelineFlows
    };

    const query = {
      'data_intg_subflow_name': _params.dataIntgSubflowName,
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_subflow_id': _params.dataIntgSubflowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'updateDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows/{data_intg_subflow_id}',
        method: 'PUT',
        body,
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
          'Content-Type': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Clone DataStage subflow.
   *
   * Create a DataStage subflow in the specified project or catalog based on an existing DataStage subflow in the same
   * project or catalog.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.dataIntgSubflowId - The DataStage subflow ID to use.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>>}
   */
  public cloneDatastageSubflows(params: DatastageV3.CloneDatastageSubflowsParams): Promise<DatastageV3.Response<DatastageV3.DataIntgFlow>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['dataIntgSubflowId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'data_intg_subflow_id': _params.dataIntgSubflowId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'cloneDatastageSubflows');

    const parameters = {
      options: {
        url: '/v3/data_intg_flows/subflows/{data_intg_subflow_id}/clone',
        method: 'POST',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /*************************
   * migration
   ************************/

  /**
   * Create V3 data flows from the attached job export file.
   *
   * Creates data flows from the attached job export file. This is an asynchronous call. The API call returns almost
   * immediately which does not necessarily imply the completion of the import request. It only means that the import
   * request has been accepted. The status field of the import request is included in the import response object. The
   * status "completed" ("in_progress", "failed", resp.) indicates the import request is completed (in progress, and
   * failed, resp.) The job export file for an import request may contain one mor more data flows. Unless the on_failure
   * option is set to "stop", a completed import request may contain not only successfully imported data flows but also
   * data flows that cannot be imported.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {NodeJS.ReadableStream|Buffer} params.body -
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.onFailure] - Action when the first import failure occurs. The default action is "continue"
   * which will continue importing the remaining data flows. The "stop" action will stop the import operation upon the
   * first error.
   * @param {string} [params.conflictResolution] - Resolution when data flow to be imported has a name conflict with an
   * existing data flow in the project or catalog. The default conflict resolution is "skip" will skip the data flow so
   * that it will not be imported. The "rename" resolution will append "_Import_NNNN" suffix to the original name and
   * use the new name for the imported data flow, while the "replace" resolution will first remove the existing data
   * flow with the same name and import the new data flow. For the "rename_replace" option, when the flow name is
   * already used, a new flow name with the suffix
   * "_DATASTAGE_ISX_IMPORT" will be used. If the name is not currently used, the imported flow will be created with
   * this name. In case the new name is already used, the existing flow will be removed  first before the imported flow
   * is created. With the rename_replace option, job creation will be determined as follows. If the job name is already
   * used, a new job name with the suffix ".DataStage job" will be used. If the new job name is not currently used, the
   * job will be created with this name. In case the new job name is already used, the job creation will not happen and
   * an error will be raised.
   * @param {string} [params.attachmentType] - Type of attachment. The default attachment type is "isx".
   * @param {string} [params.fileName] - Name of the input file, if it exists.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.ImportResponse>>}
   */
  public createMigration(params: DatastageV3.CreateMigrationParams): Promise<DatastageV3.Response<DatastageV3.ImportResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['body'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const body = _params.body;
    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId,
      'on_failure': _params.onFailure,
      'conflict_resolution': _params.conflictResolution,
      'attachment_type': _params.attachmentType,
      'file_name': _params.fileName
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'createMigration');

    const parameters = {
      options: {
        url: '/v3/migration/isx_imports',
        method: 'POST',
        body,
        qs: query,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
          'Content-Type': 'application/octet-stream',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Cancel a previous import request.
   *
   * Cancel a previous import request. Use GET /v3/migration/imports/{import_id} to obtain the current status of the
   * import, including whether it has been cancelled.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.importId - Unique ID of the import request.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.Empty>>}
   */
  public deleteMigration(params: DatastageV3.DeleteMigrationParams): Promise<DatastageV3.Response<DatastageV3.Empty>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['importId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'import_id': _params.importId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'deleteMigration');

    const parameters = {
      options: {
        url: '/v3/migration/isx_imports/{import_id}',
        method: 'DELETE',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

  /**
   * Get the status of a previous import request.
   *
   * Gets the status of an import request. The status field in the response object indicates if the given import is
   * completed, in progress, or failed. Detailed status information about each imported data flow is also contained in
   * the response object.
   *
   * @param {Object} params - The parameters to send to the service.
   * @param {string} params.importId - Unique ID of the import request.
   * @param {string} [params.catalogId] - The ID of the catalog to use. `catalog_id` or `project_id` is required.
   * @param {string} [params.projectId] - The ID of the project to use. `catalog_id` or `project_id` is required.
   * @param {OutgoingHttpHeaders} [params.headers] - Custom request headers
   * @returns {Promise<DatastageV3.Response<DatastageV3.ImportResponse>>}
   */
  public getMigration(params: DatastageV3.GetMigrationParams): Promise<DatastageV3.Response<DatastageV3.ImportResponse>> {
    const _params = Object.assign({}, params);
    const requiredParams = ['importId'];

    const missingParams = getMissingParams(_params, requiredParams);
    if (missingParams) {
      return Promise.reject(missingParams);
    }

    const query = {
      'catalog_id': _params.catalogId,
      'project_id': _params.projectId
    };

    const path = {
      'import_id': _params.importId
    };

    const sdkHeaders = getSdkHeaders(DatastageV3.DEFAULT_SERVICE_NAME, 'v3', 'getMigration');

    const parameters = {
      options: {
        url: '/v3/migration/isx_imports/{import_id}',
        method: 'GET',
        qs: query,
        path,
      },
      defaultOptions: extend(true, {}, this.baseOptions, {
        headers: extend(true, sdkHeaders, {
          'Accept': 'application/json;charset=utf-8',
        }, _params.headers),
      }),
    };

    return this.createRequest(parameters);
  };

}

/*************************
 * interfaces
 ************************/

namespace DatastageV3 {

  /** An operation response. */
  export interface Response<T = any>  {
    result: T;
    status: number;
    statusText: string;
    headers: IncomingHttpHeaders;
  }

  /** The callback for a service request. */
  export type Callback<T> = (error: any, response?: Response<T>) => void;

  /** The body of a service request that returns no response data. */
  export interface Empty { }

  /** A standard JS object, defined to avoid the limitations of `Object` and `object` */
  export interface JsonObject {
    [key: string]: any;
  }

  /*************************
   * request interfaces
   ************************/

  /** Parameters for the `deleteDatastageFlows` operation. */
  export interface DeleteDatastageFlowsParams {
    /** The list of DataStage flow IDs to delete. */
    id: string[];
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** Whether to stop all running data flows. Running DataStage flows must be stopped before the DataStage flows
     *  can be deleted.
     */
    force?: boolean;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDatastageFlows` operation. */
  export interface ListDatastageFlowsParams {
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** The field to sort the results on, including whether to sort ascending (+) or descending (-), for example,
     *  sort=-metadata.create_time.
     */
    sort?: string;
    /** The page token indicating where to start paging from. */
    start?: string;
    /** The limit of the number of items to return, for example limit=50. If not specified a default of 100 will be
     *  used.
     */
    limit?: number;
    /** Filter results based on the specified name. */
    entityName?: string;
    /** Filter results based on the specified description. */
    entityDescription?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDatastageFlows` operation. */
  export interface CreateDatastageFlowsParams {
    /** The data flow name. */
    dataIntgFlowName: string;
    /** Pipeline flow to be stored. */
    pipelineFlows?: PipelineJson;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** The category of the asset. Must be either SYSTEM or USER. Only a registered service can use this parameter. */
    assetCategory?: CreateDatastageFlowsConstants.AssetCategory | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDatastageFlows` operation. */
  export namespace CreateDatastageFlowsConstants {
    /** The category of the asset. Must be either SYSTEM or USER. Only a registered service can use this parameter. */
    export enum AssetCategory {
      SYSTEM = 'system',
      USER = 'user',
    }
  }

  /** Parameters for the `getDatastageFlows` operation. */
  export interface GetDatastageFlowsParams {
    /** The DataStage flow ID to use. */
    dataIntgFlowId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDatastageFlows` operation. */
  export interface UpdateDatastageFlowsParams {
    /** The DataStage flow ID to use. */
    dataIntgFlowId: string;
    /** The data flow name. */
    dataIntgFlowName: string;
    /** Pipeline flow to be stored. */
    pipelineFlows?: PipelineJson;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cloneDatastageFlows` operation. */
  export interface CloneDatastageFlowsParams {
    /** The DataStage flow ID to use. */
    dataIntgFlowId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `compileDatastageFlows` operation. */
  export interface CompileDatastageFlowsParams {
    /** The DataStage flow ID to use. */
    dataIntgFlowId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** The type of the runtime to use. e.g. dspxosh or Spark etc. If not provided queried from within pipeline flow
     *  if available otherwise default of dspxosh is used.
     */
    runtimeType?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `deleteDatastageSubflows` operation. */
  export interface DeleteDatastageSubflowsParams {
    /** The list of DataStage subflow IDs to delete. */
    id: string[];
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `listDatastageSubflows` operation. */
  export interface ListDatastageSubflowsParams {
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** The field to sort the results on, including whether to sort ascending (+) or descending (-), for example,
     *  sort=-metadata.create_time.
     */
    sort?: string;
    /** The page token indicating where to start paging from. */
    start?: string;
    /** The limit of the number of items to return, for example limit=50. If not specified a default of 100 will be
     *  used.
     */
    limit?: number;
    /** Filter results based on the specified name. */
    entityName?: string;
    /** Filter results based on the specified description. */
    entityDescription?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createDatastageSubflows` operation. */
  export interface CreateDatastageSubflowsParams {
    /** The DataStage subflow name. */
    dataIntgSubflowName: string;
    /** Pipeline flow to be stored. */
    pipelineFlows?: PipelineJson;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** The category of the asset. Must be either SYSTEM or USER. Only a registered service can use this parameter. */
    assetCategory?: CreateDatastageSubflowsConstants.AssetCategory | string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createDatastageSubflows` operation. */
  export namespace CreateDatastageSubflowsConstants {
    /** The category of the asset. Must be either SYSTEM or USER. Only a registered service can use this parameter. */
    export enum AssetCategory {
      SYSTEM = 'system',
      USER = 'user',
    }
  }

  /** Parameters for the `getDatastageSubflows` operation. */
  export interface GetDatastageSubflowsParams {
    /** The DataStage subflow ID to use. */
    dataIntgSubflowId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `updateDatastageSubflows` operation. */
  export interface UpdateDatastageSubflowsParams {
    /** The DataStage subflow ID to use. */
    dataIntgSubflowId: string;
    /** The DataStage subflow name. */
    dataIntgSubflowName: string;
    /** Pipeline flow to be stored. */
    pipelineFlows?: PipelineJson;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `cloneDatastageSubflows` operation. */
  export interface CloneDatastageSubflowsParams {
    /** The DataStage subflow ID to use. */
    dataIntgSubflowId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `createMigration` operation. */
  export interface CreateMigrationParams {
    body: NodeJS.ReadableStream|Buffer;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    /** Action when the first import failure occurs. The default action is "continue" which will continue importing
     *  the remaining data flows. The "stop" action will stop the import operation upon the first error.
     */
    onFailure?: CreateMigrationConstants.OnFailure | string;
    /** Resolution when data flow to be imported has a name conflict with an existing data flow in the project or
     *  catalog. The default conflict resolution is "skip" will skip the data flow so that it will not be imported. The
     *  "rename" resolution will append "_Import_NNNN" suffix to the original name and use the new name for the imported
     *  data flow, while the "replace" resolution will first remove the existing data flow with the same name and import
     *  the new data flow. For the "rename_replace" option, when the flow name is already used, a new flow name with the
     *  suffix
     *  "_DATASTAGE_ISX_IMPORT" will be used. If the name is not currently used, the imported flow will be created with
     *  this name. In case the new name is already used, the existing flow will be removed  first before the imported
     *  flow is created. With the rename_replace option, job creation will be determined as follows. If the job name is
     *  already used, a new job name with the suffix ".DataStage job" will be used. If the new job name is not currently
     *  used, the job will be created with this name. In case the new job name is already used, the job creation will
     *  not happen and an error will be raised.
     */
    conflictResolution?: CreateMigrationConstants.ConflictResolution | string;
    /** Type of attachment. The default attachment type is "isx". */
    attachmentType?: CreateMigrationConstants.AttachmentType | string;
    /** Name of the input file, if it exists. */
    fileName?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Constants for the `createMigration` operation. */
  export namespace CreateMigrationConstants {
    /** Action when the first import failure occurs. The default action is "continue" which will continue importing the remaining data flows. The "stop" action will stop the import operation upon the first error. */
    export enum OnFailure {
      CONTINUE = 'continue',
      STOP = 'stop',
    }
    /** Resolution when data flow to be imported has a name conflict with an existing data flow in the project or catalog. The default conflict resolution is "skip" will skip the data flow so that it will not be imported. The "rename" resolution will append "_Import_NNNN" suffix to the original name and use the new name for the imported data flow, while the "replace" resolution will first remove the existing data flow with the same name and import the new data flow. For the "rename_replace" option, when the flow name is already used, a new flow name with the suffix "_DATASTAGE_ISX_IMPORT" will be used. If the name is not currently used, the imported flow will be created with this name. In case the new name is already used, the existing flow will be removed  first before the imported flow is created. With the rename_replace option, job creation will be determined as follows. If the job name is already used, a new job name with the suffix ".DataStage job" will be used. If the new job name is not currently used, the job will be created with this name. In case the new job name is already used, the job creation will not happen and an error will be raised. */
    export enum ConflictResolution {
      SKIP = 'skip',
      RENAME = 'rename',
      REPLACE = 'replace',
      RENAME_REPLACE = 'rename_replace',
    }
    /** Type of attachment. The default attachment type is "isx". */
    export enum AttachmentType {
      ISX = 'isx',
    }
  }

  /** Parameters for the `deleteMigration` operation. */
  export interface DeleteMigrationParams {
    /** Unique ID of the import request. */
    importId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /** Parameters for the `getMigration` operation. */
  export interface GetMigrationParams {
    /** Unique ID of the import request. */
    importId: string;
    /** The ID of the catalog to use. `catalog_id` or `project_id` is required. */
    catalogId?: string;
    /** The ID of the project to use. `catalog_id` or `project_id` is required. */
    projectId?: string;
    headers?: OutgoingHttpHeaders;
  }

  /*************************
   * model interfaces
   ************************/

  /** The rules of visibility for an asset. */
  export interface AssetEntityROV {
    /** An array of members belonging to AssetEntityROV. */
    members?: string[];
    /** The values for mode are 0 (public, searchable and viewable by all), 8 (private, searchable by all, but not
     *  viewable unless view permission given) or 16 (hidden, only searchable by users with view permissions).
     */
    mode?: number;
  }

  /** System metadata about an asset. */
  export interface AssetSystemMetadata {
    /** The ID of the asset. */
    asset_id?: string;
    /** The type of the asset. */
    asset_type?: string;
    /** The ID of the catalog which contains the asset. `catalog_id` or `project_id` is required. */
    catalog_id?: string;
    /** The timestamp when the asset was created (in format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339).
     */
    create_time?: string;
    /** The IAM ID of the user that created the asset. */
    creator_id?: string;
    /** The description of the asset. */
    description?: string;
    /** URL that can be used to get the asset. */
    href?: string;
    /** name of the asset. */
    name?: string;
    /** origin of the asset. */
    origin_country?: string;
    /** The ID of the project which contains the asset. `catalog_id` or `project_id` is required. */
    project_id?: string;
    /** This is a unique string that uniquely identifies an asset. */
    resource_key?: string;
    /** size of the asset. */
    size?: number;
    /** Custom data to be associated with a given object. */
    source_system?: JsonObject;
    /** A list of tags that can be used to identify different types of data flow. */
    tags?: string[];
    /** Metadata usage information about an asset. */
    usage?: AssetSystemMetadataUsage;
  }

  /** Metadata usage information about an asset. */
  export interface AssetSystemMetadataUsage {
    /** Number of times this asset has been accessed. */
    access_count: number;
    /** The timestamp when the asset was last accessed (in format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339).
     */
    last_access_time: string;
    /** The IAM ID of the user that last accessed the asset. */
    last_accessor_id: string;
    /** The timestamp when the asset was last modified (in format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339).
     */
    last_modification_time: string;
    /** The IAM ID of the user that last modified the asset. */
    last_modifier_id: string;
  }

  /** A page from a collection of DataStage flows. */
  export interface DataFlowPagedCollection {
    /** A page from a collection of DataStage flows. */
    data_flows?: DataIntgFlow[];
    /** URI of a resource. */
    first?: HrefModel;
    /** URI of a resource. */
    last?: HrefModel;
    /** The number of data flows requested to be returned. */
    limit?: number;
    /** URI of a resource. */
    next?: HrefModel;
    /** URI of a resource. */
    prev?: HrefModel;
    /** The total number of DataStage flows available. */
    total_count?: number;
  }

  /** An import error object describe an import problem specific to a particular data flow. */
  export interface DataImportError {
    /** additional error text. */
    description?: string;
    /** error object name. */
    name: string;
    /** error stage type. */
    stage_type?: string;
    /** error type. */
    type: string;
  }

  /** A DataStage flow model that defines physical source(s), physical target(s) and an optional pipeline containing operations to apply to source(s). */
  export interface DataIntgFlow {
    /** Metadata information for datastage flow. */
    attachments?: JsonObject[];
    /** The underlying DataStage flow definition. */
    entity?: DataIntgFlowEntity;
    /** System metadata about an asset. */
    metadata?: AssetSystemMetadata;
  }

  /** The underlying DataStage flow definition. */
  export interface DataIntgFlowEntity {
    /** Asset type object. */
    data_intg_flow?: JsonObject;
    /** Asset type object. */
    data_intg_subflow?: JsonObject;
    /** The description of the DataStage flow. */
    description?: string;
    /** Lock information for a DataStage flow asset. */
    lock?: DataIntgFlowLock;
    /** The name of the DataStage flow. */
    name?: string;
    /** The rules of visibility for an asset. */
    rov?: AssetEntityROV;
    /** A read-only field that can be used to distinguish between different types of data flow based on the service
     *  that created it.
     */
    sub_type?: string;
  }

  /** A pipeline JSON containing operations to apply to source(s). */
  export interface DataIntgFlowJson {
    /** Pipeline flow to be stored. */
    attachments?: PipelineJson;
    /** The underlying DataStage flow definition. */
    entity?: DataIntgFlowEntity;
    /** System metadata about an asset. */
    metadata?: AssetSystemMetadata;
  }

  /** Lock information for a DataStage flow asset. */
  export interface DataIntgFlowLock {
    /** Entity information for a DataStage lock object. */
    entity?: DataIntgFlowLockEntity;
    /** Metadata information for a DataStage lock object. */
    metadata?: DataIntgFlowLockMetadata;
  }

  /** Entity information for a DataStage lock object. */
  export interface DataIntgFlowLockEntity {
    /** DataStage flow ID that is locked. */
    data_intg_flow_id?: string;
    /** Requester of the lock. */
    requester?: string;
  }

  /** Metadata information for a DataStage lock object. */
  export interface DataIntgFlowLockMetadata {
    /** Lock status. */
    alive?: boolean;
  }

  /** Describes the compile response model. */
  export interface FlowCompileResponse {
    /** Compile result for DataStage flow. */
    message?: JsonObject;
    /** Compile response type. For example ok or error. */
    type?: string;
  }

  /** URI of a resource. */
  export interface HrefModel {
    /** URI of a resource. */
    href: string;
  }

  /** Import statistics. total = imported (including renamed and replaced) + skipped + failed + deprecated + unsupported + pending. */
  export interface ImportCount {
    /** Total number of data connections. */
    connections_total?: number;
    /** Total number of deprecated resources in the import file. */
    deprecated: number;
    /** Total number of data flows that cannot be imported due to import errors. */
    failed: number;
    /** Total number of data flows successfully imported. */
    imported: number;
    /** Total number of parameter sets. */
    parameter_sets_total?: number;
    /** Total number of data flows that have not been processed. */
    pending: number;
    /** Total number of data flows successfully imported and renamed due to a name conflict. The renamed count is
     *  included in the imported count.
     */
    renamed: number;
    /** Total number of existing data flows replaced by imported flows. The replaced count is included in the
     *  imported count.
     */
    replaced: number;
    /** Total number of sequence jobs. */
    sequence_jobs_total?: number;
    /** Total number of data flows skipped due to name conflicts. The skipped count is not included in the failed
     *  count or imported count.
     */
    skipped: number;
    /** Total number of parallel job subflows. */
    subflows_total?: number;
    /** Total number of table definitions. */
    table_definitions_total?: number;
    /** Total number of data flows to be imported. */
    total: number;
    /** Total number of unsupported resources in the import file. */
    unsupported: number;
  }

  /** Import flow object. */
  export interface ImportFlow {
    /** conflict resolution status. */
    conflict_resolution_status?: string;
    /** The timestamp when the flow import is completed. In format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339.
     */
    end_time?: string;
    /** The errors array report all the problems preventing the data flow from being successfully imported. */
    errors?: DataImportError[];
    /** Unique id of the data flow. This field is returned only if the underlying data flow has been successfully
     *  imported.
     */
    id?: string;
    /** Unique id of the job. This field is returned only if the corresponding job object has been successfully
     *  created.
     */
    job_id?: string;
    /** Job name. This field is returned only if the corresponding job object has been successfully created. */
    job_name?: string;
    /** (deprecated) original type of the job or data flow in the import file. */
    job_type?: string;
    /** Name of the imported data flow. */
    name: string;
    /** Name of the data flow to be imported. */
    original_name?: string;
    /** The ID of an existing asset this object refers to. If ref_asset_id is specified, the id field will be the
     *  same as ref_asset_id for backward compatibility.
     */
    ref_asset_id?: string;
    /** data import status. */
    status: string;
    /** type of the job or data connection in the import file. */
    type?: string;
    /** The warnings array report all the warnings in the data flow import operation. */
    warnings?: ImportFlowWarning[];
  }

  /** An import warning object describe a warning message specific to a particular data flow. */
  export interface ImportFlowWarning {
    /** additional warning text. */
    description?: string;
    /** warning object name. */
    name: string;
    /** warning type. */
    type: string;
  }

  /** Import event notification. */
  export interface ImportNotification {
    /** The timestamp when the import notification was created. In format YYYY-MM-DDTHH:mm:ssZ or
     *  YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time format as specified by RFC 3339.
     */
    created_at: string;
    /** Notification id. */
    id: string;
    /** Import status associated with the notification. */
    status: string;
  }

  /** Response object of an import request. */
  export interface ImportResponse {
    /** Import the response entity. */
    entity: ImportResponseEntity;
    /** Import the response metadata. */
    metadata: ImportResponseMetadata;
  }

  /** Import the response entity. */
  export interface ImportResponseEntity {
    /** Account ID of the user who cancelled the import request. This field is required only when the status field
     *  is "cancelled".
     */
    cancelled_by?: string;
    /** The conflict_resolution option used for the import. */
    conflict_resolution?: string;
    /** The timestamp when the import opearton completed. In format YYYY-MM-DDTHH:mm:ssZ or
     *  YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time format as specified by RFC 3339.
     */
    end_time?: string;
    /** All data flows imported or to be imported. Each ImportFlow object contains status for the individual data
     *  flow import operation.
     */
    import_data_flows: ImportFlow[];
    /** Name of the import request. */
    name?: string;
    /** Import event notifications. */
    notifications?: ImportNotification[];
    /** The on_failure option used for the import. */
    on_failure?: string;
    /** Estimate of remaining time in seconds. */
    remaining_time?: number;
    /** The timestamp when the import opearton started. In format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339.
     */
    start_time?: string;
    /** import status. */
    status: string;
    /** Import statistics. total = imported (including renamed and replaced) + skipped + failed + deprecated +
     *  unsupported + pending.
     */
    tally?: ImportCount;
  }

  /** Import the response metadata. */
  export interface ImportResponseMetadata {
    /** Catalog id. */
    catalog_id?: string;
    /** The timestamp when the import API was submitted. In format YYYY-MM-DDTHH:mm:ssZ or YYYY-MM-DDTHH:mm:ss.sssZ,
     *  matching the date-time format as specified by RFC 3339.
     */
    created_at?: string;
    /** Account ID of the user who submitted the import request. */
    created_by?: string;
    /** The unique import id. */
    id: string;
    /** The timestamp when the import status was last updated. In format YYYY-MM-DDTHH:mm:ssZ or
     *  YYYY-MM-DDTHH:mm:ss.sssZ, matching the date-time format as specified by RFC 3339.
     */
    modified_at?: string;
    /** import file name. */
    name?: string;
    /** Project id. */
    project_id?: string;
    /** Project name. */
    project_name?: string;
    /** The URL which can be used to get the status of the import request right after it is submitted. */
    url: string;
  }

  /** Pipeline flow to be stored. */
  export interface PipelineJson {
    /** Object containing app-specific data. */
    app_data?: JsonObject;
    /** The document type. */
    doc_type?: string;
    /** Array of parameter set references. */
    external_paramsets?: JsonObject[];
    /** Document identifier, GUID recommended. */
    id?: string;
    /** Refers to the JSON schema used to validate documents of this type. */
    json_schema?: string;
    /** Parameters for the flow document. */
    parameters?: JsonObject;
    pipelines?: Pipelines[];
    /** Reference to the primary (main) pipeline flow within the document. */
    primary_pipeline?: string;
    /** Runtime information for pipeline flow. */
    runtimes?: JsonObject[];
    /** Array of data record schemas used in the pipeline. */
    schemas?: JsonObject[];
    /** Pipeline flow version. */
    version?: string;
  }

  /** Pipelines. */
  export interface Pipelines {
    /** Object containing app-specific data. */
    app_data?: JsonObject;
    /** A brief description of the DataStage flow. */
    description?: string;
    /** Unique identifier. */
    id?: string;
    /** Name of the pipeline. */
    name?: string;
    /** Array of pipeline nodes. */
    nodes?: JsonObject[];
    /** Reference to the runtime type. */
    runtime_ref?: string;
  }

}

export = DatastageV3;
