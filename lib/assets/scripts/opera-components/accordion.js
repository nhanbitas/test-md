import BaseComponent from './base-component';

class Accordion extends BaseComponent {
  /**
   * Constructs a new instance of the accordion class.
   * @constructor
   * @param {Element} element - The accordion element to be passed to the constructor.
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.isSingleActive =
      this.element.getAttribute('data-accordion') === 'single-active';
    this.accordionItems = Array.from(this.element.children).filter((child) =>
      child.matches('.accordion-item')
    );
    this.activeItem = null;
    this.#_init();
  }

  #_init() {
    this.accordionItems.forEach((item) => {
      const button = item.querySelector('button');
      const isActive = item.classList.contains('active');
      if (isActive) {
        this.activeItem = item;
      }
      if (button.classList.contains('icon-left')) {
        const iconSpan = this.#_createIcons(isActive, 'left');
        button.prepend(iconSpan);
      } else if (button.classList.contains('icon-right')) {
        const iconSpan = this.#_createIcons(isActive, 'right');
        button.appendChild(iconSpan);
      }
      const content = item.querySelector('.accordion-item-content');
      button.addEventListener(
        'click',
        this.#_handleAccordionItemButtonClick.bind(this, item, button, content)
      );
    });
  }

  #_createIcons(isActive, position) {
    const iconSpan = document.createElement('span');
    iconSpan.classList.add('icon-square', 'xlarge');
    const expandIcon = document.createElement('i');
    const collapseIcon = document.createElement('i');

    if (position === 'left') {
      expandIcon.classList.add('expand-icon', 'far', 'fa-plus');
      collapseIcon.classList.add('collapse-icon', 'far', 'fa-minus');
    } else if (position === 'right') {
      expandIcon.classList.add('expand-icon', 'far', 'fa-chevron-down');
      collapseIcon.classList.add('collapse-icon', 'far', 'fa-chevron-up');
    }

    if (isActive) {
      expandIcon.setAttribute('hidden', '');
    } else {
      collapseIcon.setAttribute('hidden', '');
    }

    iconSpan.appendChild(expandIcon);
    iconSpan.appendChild(collapseIcon);
    return iconSpan;
  }

  #_handleAccordionItemButtonClick(item, button, content) {
    if (this.isSingleActive && !content.classList.contains('hidden')) {
      this.activeItem = item;
    }
    const expandIcon = button.querySelector('.expand-icon');
    const collapseIcon = button.querySelector('.collapse-icon');
    const isActiveItem = this.activeItem === item;

    if (this.isSingleActive) {
      if (!isActiveItem && this.activeItem) {
        const activeContent = this.activeItem.querySelector(
          '.accordion-item-content'
        );
        const activeExpandIcon = this.activeItem.querySelector('.expand-icon');
        const activeCollapseIcon =
          this.activeItem.querySelector('.collapse-icon');
        activeContent.classList.add('hidden');
        this.activeItem.classList.remove('active');
        activeExpandIcon.toggleAttribute('hidden');
        activeCollapseIcon.toggleAttribute('hidden');
      }
      content.classList.toggle('hidden');
      item.classList.toggle('active', !isActiveItem);
      expandIcon.toggleAttribute('hidden');
      collapseIcon.toggleAttribute('hidden');
      this.activeItem = isActiveItem ? null : item;
    } else {
      content.classList.toggle('hidden');
      item.classList.toggle('active');
      expandIcon.toggleAttribute('hidden');
      collapseIcon.toggleAttribute('hidden');
    }
  }
}

export default Accordion;
