import Accordion from './accordion';
import Breadcrumb from './breadcrumb';
import Button from './button';
import Checkbox from './checkbox';
import ContentNavigation from './content-navigation';
import DatePicker from './date-picker';
import Chip from './chip';
import Dropdown from './dropdown';
import Fieldset from './fieldset';
import Form from './form';
import Modal from './modal';
import NumberInput from './number-input';
import OverflowMenu from './overflow-menu';
import Pagination from './pagination';
import PasswordInput from './password-input';
import Radio from './radio';
import Select from './select';
import Spinner from './spinner';
import Tabs from './tabs';
import Tag from './tag';
import TextArea from './text-area';
import TextField from './text-field';
import Toast from './toast';
import ToggleGroup from './toggle-group';
import ToggleSwitch from './toggle-switch';
import Tooltip from './tooltip';
import TreeNavigation from './tree-navigation';

export const componentMap = {
  accordion: Accordion,
  breadcrumb: Breadcrumb,
  button: Button,
  checkbox: Checkbox,
  'content-navigation': ContentNavigation,
  'date-picker': DatePicker,
  chip: Chip,
  dropdown: Dropdown,
  fieldset: Fieldset,
  form: Form,
  modal: Modal,
  'number-input': NumberInput,
  'overflow-menu': OverflowMenu,
  pagination: Pagination,
  'password-input': PasswordInput,
  radio: Radio,
  select: Select,
  spinner: Spinner,
  tabs: Tabs,
  tag: Tag,
  'text-area': TextArea,
  'text-field': TextField,
  toast: Toast,
  'toggle-group': ToggleGroup,
  'toggle-switch': ToggleSwitch,
  tooltip: Tooltip,
  'tree-navigation': TreeNavigation,
};

/**
 * Generates an array of instances of the given component based on a list of HTML elements.
 *
 * @param {NodeList} nodeList - The list of HTML elements to process.
 * @param {String} component - The name of the component  used to create instances.
 * @return {Array}  An array of instances of the component.
 */
export function makeInstances(nodeList, component) {
  const nodes = Array.from(nodeList).filter(function (element) {
    return element instanceof HTMLElement;
  });
  let instances = [];

  nodes.forEach((node) => {
    if (!node) return;
    try {
      node._instance = uiInstance(node, component);
      instances.push(node._instance);
    } catch (error) {
      console.log(error);
    }
  });

  return instances.length === 1 ? instances[0] : instances;
}

// Return an Object according to name of component
export function uiInstance(node, component) {
  const componentName = component.toLowerCase();
  if (componentMap.hasOwnProperty(componentName)) {
    return new componentMap[componentName](node);
  } else {
    throw new Error('Invalid component');
  }
}
