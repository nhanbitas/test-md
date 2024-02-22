import BaseComponent from './base-component';

class Fieldset extends BaseComponent {
  /**
   * Constructs a new instance of the Fieldset class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.initialState = {
      disabled: this.element.disabled,
      hidden: this.element.hidden,
    };
  }

  reset() {
    this.element.disabled = this.initialState.disabled;
    this.element.hidden = this.initialState.hidden;
  }
}

export default Fieldset;
