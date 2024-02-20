import BaseComponent from './base-component';

class Tag extends BaseComponent {
  /**
   * Constructs a new instance of the Tag class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.removeButton = this.#_createRemoveButton();
    this.colors = ['orange', 'sky', 'violet', 'green', 'red', 'yellow', 'blue'];
    this.#_init();
  }

  #_init() {
    this.#_setConfigOptions();
  }

  #_setConfigOptions() {
    const string = this.element.getAttribute('data-tag');
    const array = string.split(' ');
    array.forEach((value) => {
      if (value === 'removable') {
        this.element.appendChild(this.removeButton);
      } else if (this.colors.includes(value)) {
        this.element.classList.add(value);
      }
    });
  }

  #_createRemoveButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.innerHTML = '<i class="far fa-x-close"></i>';
    return button;
  }
}

export default Tag;
