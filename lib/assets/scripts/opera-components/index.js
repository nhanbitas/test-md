import './_global.js';
import { makeInstances } from './_instance';

// Define the components to be made instances with their type and selector
const components = [
  { type: 'accordion', selector: '[data-accordion]' },
  { type: 'breadcrumb', selector: '.breadcrumb' },
  { type: 'button', selector: 'button' },
  { type: 'checkbox', selector: '[data-checkbox]' },
  { type: 'chip', selector: '[data-chip]' },
  { type: 'content-navigation', selector: '[data-content-navigation]' },
  { type: 'date-picker', selector: 'input.date-picker' },
  { type: 'dropdown', selector: '[data-dropdown]' },
  { type: 'form', selector: 'form' },
  { type: 'modal', selector: '[data-modal]' },
  { type: 'number-input', selector: '[data-number-input]' },
  { type: 'overflow-menu', selector: '.overflow-menu' },
  { type: 'pagination', selector: '.pagination' },
  { type: 'password-input', selector: '[data-password-input]' },
  { type: 'radio', selector: '[data-radio]' },
  { type: 'fieldset', selector: 'fieldset' },
  { type: 'select', selector: 'select' },
  { type: 'spinner', selector: '[data-spinner]' },
  { type: 'tabs', selector: '[data-tabs]' },
  { type: 'tag', selector: '[data-tag]' },
  { type: 'text-area', selector: 'textarea.text-area' },
  { type: 'text-field', selector: '[data-text-field]' },
  { type: 'toast', selector: '.toast' },
  { type: 'toggle-group', selector: '.toggle-group' },
  { type: 'toggle-switch', selector: '.toggle-switch' },
  { type: 'tooltip', selector: '.tooltip' },
  { type: 'tree-navigation', selector: '[data-tree-navigation]' },
];

// Make instances for all components when the DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Assign makeInstances function to document
  document.makeInstances = makeInstances;

  // Initialize an empty list to store the components and their node lists
  let listOfComponents = [];

  // Loop through the components and retrieve their node lists
  components.forEach(({ type, selector }) => {
    const nodeList = document.querySelectorAll(selector);
    // Add the component, node list, type, and selector to the list of components
    listOfComponents = listOfComponents.concat({ nodeList, type, selector });
  });

  // Loop through the list of components and make instances for each component
  listOfComponents.forEach(({ nodeList, type }) => {
    if (nodeList) {
      makeInstances(nodeList, type);
    }
  });
});
