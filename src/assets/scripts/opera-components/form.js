import BaseComponent from './base-component';
import Select from './select';
import TextField from './text-field';
import TextArea from './text-area';
import Checkbox from './checkbox';
import Radio from './radio';
import Fieldset from './fieldset';

class Form extends BaseComponent {
  /**
   * Constructs a new instance of the Form class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.formResetHandler = this.#_handleFormReset.bind(this);
    this.#_init();
  }

  #_init() {
    this.element.addEventListener('reset', this.formResetHandler);
  }

  #_handleFormReset(event) {
    event.preventDefault();
    const array = Array.from(this.element.elements);
    array.forEach((input) => {
      if (input._flatpickr) {
        input._flatpickr.clear();
      }
      if (input._instance) {
        if (
          input._instance instanceof Select ||
          input._instance instanceof TextField ||
          input._instance instanceof TextArea ||
          input._instance instanceof Checkbox ||
          input._instance instanceof Radio ||
          input._instance instanceof Fieldset
        ) {
          input._instance.reset();
        }
      }
    });
  }
}

export default Form;
