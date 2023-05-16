"use strict";
// ***********************************************************
// This example support/component.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************
Object.defineProperty(exports, "__esModule", { value: true });
// Import commands.js using ES2015 syntax:
require("./commands");
// Alternatively you can use CommonJS syntax:
// require('./commands')
const react18_1 = require("cypress/react18");
Cypress.Commands.add('mount', react18_1.mount);
// Example use:
// cy.mount(<MyComponent />)
