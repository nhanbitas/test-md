import convertDataToObject from '../utils/convertDataToObject';
import BaseComponent from './base-component';
import OverflowMenu from './overflow-menu';

class Pagination extends BaseComponent {
  /**
   * Constructs a new instance of the Tag class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.dataPagination = convertDataToObject(this.element.getAttribute('data-pagination'));
    this.paginationItems = Array.from(this.element.querySelectorAll('[data-page]'));
    this.isScrollable = this.element.classList.contains('scrollable');
    this.maxShowItems = +this.dataPagination.maxItem || 5; //less than 5 will not need overflow menu
    this.currentPage = +this.dataPagination.currentPage;
    this.totalPage =
      +this.paginationItems[this.paginationItems.length - 1].getAttribute('data-page') || this.paginationItems.length;
    this.startPage = +this.paginationItems[0].getAttribute('data-page') || 1;
    this.endPage = this.totalPage;
    this.btnPre = this.element.querySelector('.btn-pre');
    this.btnNext = this.element.querySelector('.btn-next');
    this.btnStart = this.element.querySelector('.btn-start');
    this.btnEnd = this.element.querySelector('.btn-end');
    this.#_init();
  }

  /**
   * Get the current page.
   *
   * @return {Number} page - The page number.
   */
  getCurrentPage() {
    return this.currentPage;
  }

  /**
   * Set the current page.
   *
   * @param {number} page - The page number.
   */
  setCurrentPage(page) {
    if (!page || isNaN(page)) return;

    if (page < this.startPage) {
      page = this.startPage;
    }
    if (page > this.endPage) {
      page = this.endPage;
    }

    this.currentPage = +page;
    this.element.dispatchEvent(new CustomEvent('change', { detail: { currentPage: +this.currentPage } }));
    this.#_updateUI();
    this.#_handleFocusATag();
  }

  /**
   * Append a page node to the pagination.
   * @param {Element} node - The Li node with data-page to append.
   */
  appendPage(node) {
    this.paginationItems[this.paginationItems.length - 1].insertAdjacentElement('afterend', node);
    this.paginationItems.push(node);
    this.totalPage++;
    this.endPage = this.totalPage;
    node.addEventListener('click', () => this.#_handleItemClick(node));
    this.#_updateUI();
  }

  /**
   * Initialize the component
   */
  #_init() {
    // Add event listener for scrollable pagination
    if (this.isScrollable) {
      this.element.addEventListener('wheel', this.#_handleScrollablePagination.bind(this));
    }

    // Add event listeners for pagination items
    this.paginationItems.forEach((item) => {
      item.addEventListener('click', () => this.#_handleItemClick(item));
    });

    // Add event listeners for navigation buttons
    this.btnNext?.addEventListener('click', this.#_handleNextButtonClick.bind(this));
    this.btnPre?.addEventListener('click', this.#_handlePreviousButtonClick.bind(this));
    this.btnStart?.addEventListener('click', this.#_handleStartButtonClick.bind(this));
    this.btnEnd?.addEventListener('click', this.#_handleEndButtonClick.bind(this));

    // Update UI
    this.#_updateUI();
  }

  /**
   * Handle scrollable pagination
   * @param {Event} event - The scroll event
   */
  #_handleScrollablePagination(event) {
    event.preventDefault();
    this.element.scrollLeft += event.deltaY - 50;
  }

  /**
   * Handle item click event
   * @param {HTMLElement} item - The clicked item
   */
  #_handleItemClick(item) {
    const clickedPage = +item.getAttribute('data-page');
    if (this.currentPage === clickedPage) return;
    this.setCurrentPage(clickedPage);
  }

  /**
   * Handle the click event for the previous button
   */
  #_handlePreviousButtonClick() {
    if (this.currentPage > this.startPage) {
      this.setCurrentPage(this.currentPage - 1);
    }
  }

  /**
   * Handle the next button click
   */
  #_handleNextButtonClick() {
    if (this.currentPage < this.endPage) {
      this.setCurrentPage(this.currentPage + 1);
    }
  }

  /**
   * Handle the start button click
   */
  #_handleStartButtonClick() {
    if (this.currentPage > this.startPage) {
      this.setCurrentPage(this.startPage);
    }
  }

  /**
   * Handle the click event for the end button
   */
  #_handleEndButtonClick() {
    if (this.currentPage < this.endPage) {
      this.setCurrentPage(this.endPage);
    }
  }

