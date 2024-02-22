import BaseComponent from './base-component';
import ContainedLabel from './contained-label';

class Select extends BaseComponent {
  /**
   * Constructs a new instance of the Select class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.selectWrapper = this.#_createSelectWrapper();
    this.containedLabel = null;
    this.containedLabelText = this.element.getAttribute('data-label');
    this.addActiveClassHandler = this.#_addActiveClass.bind(this);
    this.removeActiveClassHandler = this.#_removeActiveClass.bind(this);
    this.selectChangeHandler = this.#_handleSelectChange.bind(this);
    this.initialState = {
      value: this.element.value,
      disabled: this.element.disabled,
      hidden: this.element.hidden,
    };

    this.#_init();
  }

  reset() {
    this.element.value = this.initialState.value;
    this.#_updateValue();
    this.element.disabled = this.initialState.disabled;
    this.element.readonly = this.initialState.readonly;
    if (this.initialState.hidden) {
      this.hide();
    } else {
      this.show();
    }
  }

  #_checkIfParentOnlyHasHiddenChildren() {
    const parent = this.selectWrapper.parentElement;
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
    this.selectWrapper.setAttribute('hidden', '');
    this.element.setAttribute('hidden', '');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  show() {
    this.selectWrapper.removeAttribute('hidden');
    this.element.removeAttribute('hidden');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  #_init() {
    if (this.containedLabelText) {
      this.containedLabel = new ContainedLabel(this.element, this.containedLabelText, this.selectWrapper);
    }
    this.#_updateValue();
    this.element.addEventListener('focusin', this.addActiveClassHandler);
    this.element.addEventListener('focusout', this.removeActiveClassHandler);
    this.element.addEventListener('change', this.selectChangeHandler);
    if (this.element.getAttribute('hidden') !== null) {
      this.hide();
    } else {
      this.show();
    }
  }

  #_createSelectWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('select-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    return wrapper;
  }

  #_addActiveClass() {
    this.selectWrapper.classList.add('active');
    this.containedLabel?.activate();
    this.element.addEventListener('mousedown', this.removeActiveClassHandler);
  }

  #_removeActiveClass() {
    this.selectWrapper.classList.remove('active');
    this.containedLabel?.handleEvent();
    this.element.removeEventListener('mousedown', this.removeActiveClassHandler);
  }

  #_handleSelectChange() {
    this.selectWrapper.classList.remove('active');
    this.#_updateValue();
  }

  #_updateValue() {
    if (this.element.value.length === 0) {
      this.selectWrapper.classList.remove('selected');
      if (this.containedLabel) {
        this.element.classList.add('text-transparent');
      }
    } else {
      this.selectWrapper.classList.add('selected');
      if (this.containedLabel) {
        this.element.classList.remove('text-transparent');
      }
    }

    this.containedLabel?.handleEvent();
  }
}

export default Select;
