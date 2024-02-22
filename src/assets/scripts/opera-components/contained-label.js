import Spinner from './spinner';

export default class ContainedLabel {
  /**
   * Constructs a new instance of the ContainedLabel class.
   * @constructor
   * @param {element} element - the element to be assigned
   * @param {text} text - the text to be assigned
   * @param {wrapper} wrapper - the wrapper to be assigned
   */
  constructor(element, text, wrapper) {
    this.element = element;
    this.required = element.required;
    this.text = text;
    this.label = this.#_createLabel();
    this.spinner = null;
    this.wrapper = wrapper;
    this.focusHandler = this.#_handleFocus.bind(this);
    this.#_init();
  }

  #_init() {
    this.#wrapLabelAndElement();
    this.spinner = new Spinner(this.label);

    if (this.element.value.length > 0) {
      this.label.classList.add('active');
    }
    this.element.addEventListener('focus', this.focusHandler);
  }

  #_createLabel() {
    const label = document.createElement('span');
    label.classList.add('contained-label');
    if (this.required) {
      label.classList.add('required');
    }
    label.textContent = this.text;
    return label;
  }

  #wrapLabelAndElement() {
    this.wrapper.prepend(this.label);
  }

  #_handleFocus() {
    this.label.classList.add('active');
  }

  handleEvent() {
    if (this.element.value.length !== 0) {
      this.label.classList.add('active');
    } else {
      this.label.classList.remove('active');
    }
  }

  activate() {
    this.label.classList.add('active');
  }
}
