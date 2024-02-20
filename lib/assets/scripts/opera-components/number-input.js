import BaseComponent from './base-component';
import ContainedLabel from './contained-label';

class NumberInput extends BaseComponent {
  /**
   * Constructor for a new NumberInput object
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */

  constructor(element) {
    super(element);
    this.element = element;
    this.hasUnits = this.element.hasAttribute('data-unit');
    this.hasClearButton = this.element.getAttribute('data-number-input') === 'clearable';
    this.clearButton = this.#_createClearButton();
    this.units = this.#_setUnits();
    this.isSelectable = this.units?.length > 1;
    this.numberInputUnit = this.#_createNumberInputUnit();
    this.numberInputUnitSelect = this.numberInputUnit?.querySelector('select');
    this.numberInputWrapper = this.#_createNumberInputWrapper();
    this.containedLabel = null;
    this.containedLabelText = this.element.getAttribute('data-label');
    this.numberInputHandler = this.#_handleNumberInput.bind(this);
    this.unitSelectHandler = this.#_handleUnitSelect.bind(this);
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
    this.#_setUnitSelectWidth();
    if (this.containedLabelText) {
      this.containedLabel = new ContainedLabel(this.element, this.containedLabelText, this.numberInputWrapper);
    }
    if (this.hasClearButton) {
      if (this.hasUnits) {
        this.numberInputWrapper.insertBefore(this.clearButton, this.numberInputWrapper.lastChild);
      } else {
        this.numberInputWrapper.appendChild(this.clearButton);
      }
      this.element.addEventListener('input', this.passwordInputHandler);
      this.clearButton.addEventListener('click', this.clearButtonClickHandler);
    }
    if (this.initialState.hidden) {
      this.hide();
    } else {
      this.show();
    }
    this.element.addEventListener('input', this.numberInputHandler);
    this.element.addEventListener('focusout', this.focusOutHandler);
    this.numberInputUnitSelect?.addEventListener('change', this.unitSelectHandler);
  }

  hide() {
    this.numberInputWrapper.setAttribute('hidden', '');
    this.element.setAttribute('hidden', '');
    this.#_checkIfParentOnlyHasHiddenChildren();
  }

  show() {
    this.numberInputWrapper.removeAttribute('hidden');
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
    const parent = this.numberInputWrapper.parentElement;
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

  #_createNumberInputWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('number-input-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    if (this.hasUnits) {
      wrapper.appendChild(this.numberInputUnit);
    }
    return wrapper;
  }

  #_createNumberInputUnit() {
    const unitBox = document.createElement('div');
    unitBox.classList.add('number-input-unit');
    const unitSelect = document.createElement('select');
    if (this.isSelectable) {
      unitBox.classList.add('selectable');
    } else {
      unitSelect.tabIndex = -1;
    }
    this.units?.forEach((unit) => {
      unitSelect.add(new Option(unit, unit));
    });
    unitBox.appendChild(unitSelect);

    return unitBox;
  }

  #_createClearButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.setAttribute('type', 'button');
    button.classList.add('number-input-clear-button', 'hidden');
    icon.classList.add('far', 'fa-x');
    button.appendChild(icon);

    return button;
  }

  #_handleNumberInput() {
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

  #_handleFocusOut(event) {
    if (event.relatedTarget === this.numberInputUnitSelect) {
      return;
    }
    if (this.element.value.length === 0) {
      this.setValue('');
    }
    this.containedLabel?.handleEvent();
  }

  #_setUnits() {
    return this.element.getAttribute('data-unit')?.split('|');
  }

  getSelectedUnit() {
    return this.numberInputUnitSelect.options[this.numberInputUnitSelect.selectedIndex].value;
  }

  #_handleUnitSelect() {
    this.#_setUnitSelectWidth();
  }

  #_setUnitSelectWidth() {
    if (!this.hasUnits) return;

    const selectedOption = this.numberInputUnitSelect.options[this.numberInputUnitSelect.selectedIndex];

    const tempSpan = document.createElement('span');
    tempSpan.classList.add('w-fit', 'text-body-compact-02', 'fixed', 'top-0');
    tempSpan.textContent = selectedOption.textContent;

    document.body.appendChild(tempSpan);

    const spanWidth = tempSpan.offsetWidth;
    const paddingRightOffset = this.isSelectable ? 40 : 24;
    const clearButtonOffset = this.isSelectable ? 28 : 12;

    this.numberInputUnitSelect.style.width = this.isSelectable
      ? tempSpan.offsetWidth + 28 + 'px'
      : tempSpan.offsetWidth + 'px';

    if (this.hasClearButton) {
      this.clearButton.style.right = spanWidth + clearButtonOffset + 'px';
      this.element.style.paddingRight = spanWidth + clearButtonOffset + 40 + 'px';
    } else {
      this.element.style.paddingRight = spanWidth + paddingRightOffset + 'px';
    }

    tempSpan.remove();
  }
}

export default NumberInput;
