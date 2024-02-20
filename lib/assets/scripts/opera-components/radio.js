import BaseComponent from './base-component';

class Radio extends BaseComponent {
  /**
   * Constructs a new instance of the Radio class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.initialState = {
      checked: this.element.checked,
      disabled: this.element.disabled,
      hidden: this.element.hidden,
    };
  }

  reset() {
    this.element.checked = this.initialState.checked;
    this.element.disabled = this.initialState.disabled;
    this.element.hidden = this.initialState.hidden;
    this.element.dispatchEvent(new Event('change'));
  }
}

export default Radio;
