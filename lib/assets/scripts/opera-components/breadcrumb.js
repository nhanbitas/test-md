import convertDataToObject from '../utils/convertDataToObject';
import BaseComponent from './base-component';
import OverflowMenu from './overflow-menu';

class Breadcrumb extends BaseComponent {
  /**
   * Constructs a new instance of the Breadcrumb class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.dataBreadcrumb = convertDataToObject(this.element.getAttribute('data-breadcrumb'));
    this.maxShowItems = this.dataBreadcrumb.maxItem;
    this.items = Array.from(this.element.querySelectorAll('.breadcrumb-item'));
    this.update = this.#_handleMaxShowItems.bind(this);
    this.#_init();
  }

  /**
   * Initializes the component
   */
  #_init() {
    // Handle maximum show items
    this.#_handleMaxShowItems();
  }

  /**
   * Handle the maximum show items
   */
  #_handleMaxShowItems() {
    if (!this.maxShowItems || this.maxShowItems < 2 || this.maxShowItems >= this.items.length) {
      return;
    }

    // Remove all items except the first and last child
    this.#_removeItems();

    // Create a document fragment and append the first and last items to it
    const fragment = document.createDocumentFragment();
    fragment.appendChild(this.items[0]);
    fragment.appendChild(this.items[this.items.length - 1]);
    this.element.appendChild(fragment);

    // Add overflow menu
    const overflowItems = this.items.slice(1, this.items.length - 1);
    this.element.insertBefore(this.#_createOverflowMenu(overflowItems), this.element.firstChild.nextSibling);
  }

  /**
   * Create an overflow menu element with provided nodes
   * @param {Array} nodes - Array of nodes to be displayed in the overflow menu
   * @returns {HTMLElement} The created overflow menu element
   */
  #_createOverflowMenu(nodes = []) {
    const overflowMenu = document.createElement('li');
    overflowMenu.classList.add('overflow-menu', 'breadcrumb-item', 'p-0');

    overflowMenu.innerHTML = `
    <button class="px-1">...</button>
    <div class="overflow-menu-body bottom-right text-small min-w-fit">
    ${Array.from(nodes)
      .map((node) => node.innerHTML)
      .join(' ')}
    </div>
    `;

    const overflowMenuBody = overflowMenu.querySelector('.overflow-menu-body');
    Array.from(overflowMenuBody.children).forEach((item) => item.classList.add('overflow-menu-item'));

    new OverflowMenu(overflowMenu);
    return overflowMenu;
  }

  /**
   * Remove all items from the element
   */
  #_removeItems() {
    this.element.innerHTML = '';
  }
}
export default Breadcrumb;
