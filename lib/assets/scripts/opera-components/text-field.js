import BaseComponent from './base-component';
import ContainedLabel from './contained-label';

class TextField extends BaseComponent {
  /**
   * Constructs a new instance of the TextField class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.textFieldWrapper = this.#_createTextFieldWrapper();
    this.hasClearButton = this.element.getAttribute('data-text-field') === 'clearable';
    this.containedLabel = null;
    this.containedLabelText = this.element.getAttribute('data-label');
    this.clearButton = this.#_createClearButton();
    this.textFieldInputHandler = this.#_handleTextFieldInput.bind(this);
    this.clearButtonClickHandler = this.#_handleClearButtonClick.bind(this);
    this.focusOutHandler = this.#_handleFocusOut.bind(this);
    this.initialState = {
      value: this.element.value,
      disabled: this.element.disabled,
      hidden: this.element.hidden,
      readonly: this.element.readonly,
    };

    this.#_init();
  }

  #_init() {
    if (this.containedLabelText) {
      this.containedLabel = new ContainedLabel(this.element, this.containedLabelText, this.textFieldWrapper);
    }
    if (this.hasClearButton) {
      this.textFieldWrapper.appendChild(this.clearButton);
      this.element.addEventListener('input', this.textFieldInputHandler);
      this.clearButton.addEventListener('click', this.clearButtonClickHandler);
    }
    if (this.initialState.hidden) {
      this.hide();
    } else {
      this.show();
    }
    this.element.addEventListener('focusout', this.focusOutHandler);
  }

  reset() {
    this.setValue(this.initialState.value);
    this.element.disabled = this.initialState.disabled;
    this.element.readonly = this.initialState.readonly;
    if (this.initialState.hidden) {
      this.hide();
    } else {
      this.show();
    }
  }

  #_checkIfParentOnlyHasHiddenChildren() {
    const parent = this.textFieldWrapper.parentElement;
    const children = parent.children;
    let allChildrenHidden = true;
    for (let i = 0; i < children.length; i++) {
      if (children[i].hidden === false) {
        allChildrenHidden = false;
      }
    }
    if (allChildrenHidden) {
      parent.classList.add('hidden');
    } else {
      parent.classList.remove('hidden');
    }
  }

  hide() {
    this.textFieldWrapper.setAttribute('hidden', '');
    this.element.setAttribute('hidden', '');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  show() {
    this.textFieldWrapper.removeAttribute('hidden');
    this.element.removeAttribute('hidden');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  setValue(value) {
    this.element.value = value;
    this.containedLabel?.handleEvent();
  }

  #_createTextFieldWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('text-field-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    return wrapper;
  }

  #_createClearButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.setAttribute('type', 'button');
    button.classList.add('text-field-clear-button', 'hidden');
    icon.classList.add('far', 'fa-x');
    button.appendChild(icon);

    return button;
  }

  #_handleTextFieldInput() {
    if (this.element.value.length > 0) {
      this.clearButton.classList.remove('hidden');
    } else {
      this.clearButton.classList.add('hidden');
    }
  }

  #_handleClearButtonClick() {
    this.element.value = '';
    this.clearButton.classList.add('hidden');
    this.containedLabel?.handleEvent();
  }

  #_handleFocusOut() {
    this.containedLabel?.handleEvent();
  }
}

export default TextField;
