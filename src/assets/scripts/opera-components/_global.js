import { makeInstances, componentMap } from './_instance';
import { createToast } from './toast';
import { createTooltip } from './tooltip';

// Define the Opera object in the window global scope.
// Can pass quick methods, constructors, etc to the window.
// For example, Opera.makeInstances(...)

window.Opera = {
  makeInstances,
  ...componentMap,
  createToast,
  createTooltip,
};
