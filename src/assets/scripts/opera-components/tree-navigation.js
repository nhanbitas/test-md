import BaseComponent from './base-component';

class TreeNavigation extends BaseComponent {
  constructor(element) {
    super(element);
    this.element = element;
    this.buttonClickHandler = this.#_handleButtonClick.bind(this);
    this.#_init();
  }

  #_init() {
    this.#_appendButtons();
    this.element.querySelectorAll('.tree-navigation-item:not(.expanded)').forEach((treeItem) => {
      const button = treeItem.firstElementChild;
      if (!button.classList.contains('terminal')) {
        treeItem.classList.add('expanded');
      }
    });
  }

  #_appendButtons() {
    const treeItems = this.element.querySelectorAll('.tree-navigation-item');
    treeItems.forEach((treeItem) => {
      const hasChildren = treeItem.querySelector('.tree-navigation-item') !== null;
      const treeItemContent = treeItem.querySelector('span');
      const button = this.#_createButton(hasChildren);
      button.appendChild(treeItemContent);
      treeItem.insertBefore(button, treeItem.firstChild);
    });
  }

  #_createButton(hasChildren) {
    const button = document.createElement('button');
    const icon = document.createElement('i');

    button.classList.add('tree-navigation-item-button');
    button.setAttribute('type', 'button');
    button.appendChild(icon);

    if (hasChildren) {
      icon.classList.add('far', 'fa-chevron-right');
    } else {
      icon.classList.add('far', 'fa-minus');
      button.classList.add('terminal');
    }

    button.addEventListener('click', this.buttonClickHandler);

    return button;
  }

  #_handleButtonClick(event) {
    const button = event.target.closest('.tree-navigation-item-button');
    if (
      (event.target.nodeName === 'svg' || event.target.tagName === 'path') &&
      !button.classList.contains('terminal')
    ) {
      button.parentNode.classList.toggle('expanded');
      button.parentNode.querySelectorAll('.tree-navigation-item').forEach((child) => {
        child.classList.toggle('hidden');
        return;
      });
    }
    this.element.querySelectorAll('.tree-navigation-item-button').forEach((btn) => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
  }
}

export default TreeNavigation;
