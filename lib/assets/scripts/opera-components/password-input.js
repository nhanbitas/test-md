import BaseComponent from './base-component';
import ContainedLabel from './contained-label';

class PasswordInput extends BaseComponent {
  /**
   * Constructor for a new PasswordInput object
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */

  constructor(element) {
    super(element);
    this.element = element;
    this.hasClearButton = this.element.getAttribute('data-password-input') === 'clearable';
    this.clearButton = this.#_createClearButton();
    this.passwordInputEyeButtonClickHandler = this.#_handleEyeButtonClick.bind(this);
    this.passwordInputEyeButton = this.#_createEyeButton();
    this.passwordInputWrapper = this.#_createPasswordInputWrapper();
    this.containedLabel = null;
    this.containedLabelText = this.element.getAttribute('data-label');
    this.passwordInputHandler = this.#_handlePasswordInput.bind(this);
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
      this.containedLabel = new ContainedLabel(this.element, this.containedLabelText, this.passwordInputWrapper);
    }
    if (this.hasClearButton) {
      this.passwordInputWrapper.insertBefore(this.clearButton, this.passwordInputWrapper.lastChild);
      this.element.addEventListener('input', this.passwordInputHandler);
      this.clearButton.addEventListener('click', this.clearButtonClickHandler);
    }

    if (this.initialState.hidden) {
      this.hide();
    } else {
      this.show();
    }
    this.element.addEventListener('focusout', this.focusOutHandler);
  }

  hide() {
    this.passwordInputWrapper.setAttribute('hidden', '');
    this.element.setAttribute('hidden', '');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  show() {
    this.passwordInputWrapper.removeAttribute('hidden');
    this.element.removeAttribute('hidden');
    this.#_checkIfParentOnlyHasHiddenChildren();
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
    const parent = this.passwordInputWrapper.parentElement;
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

  setValue(value) {
    this.element.value = value;
    this.containedLabel?.handleEvent();
  }

  #_createPasswordInputWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('password-input-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    wrapper.appendChild(this.passwordInputEyeButton);
    return wrapper;
  }

  #_createEyeButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.setAttribute('type', 'button');
    button.classList.add('password-input-eye-button', 'password');
    icon.classList.add('far', 'fa-eye');
    button.appendChild(icon);
    button.addEventListener('click', this.passwordInputEyeButtonClickHandler);

    return button;
  }

  #_createClearButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.setAttribute('type', 'button');
    button.classList.add('password-input-clear-button', 'hidden');
    icon.classList.add('far', 'fa-x');
    button.appendChild(icon);

    return button;
  }

  #_handlePasswordInput() {
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

  #_handleEyeButtonClick() {
    if (this.element.getAttribute('type') === 'password') {
      this.element.setAttribute('type', 'text');
      this.passwordInputEyeButton.classList.remove('password');
      this.passwordInputEyeButton.classList.add('plaintext');
    } else if (this.element.getAttribute('type') === 'text') {
      this.element.setAttribute('type', 'password');
      this.passwordInputEyeButton.classList.remove('plaintext');
      this.passwordInputEyeButton.classList.add('password');
    }
  }

  #_handleFocusOut(event) {
    if (event.relatedTarget === this.passwordInputEyeButton) {
      return;
    }
    this.containedLabel?.handleEvent();
  }
}

export default PasswordInput;
