import convertDataToObject from '../utils/convertDataToObject';
import BaseComponent from './base-component';

class Modal extends BaseComponent {
  /**
   * Constructs a new instance of the Modal class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.dataModal = convertDataToObject(this.element.getAttribute('data-modal'));
    this.modal = document.querySelector(`#${this.dataModal.target}`);
    this.#_init();
  }

  /**
   * Initialize the component
   */
  #_init() {
    if (!this.modal) {
      return;
    }
    document.body.appendChild(this.modal);

    // Add show and hide event for buttons
    this.element.addEventListener('click', () => this.show());

    // Use event delegation for close buttons
    const closeBtns = this.modal.querySelectorAll('.hide-modal-btn');
    Array.from(closeBtns).forEach((btn) => {
      btn.addEventListener('click', () => this.hide());
    });

    // Add show and hide event to the overlay
    this.modal.addEventListener('click', (e) => {
      const dialog = this.modal.querySelector('.modal-dialog');
      const isStatic = this.modal.classList.contains('modal-static');
      if (isStatic) {
        !dialog.contains(e.target) && dialog.classList.add('modal-static-animation');
        setTimeout(() => {
          dialog.classList.remove('modal-static-animation');
        }, 250);
      } else {
        !dialog.contains(e.target) && this.hide();
      }
    });
  }

  /**
   * Show the modal
   */
  show() {
    this.modal.style.display = 'block';
    setTimeout(() => {
      this.modal.classList.add('active');
    }, 100);
  }

  /**
   * Hide the modal.
   */
  hide() {
    this.modal.classList.remove('active');
    setTimeout(() => {
      this.modal.style.display = 'none';
    }, 100);
  }
}

export default Modal;
