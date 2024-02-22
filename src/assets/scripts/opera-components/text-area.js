import BaseComponent from './base-component';

class TextArea extends BaseComponent {
  /**
   * Constructs a new instance of the TextArea class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.maxLength = this.element.getAttribute('maxlength') || -1;
    this.charCount = this.#_createCharCount();
    this.textAreaInputHandler = this.#_handleTextAreaInput.bind(this);
    this.clearButton = this.#_createClearButton();
    this.clearButtonClickHandler = this.#_handleClearButtonClick.bind(this);
    this.#_init();
  }

  #_init() {
    this.#_createTextAreaWrapper();
    this.element.addEventListener('input', this.textAreaInputHandler);
    this.clearButton.addEventListener('click', this.clearButtonClickHandler);
  }

  //TEMP
  reset() {
    this.element.value = '';
    this.#_handleTextAreaInput();
  }

  #_handleTextAreaInput() {
    this.element.scrollTop = this.element.scrollHeight;
    this.charCount.textContent = this.element.value.length + '/' + this.maxLength;
    if (this.element.value.length > 0) {
      this.clearButton.classList.remove('hidden');
    } else {
      this.clearButton.classList.add('hidden');
    }
  }

  #_handleClearButtonClick() {
    this.element.value = '';
    this.charCount.textContent = this.element.value.length + '/' + this.maxLength;
    this.clearButton.classList.add('hidden');
  }

  #_createCharCount() {
    const charCount = document.createElement('span');
    charCount.textContent = this.element.value.length + '/' + this.maxLength;
    return charCount;
  }

  #_createClearButton() {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('hidden');
    button.textContent = 'Clear';
    return button;
  }

  #_createTextAreaWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('text-area-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    const footer = document.createElement('div');
    footer.classList.add('text-area-footer');
    wrapper.appendChild(this.element);
    wrapper.appendChild(footer);
    if (this.maxLength !== -1) {
      footer.appendChild(this.charCount);
    } else {
      footer.classList.add('reverse');
    }
    footer.appendChild(this.clearButton);
    return wrapper;
  }
}

export default TextArea;
