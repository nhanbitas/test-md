import BaseComponent from './base-component';

class Chip extends BaseComponent {
  /**
   * Constructs a new instance of the Chip class.
   * @constructor
   * @param {Element} element - The Chip element to be passed to the constructor.
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.colors = ['orange', 'sky', 'violet', 'green', 'red', 'yellow', 'blue'];
    this.selectedColor = this.#_setChipSelectedColor();
    this.chipClickHandler = this.#_handleChipClick.bind(this);
    this.#_init();
  }

  #_init() {
    this.element.addEventListener('click', this.chipClickHandler);
  }

  #_handleChipClick() {
    this.element.classList.toggle(this.selectedColor);
    this.element.classList.toggle('selected');
  }

  #_setChipSelectedColor() {
    let selectedColor = 'orange';
    if (this.colors.includes(this.element.getAttribute('data-chip')))
      selectedColor = this.element.getAttribute('data-chip');
    return selectedColor;
  }
}

export default Chip;
