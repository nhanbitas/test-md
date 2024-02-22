import BaseComponent from './base-component';

class Button extends BaseComponent {
  /**
   * Constructs a new instance of the button class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
  }

  /**
   * Updates the innerHTML of the element with the provided text.
   *
   * @param {string} text - The text to update the innerHTML with.
   */
  update(text) {
    this.element.innerHTML = text;
  }
}

export default Button;
