import BaseComponent from './base-component';

class Tabs extends BaseComponent {
  /**
   * Constructs a new instance of the Tab class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.tabsNav = this.element.querySelector('.tabs-nav');
    this.tabsBody = this.element.querySelector('.tabs-body');
    this.tabButtons = Array.from(this.tabsNav.querySelectorAll('.tab-button'));
    this.tabButtonClickHandler = this.#_handleTabButtonClick.bind(this);
    this.tabContents = Array.from(this.tabsBody.children).filter((child) => child.matches('.tab-content'));
    this.activeTabIndex = 0;
    this.#_init();
  }

  activateTab(index) {
    this.#_handleTabChange(index);
  }

  #_init() {
    this.tabContents[this.activeTabIndex].classList.remove('hidden');
    this.tabButtons[this.activeTabIndex].classList.add('active', 'from-left');

    this.tabButtons.forEach((tabButton) => {
      tabButton.addEventListener('click', this.tabButtonClickHandler);
    });
  }

  #_handleTabChange(nextIndex) {
    const currentIndex = this.activeTabIndex;
    this.tabContents.forEach((content) => {
      content.classList.add('hidden');
    });

    for (let i = 0; i < this.tabButtons.length; i++) {
      if (i < nextIndex) {
        this.tabButtons[i].classList.remove('active', 'from-left');
        this.tabButtons[i].classList.add('from-right');
      } else if (i > nextIndex) {
        this.tabButtons[i].classList.remove('active', 'from-right');
        this.tabButtons[i].classList.add('from-left');
      }
    }

    if (currentIndex < nextIndex) {
      this.tabButtons[nextIndex].classList.add('active', 'from-left');
    } else if (currentIndex > nextIndex) {
      this.tabButtons[nextIndex].classList.add('active', 'from-right');
    }

    this.activeTabIndex = nextIndex;
    this.tabContents[nextIndex].classList.remove('hidden');
  }

  #_handleTabButtonClick(event) {
    this.#_handleTabChange(this.tabButtons.indexOf(event.target));
  }
}

export default Tabs;
