import BaseComponent from './base-component';
import { makeInstances } from './_instance';

class Dropdown extends BaseComponent {
  #_items = [];
  #_selectedItems = [];
  #_selectedIndexes = [];
  /**
   * Constructs a new instance of the Dropdown class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.isMultiSelect =
      this.element.getAttribute('data-dropdown') === 'multi-select';
    this.dropdownButton = this.element.querySelector('.dropdown-btn');
    this.tags = this.#_createTags();
    this.resizeObserverTrigger = false;
    this.buttonSpanScrollWidth = 0;
    this.clearButton = this.#_createClearButton();
    this.dropdownMenu = this.element.querySelector('.dropdown-menu');
    this.buttonClickHandler = this.#_handleDropdownButtonClick.bind(this);
    this.clearButtonClickHandler = this.#_handleClearButtonClick.bind(this);
    this.tagClearButtonClickHandler =
      this.#_handleTagClearButtonClick.bind(this);
    this.menuItemClickHandler = this.#_handleDropdownMenuItemClick.bind(this);
    this.blurHandler = this.#_handleBlur.bind(this);
    this.dropdownMenuItems = this.dropdownMenu.querySelectorAll('.menu-item');
    this.#_items = this.#_setItems(this.dropdownMenuItems);
    this.dropdownPlaceholderText = this.dropdownButton
      .querySelector('.dropdown-btn-text')
      .textContent.trim();
    this.dropdownButtonIcon =
      this.dropdownButton.querySelector('.dropdown-btn-icon');
    this.#_init();
  }

  getItems() {
    return this.#_items;
  }

  getSelectedItems() {
    return this.#_selectedItems;
  }

  getSelectedIndexes() {
    return this.#_selectedIndexes;
  }

  updateItems(items) {
    items = items.map((item) => item.toString());

    this.dropdownButton.removeEventListener('click', this.buttonClickHandler);
    this.dropdownMenuItems.forEach((item) => {
      item.removeEventListener('click', this.menuItemClickHandler);
    });
    if (this.dropdownButton.querySelector('img')) {
      this.dropdownButton.querySelector('img').remove();
    }
    this.dropdownButton.querySelector('.dropdown-btn-text').textContent =
      this.dropdownPlaceholderText;
    this.dropdownButton.classList.remove('item-selected');
    this.#_selectedItems = [];
    this.#_setSelectedIndexes();

    this.dropdownMenu.innerHTML = `
      ${items
        .map((item) => {
          return `
            <button type="button" class="menu-item" role="menuitem">
              <span class="menu-item-text">${item}</span>
            </button>
          `;
        })
        .join('')}
    `;
    this.dropdownButton = this.element.querySelector('.dropdown-btn');
    this.dropdownMenu = this.element.querySelector('.dropdown-menu');
    this.dropdownMenuItems = this.dropdownMenu.querySelectorAll('.menu-item');
    this.#_items = this.#_setItems(this.dropdownMenuItems);
    this.dropdownPlaceholderText = this.dropdownButton
      .querySelector('.dropdown-btn-text')
      .textContent.trim();
    this.dropdownButtonIcon =
      this.dropdownButton.querySelector('.btn.icon-only');
    this.dropdownButton.addEventListener('click', this.buttonClickHandler);
    this.dropdownMenuItems.forEach((item) => {
      item.addEventListener('click', this.menuItemClickHandler);
      item.appendChild(this.#_createSelectedIcon());
    });
  }

  #_setSelectedIndexes() {
    this.#_selectedIndexes = [];
    this.dropdownMenuItems.forEach((item, index) => {
      if (item.classList.contains('selected')) {
        this.#_selectedIndexes.push(index);
      }
    });
  }

  #_init() {
    this.dropdownButton.addEventListener('click', this.buttonClickHandler);
    this.dropdownMenuItems.forEach((item) => {
      item.addEventListener('click', this.menuItemClickHandler);
      item.appendChild(this.#_createSelectedIcon());
    });
    if (this.isMultiSelect) {
      this.dropdownButton
        .querySelector('.dropdown-btn-text')
        .after(this.clearButton);
      this.clearButton.addEventListener('click', this.clearButtonClickHandler);
      this.#_createResizeObserver();
    }
  }

  #_createSelectedIcon() {
    const iconSpan = document.createElement('span');
    const icon = document.createElement('i');
    iconSpan.classList.add('selected-icon');
    icon.classList.add('far', 'fa-check');
    iconSpan.appendChild(icon);
    return iconSpan;
  }

  #_createClearButton() {
    const clearButton = document.createElement('span');
    clearButton.classList.add('dropdown-clear-btn', 'hidden');
    clearButton.innerHTML = 'Clear';
    return clearButton;
  }

  #_handleClearButtonClick(event) {
    event.stopPropagation();
    this.#_selectedItems = [];
    this.#_selectedIndexes = [];
    this.dropdownMenuItems.forEach((item) => {
      item.classList.remove('selected');
    });
    this.dropdownButton.querySelector('.dropdown-btn-text').innerHTML = '';
    this.dropdownButton.querySelector('.dropdown-btn-text').textContent =
      this.dropdownPlaceholderText;
    this.dropdownButton.classList.remove('item-selected');
    this.dropdownButton
      .querySelector('.dropdown-btn-text')
      .classList.remove('multi-select');
    this.clearButton.classList.add('hidden');
  }

  #_handleDropdownButtonClick() {
    //if menu is already open, close it, and vice versa
    if (this.dropdownMenu.hasAttribute('hidden')) {
      this.#_openDropdownMenu();
    } else {
      this.#_closeDropdownMenu();
    }
  }

  #_setItems(items) {
    const array = [];
    items.forEach((item) => {
      array.push(item.textContent.trim());
    });
    return array;
  }

  #_handleTagClearButtonClick(event) {
    event.stopPropagation();
    const tag = event.target.closest('[data-tag]');
    const tagText = tag.textContent.trim();

    const matchingMenuItem = Array.from(
      this.dropdownMenu.querySelectorAll('.menu-item.selected span')
    ).find((span) => span.textContent.trim() === tagText);
    matchingMenuItem.parentNode.classList.remove('selected');

    tag.remove();
    const isHaveSelectItems = this.#_selectedItems.includes(tagText);
    if (isHaveSelectItems) {
      this.#_selectedItems = this.#_selectedItems.filter(
        (item) => item !== tagText
      );
    }

    if (this.#_selectedItems.length === 0) {
      this.clearButton.classList.add('hidden');
      this.dropdownButton.querySelector('.dropdown-btn-text').textContent =
        this.dropdownPlaceholderText;
      this.dropdownButton.classList.remove('item-selected');
      this.dropdownButton
        .querySelector('.dropdown-btn-text')
        .classList.remove('multi-select');
    }
    this.#_setSelectedIndexes();
  }

  #_handleDropdownMenuItemClick(event) {
    if (this.isMultiSelect) {
      if (event.target.matches('.menu-item')) {
        const menuItemText = event.target.textContent.trim();

        if (event.target.classList.contains('selected')) {
          event.target.classList.remove('selected');

          const index = this.#_selectedItems.indexOf(menuItemText);
          if (index > -1) {
            this.#_selectedItems.splice(index, 1);
          }
        } else {
          event.target.classList.add('selected');
          this.#_selectedItems.push(menuItemText);
        }

        if (this.#_selectedItems.length > 0) {
          this.resizeObserverTrigger = false;
          this.clearButton.classList.remove('hidden');
          const buttonSpan =
            this.dropdownButton.querySelector('.dropdown-btn-text');
          this.tags = this.#_createTags();
          buttonSpan.innerHTML = this.tags;
          this.#_instantiateTags();
          if (buttonSpan.scrollWidth > buttonSpan.offsetWidth) {
            this.resizeObserverTrigger = true;
            this.buttonSpanScrollWidth = buttonSpan.scrollWidth;
            buttonSpan.textContent = `${this.#_selectedItems.length} item(s) selected`;
          }

          this.dropdownButton.classList.add('item-selected');
          this.dropdownButton
            .querySelector('.dropdown-btn-text')
            .classList.add('multi-select');
        } else {
          this.clearButton.classList.add('hidden');
          this.dropdownButton.querySelector('.dropdown-btn-text').textContent =
            this.dropdownPlaceholderText;
          this.dropdownButton.classList.remove('item-selected');
          this.dropdownButton
            .querySelector('.dropdown-btn-text')
            .classList.remove('multi-select');
        }
        this.#_setSelectedIndexes();
      }
    } else {
      if (event.target.matches('.menu-item')) {
        const menuItemText = event.target.textContent.trim();
        if (this.dropdownButton.querySelector('img')) {
          this.dropdownButton.querySelector('img').remove();
        }

        this.#_closeDropdownMenu();
        this.dropdownButton.classList.add('item-selected');

        this.dropdownMenuItems.forEach((dropdownMenuItem) => {
          if (event.target === dropdownMenuItem) {
            if (dropdownMenuItem.classList.contains('selected')) {
              dropdownMenuItem.classList.remove('selected');
              this.#_selectedItems = [];
              this.dropdownButton.querySelector(
                '.dropdown-btn-text'
              ).textContent = this.dropdownPlaceholderText;
              this.dropdownButton.classList.remove('item-selected');
            } else {
              dropdownMenuItem.classList.add('selected');
              this.dropdownButton.querySelector(
                '.dropdown-btn-text'
              ).textContent = menuItemText;
              this.#_selectedItems = [menuItemText];
              if (event.target.closest('.menu-item').querySelector('img')) {
                this.dropdownButton.insertBefore(
                  event.target
                    .closest('.menu-item')
                    .querySelector('img')
                    .cloneNode(true),
                  this.dropdownButton.querySelector('.dropdown-btn-text')
                );
              }
            }
          } else {
            dropdownMenuItem.classList.remove('selected');
          }
        });
        this.#_setSelectedIndexes();
      }
    }
  }

  #_createResizeObserver() {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          const buttonSpan =
            this.dropdownButton.querySelector('.dropdown-btn-text');
          if (
            buttonSpan.scrollWidth > buttonSpan.offsetWidth &&
            !this.resizeObserverTrigger
          ) {
            this.resizeObserverTrigger = true;
            this.buttonSpanScrollWidth = buttonSpan.scrollWidth;
            buttonSpan.textContent = `${this.#_selectedItems.length} item(s) selected`;
          } else if (
            this.buttonSpanScrollWidth <= buttonSpan.offsetWidth &&
            this.resizeObserverTrigger
          ) {
            this.resizeObserverTrigger = false;
            this.tags = this.#_createTags();
            buttonSpan.innerHTML = this.tags;
            this.#_instantiateTags();
          }
        }
      }
    });
    resizeObserver.observe(this.dropdownButton);
  }

  #_createTags() {
    return this.#_selectedItems
      .map(
        (item) =>
          `<span data-tag="removable" class="tag small outlined"> ${item} </span>`
      )
      .join('');
  }

  #_instantiateTags() {
    //create tag with tag class and add event listener for removal
    const tags = this.element.querySelectorAll('[data-tag]');
    makeInstances(tags, 'tag');
    tags.forEach((tag) => {
      tag._instance.removeButton.addEventListener(
        'click',
        this.tagClearButtonClickHandler
      );
    });
  }

  #_openDropdownMenu() {
    this.dropdownMenu.removeAttribute('hidden');
    this.dropdownButton.classList.add('active');
    document.addEventListener('click', this.blurHandler);
  }

  #_closeDropdownMenu() {
    this.dropdownMenu.setAttribute('hidden', '');
    this.dropdownButton.classList.remove('active');
    document.removeEventListener('click', this.blurHandler);
  }

  #_handleBlur(event) {
    //if click outside dropdown, then close the dropdown
    if (
      !this.dropdownButton.contains(event.target) &&
      !this.dropdownMenu.contains(event.target)
    ) {
      this.#_closeDropdownMenu();
    }
  }
}

export default Dropdown;
