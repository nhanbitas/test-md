class BaseComponent {
  constructor(element) {
    this.element = element;
  }

  debug() {
    console.log(this);
  }
}

export default BaseComponent;
