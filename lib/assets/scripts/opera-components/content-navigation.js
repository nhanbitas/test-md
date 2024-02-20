import { doc } from 'prettier';
import BaseComponent from './base-component';

class ContentNavigation extends BaseComponent {
  constructor(element) {
    super(element);
    this.element = element;
    this.anchors = document.querySelectorAll('[class~="anchor"]');
    this.main = document.querySelector('main');
    this.clickHandler = this.#_handleClick.bind(this);
    this.links = this.#_createLinks();
    this.#_init();
  }

  #_init() {
    this.#_createNavigation();
    this.#_createIntersectionObserver();
  }

  #_createLinks() {
    let links = [];
    this.anchors.forEach((anchor) => {
      const li = document.createElement('li');
      const button = document.createElement('button');
      const span = document.createElement('span');
      span.textContent = anchor.textContent;
      button.appendChild(span);
      li.setAttribute('aria-label', anchor.textContent);
      li.classList.add('anchor-link');
      if (anchor.classList.contains('heading')) {
        li.classList.add('heading');
      }
      button.addEventListener('click', this.clickHandler);
      li.appendChild(button);
      links.push(li);
    });
    return links;
  }

  #_createNavigation() {
    const ul = document.createElement('ul');
    this.links.forEach((link) => {
      ul.appendChild(link);
    });

    this.element.appendChild(ul);
  }

  #_handleClick(event) {
    this.anchors.forEach((anchor) => {
      if (anchor.textContent === event.target.textContent) {
        this.main.scrollTo({ top: anchor.offsetTop - this.main.offsetTop - 12, behavior: 'smooth' });
      }
    });
  }

  #_createIntersectionObserver() {
    const observer = new IntersectionObserver(this.#_handleIntersection, {
      root: this.main,
      rootMargin: '0px 0px -96% 0px',
      threshold: 0,
    });
    this.anchors.forEach((anchor) => {
      observer.observe(anchor);
    });
  }

  #_handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[class~="anchor-link"]').forEach((link) => {
          link.classList.remove('active');
        });
        document
          .querySelector(`[class~="anchor-link"][aria-label="${entry.target.textContent}"]`)
          .classList.add('active');
      }
    });
  }
}

export default ContentNavigation;
