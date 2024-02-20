import BaseComponent from './base-component';

class Checkbox extends BaseComponent {
  /**
   * Constructs a new instance of the Checkbox class.
   * @constructor
   * @param {Element} element - The Checkbox element to be passed to the constructor.
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.changeHandler = this.#_handleChange.bind(this);
    this.initialState = {
      checked: this.element.checked,
      indeterminate: this.element.indeterminate,
      disabled: this.element.disabled,
      hidden: this.element.hidden,
    };
    this.#_init();
  }

  /**
   * Resets the state of the element to its initial values.
   */
  reset() {
    this.element.checked = this.initialState.checked;
    this.element.indeterminate = this.initialState.indeterminate;
    this.element.disabled = this.initialState.disabled;
    this.element.hidden = this.initialState.hidden;
    this.element.dispatchEvent(new Event('change'));
    this.#_handleChange();
  }

  /**
   * Create a initial event with callback function is change handler
   */
  #_init() {
    this.element.addEventListener('change', this.changeHandler);
  }

  /**
   * Handles the change event of the element. Including update state of child checkboxes and parent checkboxes
   */
  #_handleChange() {
    this.#_updateChildCheckboxes(this.element);
    this.#_updateParentCheckboxes(this.element);
  }

  #_updateChildCheckboxes(checkbox) {
    const checkboxName = checkbox.getAttribute('name');
    const childCheckboxes = document.querySelectorAll(
      `input[data-checkbox="parent:${checkboxName}"]`
    );

    if (checkbox.checked) {
      // Select all child groupCheckboxes
      childCheckboxes.forEach((childCheckbox) => {
        childCheckbox.checked = true;
        childCheckbox.indeterminate = false;
        // Recursively update children of current child checkbox
        this.#_updateChildCheckboxes(childCheckbox);
      });
    } else {
      // Unselect all child groupCheckboxes
      childCheckboxes.forEach((childCheckbox) => {
        childCheckbox.checked = false;
        childCheckbox.indeterminate = false;
        // Recursively update children of current child checkbox
        this.#_updateChildCheckboxes(childCheckbox);
      });
    }
  }

  #_updateParentCheckboxes(checkbox) {
    let parentCheckboxName;
    if (checkbox.getAttribute('data-checkbox').startsWith('parent:')) {
      parentCheckboxName = checkbox.getAttribute('data-checkbox').substring(7);
    }
    const parentCheckbox = document.querySelector(
      `input[data-checkbox][name="${parentCheckboxName}"]`
    );

    // Check if there is a parent checkbox
    if (parentCheckbox) {
      const siblingCheckboxes = document.querySelectorAll(
        `input[data-checkbox="parent:${parentCheckboxName}"]`
      );

      let allSiblingsChecked = true;
      let anySiblingsChecked = false;
      let anySiblingsIndeterminate = false;

      siblingCheckboxes.forEach((siblingCheckbox) => {
        if (siblingCheckbox.checked) {
          anySiblingsChecked = true;
        } else if (siblingCheckbox.indeterminate) {
          anySiblingsIndeterminate = true;
          allSiblingsChecked = false;
        } else {
          allSiblingsChecked = false;
        }
      });

      parentCheckbox.checked = allSiblingsChecked;
      parentCheckbox.indeterminate =
        !allSiblingsChecked && (anySiblingsChecked || anySiblingsIndeterminate);

      // Update the parent of parentCheckbox recursively
      this.#_updateParentCheckboxes(parentCheckbox);
    }
  }
}

export default Checkbox;