  /**
   * Handles the focus on a tag
   */
  #_handleFocusATag() {
    const currentPageElement = this.element.querySelector(`[data-page="${this.currentPage}"]`);
    if (currentPageElement && currentPageElement.tagName.toLowerCase() === 'a') {
      currentPageElement.click(); // Click on the current page element if it is an 'a' tag
    } else {
      const aTag = currentPageElement?.querySelector('a');
      const href = aTag?.getAttribute('href');
      if (aTag && href) {
        aTag.click(); // Click on the 'a' tag if it exists and has a valid href attribute
      }
    }
  }

  /**
   * Handle the maximum show item
   * @param {number} currentPage - The current page number
   */
  #_handleMaxShowItem(currentPage = 0) {
    if (this.maxShowItems > this.totalPage || this.maxShowItems <= 5 || this.isScrollable) return;

    const activeItemIndex = this.#_caculateActiveItemIndex(currentPage);
    this.#_clearAndAddButtons();
    this.#_addActiveItemAndAdjacentItems(activeItemIndex);
    this.#_addOverflowMenu(activeItemIndex);
  }

  /**
   * Update the UI by calling the necessary helper functions
   */
  #_updateUI() {
    this.#_updateCurrentPageStatus(); // Update the current page status
    this.#_updateButtonsStatus(); // Update the buttons status
    this.maxShowItems && this.#_handleMaxShowItem(this.currentPage); // Handle maximum show item based on the current page
  }

  /**
   * Update the status of the current page by adding or removing the 'active' class from pagination items.
   */
  #_updateCurrentPageStatus() {
    this.paginationItems.forEach((item) => {
      if (this.currentPage === +item.getAttribute('data-page')) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  /**
   * Update the status of buttons based on the current page
   */
  #_updateButtonsStatus() {
    /**
     * Disable an array of buttons
     * @param {Array} btns - Array of buttons to be disabled
     */
    const disableBtns = (btns) => btns.forEach((btn) => btn?.setAttribute('disabled', ''));

    /**
     * Enable an array of buttons
     * @param {Array} btns - Array of buttons to be enabled
     */
    const enableBtns = (btns) => btns.forEach((btn) => btn?.removeAttribute('disabled'));

    if (this.currentPage == this.startPage) {
      disableBtns([this.btnPre, this.btnStart]);
      enableBtns([this.btnNext, this.btnEnd]);
    } else if (this.currentPage == this.endPage) {
      disableBtns([this.btnNext, this.btnEnd]);
      enableBtns([this.btnPre, this.btnStart]);
    } else {
      enableBtns([this.btnPre, this.btnStart, this.btnNext, this.btnEnd]);
    }
  }

  /**
   * Calculate the active item index based on the current page
   * @param {number} currentPage - The current page number
   * @returns {number} - The active item index
   */
  #_caculateActiveItemIndex(currentPage) {
    if (currentPage && currentPage > 3 && currentPage < this.endPage - 2) {
      return currentPage - 1; //Because index less than currentpage 1 unit, we need -1
    } else if (currentPage <= 3) {
      return 2; //3-1
    } else if (currentPage >= this.endPage - 2) {
      return this.endPage - 3; //-2-1
    } else {
      return Math.floor(this.totalPage / 2) - 1;
    }
  }

  /**
   * Clears the element and adds pagination buttons.
   */
  #_clearAndAddButtons() {
    this.element.innerHTML = ''; //clear all
    this.element.prepend(this.paginationItems[0]); //add first page
    this.element.append(this.paginationItems[this.totalPage - 1]); // add last page

    /**
     * Creates a list item and wraps the button inside it.
     * @param {Element} button - The button to wrap
     * @returns {Element} The list item containing the button
     */
    const createLiAndWrapButton = (button) => {
      if (!button) return null;
      const li = document.createElement('li');
      li.classList.add('pagination-item');
      li.appendChild(button);
      return li;
    };

    this.element.prepend(createLiAndWrapButton(this.btnStart), createLiAndWrapButton(this.btnPre));
    this.element.append(createLiAndWrapButton(this.btnNext), createLiAndWrapButton(this.btnEnd));
  }

  /**
   * Add the active item and its adjacent items to the DOM
   * @param {number} activeItemIndex - The index of the active item
   */
  #_addActiveItemAndAdjacentItems(activeItemIndex) {
    const termItems = this.element.querySelectorAll('[data-page]');
    termItems[0].insertAdjacentElement('afterend', this.paginationItems[activeItemIndex]); // [active]
    termItems[0].insertAdjacentElement('afterend', this.paginationItems[activeItemIndex - 1]); // [active - 1 ,active]
    termItems[termItems.length - 1].insertAdjacentElement('beforebegin', this.paginationItems[activeItemIndex + 1]); // [active - 1 ,active, acive + 1]
  }

  /**
   * Create an overflow menu element with the given nodes
   * @param {Array} nodes - The nodes to be added to the overflow menu
   * @returns {HTMLElement} - The created overflow menu element
   */
  #_createOverflowMenu(nodes = []) {
    const overflowMenu = document.createElement('li');
    overflowMenu.classList.add('overflow-menu', 'pagination-item');
    overflowMenu.innerHTML = `
    <button class="px-1">...</button>
    <div class="overflow-menu-body">
    </div>
    `;
    nodes.forEach((item) => overflowMenu.querySelector('.overflow-menu-body').append(item));
    const overflowMenuBody = overflowMenu.querySelector('.overflow-menu-body');
    Array.from(overflowMenuBody.children).forEach((item) => {
      item.classList.add('overflow-menu-item');
      // add click event again because it was removed in when cloneNode
      item.addEventListener('click', () => {
        this.#_handleItemClick(item);
      });
    });

    new OverflowMenu(overflowMenu);
    return overflowMenu;
  }

  /**
   * Adds an overflow menu to the pagination items based on the active item index
   * @param {number} activeItemIndex - The index of the active item
   */
  #_addOverflowMenu(activeItemIndex) {
    const termItems = this.element.querySelectorAll('[data-page]');
    const preOverflowItems = this.paginationItems.slice(1, activeItemIndex - 1).map((item) => item.cloneNode(true));
    const nextOverflowItems = this.paginationItems
      .slice(activeItemIndex + 2, this.paginationItems.length - 1)
      .map((item) => item.cloneNode(true));

    if (preOverflowItems.length > 1) {
      termItems[0].insertAdjacentElement('afterend', this.#_createOverflowMenu(preOverflowItems));
    } else if (preOverflowItems.length == 1) {
      //if only one item, don't need to create overflow menu
      preOverflowItems[0].addEventListener('click', () => this.#_handleItemClick(preOverflowItems[0]));
      termItems[0].insertAdjacentElement('afterend', preOverflowItems[0]);
    }

    if (nextOverflowItems.length > 1) {
      termItems[termItems.length - 1].insertAdjacentElement(
        'beforebegin',
        this.#_createOverflowMenu(nextOverflowItems),
      );
    } else if (nextOverflowItems.length == 1) {
      //if only one item, don't need to create overflow menu
      nextOverflowItems[0].addEventListener('click', () => this.#_handleItemClick(nextOverflowItems[0]));
      termItems[termItems.length - 1].insertAdjacentElement('beforebegin', nextOverflowItems[0]);
    }
  }
}

export default Pagination;
