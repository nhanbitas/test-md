import BaseComponent from './base-component';

class Spinner extends BaseComponent {
  /**
   * Constructs a new instance of the Spinner class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.originalInnerHTML = this.element.innerHTML;
  }

  /**
   * Start the animation with the given message.
   *
   * @param {string} message - The message to be displayed during the animation.
   */
  startAnimation(message) {
    this.element.classList.add('loading');
    this.#_clearInnerHTML();
    this.element.append(this.#_createSpinner());
    message && this.element.append(this.#_createMessage(message));
  }
  /**
   * Stops the animation and updates the element with the provided status and message
   *
   * @param {string} status - the status of the animation (success or error)
   * @param {string} message - the message to be displayed during the animation
   * @param {number} delay - the delay in milliseconds before stopping the animation
   */
  stopAnimation(status, message, delay = 1500) {
    this.#_clearInnerHTML();
    if (!status) {
      this.element.classList.remove('loading');
      this.element.innerHTML = this.originalInnerHTML;
      return;
    }

    switch (status) {
      case 'success':
        this.element.append(this.#_createCheckmark());
        break;
      case 'error':
        this.element.append(this.#_createError());
        break;
      default:
        break;
    }
    this.element.classList.add(status);
    message && this.element.append(this.#_createMessage(message));

    setTimeout(() => {
      this.element.classList.remove('loading', status);
      this.element.innerHTML = this.originalInnerHTML;
    }, delay);
  }

  /**
   * Creates a message element with the given message
   * @param {string} message - The message to be displayed
   * @returns {HTMLElement} - The created message element
   */
  #_createMessage(message) {
    const messageElement = document.createElement('span');
    messageElement.textContent = message;
    return messageElement;
  }

  /**
   * Clear the inner HTML of the element
   */
  #_clearInnerHTML() {
    this.element.innerHTML = '';
  }

  /**
   * Create and return a spinner SVG element
   * @returns {HTMLElement} - The created spinner SVG element
   */
  #_createSpinner() {
    const spinner = document.createElement('svg');
    spinner.classList.add('spinner-svg', 'spinner-circle-01');
    return spinner;
  }

  /**
   * Create and return a checkmark SVG object
   * @returns {object} - The created checkmark SVG object
   */
  #_createCheckmark() {
    const checkmark = document.createElement('object');
    checkmark.setAttribute('type', 'image/svg+xml');
    checkmark.classList.add('checkmark-svg', 'h-4', 'w-4');
    checkmark.setAttribute(
      'data',
      'data:image/svg+xml,%3Csvg height="16" width="16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"%3E%3Cpath fill="none" d="M20 6L9 17L4 12" stroke="%232F8E47" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="60" stroke-dashoffset="-60"%3E%3Canimate attributeName="stroke-dashoffset" from="-60" to="0" dur="0.3s" begin="0s" fill="freeze" /%3E%3C/path%3E%3C/svg%3E',
    );
    return checkmark;
  }

  /**
   * Creates an error icon element
   * @returns {HTMLElement} - The error icon element
   */
  #_createError() {
    const error = document.createElement('i');
    error.classList.add('far', 'fa-alert-triangle', 'text-red-600');
    return error;
  }
}

export default Spinner;
