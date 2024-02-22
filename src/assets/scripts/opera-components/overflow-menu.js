import BaseComponent from './base-component';
import convertDataToObject from '../utils/convertDataToObject';

class OverflowMenu extends BaseComponent {
  /**
   * Constructs a new instance of the OverflowMenu class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.body = this.element.querySelector('.overflow-menu-body');
    this.dataOverflowMenu = convertDataToObject(this.element.getAttribute('data-overflow-menu'));
    this.groupSelections = Array.from(this.element.querySelectorAll('.group-selection'));
    this.#_init();
  }

  /**
   * Initialize the component
   */
  #_init() {
    // Early return if there is no body
    if (!this.body) {
      return;
    }

    // Cache this.dataOverflowMenu.type
    const overflowMenuType = this.dataOverflowMenu.type || 'toggle';

    // Add click event listener for toggle type
    if (overflowMenuType === 'toggle') {
      this.element.addEventListener('click', (e) => {
        if (this.#_checkIsSelectionItem(e)) return;
        this.#_handleToggleMenu();
      });
    }

    // Add mouseenter and mouseleave event listeners for hover type
    if (overflowMenuType === 'hover') {
      this.element.addEventListener('mouseenter', () => this.#_handleToggleMenu());
      this.element.addEventListener('mouseleave', () => this.#_handleToggleMenu());
    }

    // Add click event listener for document
    document.addEventListener('click', (e) => this.#_handleDocumentClick(e));

    // Iterate through groupSelections and handle click for each item
    this.groupSelections.length &&
      this.groupSelections?.forEach((group) => {
        const Items = Array.from(group.children);
        Items.forEach((item) => {
          this.#_handleClickGroupSelecttionItem(item);
        });
      });
  }

  /**
   * Handle toggle menu
   */
  #_handleToggleMenu() {
    this.element.classList.toggle('active');
  }

  /**
   * Handle document click event
   * @param {Event} event - The event object
   */
  #_handleDocumentClick(event) {
    if (this.element.classList.contains('active') && !this.element.contains(event.target)) {
      this.element.classList.remove('active');
    }
  }

  /**
   * Create and returns a selected icon element.
   * @returns {HTMLElement} The selected icon element
   */
  #_createSelectedIcon() {
    const iconSpan = document.createElement('span');
    const icon = document.createElement('i');
    iconSpan.classList.add('selected-icon');
    icon.classList.add('far', 'fa-check');
    iconSpan.appendChild(icon);
    return iconSpan;
  }

  /**
   * Add click event listener to the given node for group selection items
   * @param {HTMLElement} node - The node to add the click event listener to
   */
  #_handleClickGroupSelecttionItem(node) {
    node.addEventListener('click', (event) => {
      if (node.classList.contains('selected')) {
        node.classList.remove('selected');
        node.querySelector('.selected-icon').remove();
      } else {
        node.classList.add('selected');
        node.appendChild(this.#_createSelectedIcon());
      }
    });
  }

  /**
   * Check if the target element is a selection item
   * @param {Event} event - The event object
   * @returns {boolean} True if the target element is a selection item, false otherwise
   */
  #_checkIsSelectionItem(event) {
    const targetElement = event.target;
    return this.groupSelections.length && this.groupSelections.some((element) => element.contains(targetElement));
  }
}

export default OverflowMenu;
