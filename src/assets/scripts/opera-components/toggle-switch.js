import BaseComponent from './base-component';

class ToggleSwitch extends BaseComponent {
  /**
   * Constructs a new instance of the ToggleSwitch class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.toggleSpan = this.#_createToggleSpan();
    this.clickHandler = this.#_handleClick.bind(this);
    this.#_init();
  }

  #_init() {
    this.element.appendChild(this.toggleSpan);
    this.element.addEventListener('click', this.clickHandler);
  }

  #_createToggleSpan() {
    const span = document.createElement('span');
    return span;
  }

  #_handleClick() {
    const isChecked = this.element.getAttribute('aria-checked') === 'true';

    if (isChecked) {
      this.element.setAttribute('aria-checked', 'false');
      this.element.classList.remove('on');
    } else {
      this.element.setAttribute('aria-checked', 'true');
      this.element.classList.add('on');
    }
  }
}

export default ToggleSwitch;
