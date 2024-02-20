import convertDataToObject from '../utils/convertDataToObject';
import BaseComponent from './base-component';

class Toast extends BaseComponent {
  /**
   * Constructs a new instance of the Modal class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.container = document.querySelector('.toast-container.top-right');
    this.bottomCenterContainer = document.querySelector('.toast-container.bottom-center');
    this.closeButton = this.element.querySelector('.toast-close');
    this.dataToast = convertDataToObject(this.element.getAttribute('data-toast'));
    this.dataRemove = this.dataToast.isRemove === 'true' ? true : false; // remove toast from DOM or not
    this._timeId = null;
    this.#_init();
  }

  /**
   * Initialize the component
   */
  #_init() {
    this.#_createContainer();
    this.closeButton.addEventListener('click', this.hide.bind(this));
  }

  /**
   * Initialize the container
   */
  #_createContainer() {
    /**
     * Create a container element at the specified position.
     *
     * @param {string} position - the position of the container
     * @return {HTMLElement} the newly created container element
     */
    const createContainer = (position) => {
      const container = document.createElement('div');
      container.classList.add('toast-container', position);
      document.body.appendChild(container);
      return container;
    };
    //create container if not exist
    if (!this.container) this.container = createContainer('top-right');
    if (!this.bottomCenterContainer) this.bottomCenterContainer = createContainer('bottom-center');
  }

  /**
   * Show the toast element, dispatch a custom event, and execute a callback function if provided.
   *
   * @param {Function} callback - The callback function to be executed after the toast is shown.
   * @return {void}
   */
  show(callback) {
    this.#_createContainer();

    const isBottomCenter = this.element.classList.contains('bottom-center');
    const container = isBottomCenter ? this.bottomCenterContainer : this.container;

    isBottomCenter ? container?.prepend(this.element) : container?.appendChild(this.element);
    this.element.classList.add('active');

    if (this.dataToast.duration) {
      if (this._timeId) clearTimeout(this._timeId);
      this._timeId = setTimeout(() => this.hide(), +this.dataToast.duration);
    }

    const customEvent = new CustomEvent('toastShown');
    this.element.dispatchEvent(customEvent);

    if (typeof callback === 'function') {
      callback();
    }
  }

  /**
   * Hides the element with a closing animation and triggers a custom event, and execute a callback function if provided.
   *
   * @param {Function} callback - Optional callback function to be executed after hiding the element
   * @return {void}
   */
  hide(callback) {
    this.element.classList.add('closing'); //time for animation is 300ms
    setTimeout(() => {
      this.element.classList.remove('closing', 'active');
      this.dataRemove && this.element.remove();
    }, 400); //delay 100ms for animation to finish before removing

    const customEvent = new CustomEvent('toastHidden');
    this.element.dispatchEvent(customEvent);

    if (typeof callback === 'function') {
      callback();
    }
  }
}

/**
 * Creates a toast notification with customizable options.
 *
 * @param {Object} config - Configuration options for the toast.
 * @param {string|null} config.type - The type of toast.
 * @param {string} config.title - The title text of the toast.
 * @param {string} config.message - The message text of the toast.
 * @param {string} config.details - Additional details as small text.
 * @param {number|null} config.duration - The display duration in ms.
 * @param {string} config.position - The toast's position on screen.
 * @param {boolean} config.isRemove - Whether to remove toast on timeout.
 * @param {string} config.icon - HTML string for the toast's icon.
 * @return {Toast} The created toast instance.
 */
export const createToast = (config) => {
  const {
    type = null,
    title = '',
    message = '',
    details = '',
    duration = null,
    position = 'top-right',
    isRemove = true,
    icon = '',
  } = config;

  // Create data toast string
  const dataToast = `duration:${duration} isRemove:${isRemove}`;

  // Create toast element
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  type && toastElement.classList.add(type);
  position && toastElement.classList.add(position);
  dataToast && toastElement.setAttribute('data-toast', dataToast);
  toastElement.innerHTML = `
              ${icon ? icon : `<div class="toast-icon"></div>`}
              <div class="toast-body">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
                <small class="mt-2">${details}</small>
              </div>
              <button class="toast-close"><i class="far fa-x-close"></i></button>
              `;
  // Create toast instance
  const toast = new Toast(toastElement);
  toastElement._instance = toast;
  return toast;
};

export default Toast;
