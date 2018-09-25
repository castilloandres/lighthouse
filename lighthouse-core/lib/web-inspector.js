/**
 * @license Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
// @ts-nocheck
'use strict';

/**
 * Stubbery to allow portions of the DevTools frontend to be used in lighthouse. `SDK`
 * technically lives on the global object but should be accessed through a normal `require` call.
 */
const vm = require('vm');
const fs = require('fs');
const buildWebInspector = require('./build-web-inspector');
const context = vm.createContext({module: {}});
context.global = context;
context.require = moduleId => {
  const moduleContent = fs.readFileSync(require.resolve(moduleId));
  vm.runInContext(moduleContent, context);
};
const webInspector = vm.runInContext(`(${buildWebInspector.toString()})()`, context);

module.exports = webInspector;
