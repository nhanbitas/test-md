import convertDataToObject from '../utils/convertDataToObject';
import BaseComponent from './base-component';

class ToggleGroup extends BaseComponent {
  /**
   * Constructs a new instance of the ToggleGroup class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.toggleGroupItems = this.element.querySelectorAll('.toggle-group-item');
    this.dataToggleGroup = null;
    this.#_init();
  }

  /**
   * Initialize the component
   */
  #_init = () => {
    this.#_initDataToggleGroup();
    this.#_initActiveItem();
    this.#_initClickEvent();
  };

  /**
   * Initialize the data toggle group based on the element's data-toggle-group attribute
   */
  #_initDataToggleGroup() {
    // Get the data-toggle-group attribute from the element
    const dataToggleGroup = this.element.getAttribute('data-toggle-group') || '';
    // Destructure the values from the converted data object, with default values
    let { currentValue = '', selectType = 'single' } = convertDataToObject(dataToggleGroup);
    // If selectType is multiple, convert the currentValue from a string to an array
    if (selectType === 'multiple') {
      //Convert string to array
      currentValue = currentValue
        .slice(1, -1)
        .split(',')
        .filter((item) => item !== '');
    }
    // Set the dataToggleGroup property with currentValue and selectType
    this.dataToggleGroup = { currentValue, selectType };
  }

  /**
   * Initialize the active item based on the current value and select type of the data toggle group.
   */
  #_initActiveItem() {
    const { currentValue, selectType } = this.dataToggleGroup;

    this.toggleGroupItems.forEach((item) => {
      const itemValue = item.getAttribute('value');

      switch (selectType) {
        case 'multiple':
          currentValue.includes(itemValue) && this.#_addActiveClass(item);
          break;
        default:
          itemValue === currentValue && this.#_addActiveClass(item);
          break;
      }
    });
  }

  /**
   * Initialize click event for toggle group items
   */
  #_initClickEvent() {
    this.toggleGroupItems.forEach((item) => {
      item.addEventListener('click', () => {
        this.#_handleClick(item);
      });
    });
  }
  /**
   *  Handle click event
   *  @param {Element} item - The item that was clicked
   */
  #_handleClick(item) {
    const value = item.getAttribute('value');

    switch (this.dataToggleGroup.selectType) {
      case 'multiple':
        this.#_handleMultiTypeClick(item, value);
        break;
      default:
        this.#_handleSingleTypeClick(item, value);
        break;
    }

    // Dispatch change event
    const event = new CustomEvent('change', { detail: { value: this.dataToggleGroup.currentValue } });
    this.element.dispatchEvent(event);
  }

  /**
   * Handles the click event for multiple types.
   * @param {object} item - The item clicked.
   * @param {string} value - The value associated with the clicked item.
   */
  #_handleMultiTypeClick(item, value) {
    if (this.dataToggleGroup.currentValue.includes(value)) {
      // Remove active class and update current value
      this.#_removeActiveClass(item);
      this.dataToggleGroup.currentValue = this.dataToggleGroup.currentValue.filter((item) => item !== value);
      return;
    }
    // Add active class and update current value
    this.#_addActiveClass(item);
    this.dataToggleGroup.currentValue.push(value);
  }

  /**
   * Handles the click event for a single type.
   * @param {Object} item - The item being clicked.
   * @param {string} value - The value associated with the clicked item.
   */
  #_handleSingleTypeClick(item, value) {
    if (this.dataToggleGroup.currentValue === value) return;
    this.#_removeAllActiveClasses();
    this.#_addActiveClass(item);
    this.dataToggleGroup.currentValue = value;
  }

  /**
   * Remove all active classes from the group items
   */
  #_removeAllActiveClasses() {
    this.toggleGroupItems.forEach((item) => {
      this.#_removeActiveClass(item);
    });
  }

  /**
   * Remove the active class from the specified item
   * @param {HTMLElement} item - The item to remove the active class from
   */
  #_removeActiveClass(item) {
    item.classList.remove('active');
    item.previousElementSibling?.classList.remove('after:hidden');
  }

  /**
   * Add the active class to the specified item
   * @param {HTMLElement} item - The item to add the active class to
   */
  #_addActiveClass(item) {
    item.classList.add('active');
    item.previousElementSibling?.classList.add('after:hidden');
  }
}
export default ToggleGroup;
