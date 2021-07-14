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

 const { readExternalSources } = require('ibm-cloud-sdk-core');
 const fs = require('fs');
 const DatastageV3 = require('../../dist/datastage/v3');
 const authHelper = require('../resources/auth-helper.js');
 
 // testcase timeout value (200s).
 const timeout = 200000;
 
 // Location of our config file.
 const configFile = 'datastage_v3.env';
 
 const describe = authHelper.prepareTests(configFile);
 
 let assetID;
 
 let subflow_assetID;
 
 let cloneID;
 
 let subflowCloneID;
 
 let importID;
 
 const dataIntgFlowName = 'nodesdkTestFlow';
 
 const dataIntgSubFlowName = 'nodesdkTestSubFlow';
 
 describe('DatastageV3_integration', () => {
   const datastageService = DatastageV3.newInstance({});
 
   expect(datastageService).not.toBeNull();
 
   const config = readExternalSources(DatastageV3.DEFAULT_SERVICE_NAME);
   expect(config).not.toBeNull();
 
   const projectID = config.projectId;
 
   jest.setTimeout(timeout);
 
   test('listDatastageFlows()', async () => {
     // begin-list_datastage_flows
     const params = {
       projectId: projectID,
       sort: 'name',
       limit: 100,
     };
 
     const res = await datastageService.listDatastageFlows(params);
     // end-list_datastage_flows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('createDatastageFlows()', async () => {
     // Request models needed by this operation.
     // begin-create_datastage_flows
     const pipelineJsonFromFile = JSON.parse(fs.readFileSync('testInput/rowgen_peek.json', 'utf-8'));
     const params = {
       dataIntgFlowName,
       pipelineFlows: pipelineJsonFromFile,
       projectId: projectID,
       assetCategory: 'system',
     };
 
     const res = await datastageService.createDatastageFlows(params);
     // end-create_datastage_flows
     assetID = res.result.metadata.asset_id;
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('getDatastageFlows()', async () => {
     // begin-get_datastage_flows
     const params = {
       dataIntgFlowId: assetID,
       projectId: projectID,
     };
 
     const res = await datastageService.getDatastageFlows(params);
     // end-get_datastage_flows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('updateDatastageFlows()', async () => {
     // Request models needed by this operation.
     const pipelineJsonFromFile = JSON.parse(
       fs.readFileSync('testInput/rowgen_peek_update.json', 'utf-8')
     );
     // begin-update_datastage_flows
     const params = {
       dataIntgFlowId: assetID,
       dataIntgFlowName,
       pipelineFlows: pipelineJsonFromFile,
       projectId: projectID,
       assetCategory: 'system',
     };
 
     const res = await datastageService.updateDatastageFlows(params);
     // end-update_datastage_flows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
 
   test('cloneDatastageFlows()', async () => {
    // begin-clone_datastage_flows
     const params = {
       dataIntgFlowId: assetID,
       projectId: projectID,
     };
 
     const res = await datastageService.cloneDatastageFlows(params);
    // end-clone_datastage_flows
     cloneID = res.result.metadata.asset_id;
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('compileDatastageFlows()', async () => {
    // begin-compile_datastage_flows
     const params = {
       dataIntgFlowId: assetID,
       projectId: projectID,
     };
 
     const res = await datastageService.compileDatastageFlows(params);
     // end-compile_datastage_flows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('listDatastageSubflows()', async () => {
    // begin-list_datastage_subflows
     const params = {
       projectId: projectID,
       sort: 'name',
       limit: 100,
     };
 
     const res = await datastageService.listDatastageSubflows(params);
    // end-list_datastage_subflows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('createDatastageSubflows()', async () => {
     // Request models needed by this operation.
     const pipelineJsonFromFile = JSON.parse(
       fs.readFileSync('testInput/subflow_sort.json', 'utf-8')
     );
    // begin-create_datastage_subflows
     const params = {
       dataIntgSubflowName: dataIntgSubFlowName,
       pipelineFlows: pipelineJsonFromFile,
       projectId: projectID,
       assetCategory: 'system',
     };
 
     const res = await datastageService.createDatastageSubflows(params);
     // end-create_datastage_subflows
     subflow_assetID = res.result.metadata.asset_id;
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('getDatastageSubflows()', async () => {
    // begin-get_datastage_subflows
     const params = {
       dataIntgSubflowId: subflow_assetID,
       projectId: projectID,
     };
 
     const res = await datastageService.getDatastageSubflows(params);
    // end-get_datastage_subflows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('updateDatastageSubFlows()', async () => {
     // Request models needed by this operation.
     const pipelineJsonFromFile = JSON.parse(
       fs.readFileSync('testInput/subflow_sort_update.json', 'utf-8')
     );
     // begin-update_datastage_subflows
     const params = {
       dataIntgSubflowId: subflow_assetID,
       dataIntgSubflowName: dataIntgSubFlowName,
       pipelineFlows: pipelineJsonFromFile,
       projectId: projectID,
       assetCategory: 'system',
     };
 
     const res = await datastageService.updateDatastageSubflows(params);
     // end-update_datastage_subflows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('cloneDatastageSubflows()', async () => {
    // begin-clone_datastage_subflows
     const params = {
       dataIntgSubflowId: subflow_assetID,
       projectId: projectID,
     };
 
     const res = await datastageService.cloneDatastageSubflows(params);
     // end-clone_datastage_subflows
     subflowCloneID = res.result.metadata.asset_id;
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('createMigration()', async () => {
    // begin-create_migration
     const params = {
       body: Buffer.from(fs.readFileSync('testInput/rowgen_peek.isx')),
       projectId: projectID,
       onFailure: 'continue',
       conflictResolution: 'rename',
       attachmentType: 'isx',
       fileName: 'rowgen_peek.isx',
     };
     const res = await datastageService.createMigration(params);
    // end-create_migration
     importID = res.result.metadata.id;
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('getMigration()', async () => {
    // begin-get_migration
     const params = {
       importId: importID,
       projectId: projectID,
     };
 
     const res = await datastageService.getMigration(params);
    // end-get_migration
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('deleteMigration()', async () => {
    // begin-delete_migration
     const params = {
       importId: importID,
       projectId: projectID,
     };
 
     const res = await datastageService.deleteMigration(params);
    // end-delete_migration
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('deleteDatastageFlows()', async () => {
    // begin-delete_datastage_subflows
     const params = {
       id: [assetID, cloneID],
       projectId: projectID,
       force: true,
     };
 
     const res = await datastageService.deleteDatastageFlows(params);
    // end-delete_datastage_subflows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
   test('deleteDatastageSubflows()', async () => {
    // begin-delete_datastage_flows
     const params = {
       id: [subflow_assetID, subflowCloneID],
       projectId: projectID,
     };
 
     const res = await datastageService.deleteDatastageSubflows(params);
    // end-delete_datastage_flows
     expect(res).toBeDefined();
     expect(res.result).toBeDefined();
   });
 });
 