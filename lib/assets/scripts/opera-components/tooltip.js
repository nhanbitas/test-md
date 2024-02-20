import BaseComponent from './base-component';
import debounce from '../utils/debounce';
import convertDataToObject from '../utils/convertDataToObject';
import { isHTML } from '../utils/helpers';

const positions = ['top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'];
class Tooltip extends BaseComponent {
  /**
   * Constructs a new instance of the Tooltip class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element, config = {}) {
    super(element);
    this.element = element;
    this.content = null;
    this.isPositionAlreadySet = false;
    this.isActive = false;
    this.dataTooltip = {};
    this.config = config;
    this.delayId = null;
    this.#_init();
  }

  /**
   * Method to show the tooltip
   */
  show() {
    if (!this.content) return;

    /**
     * Function to handle showing the tooltip
     */
    const handleShowTooltip = () => {
      this.element.appendChild(this.content);
      this.#_active();
      this.#_setPosition();
    };

    // Check if there is a delay set for showing the tooltip
    if (this.dataTooltip.delay) {
      this.#_clearDelay();
      this.delayId = setTimeout(() => {
        handleShowTooltip();
      }, this.dataTooltip.delay);
    } else {
      // If no delay is set, show the tooltip immediately
      handleShowTooltip();
    }
  }

  /**
   * Method to hide the tooltip
   */
  hide() {
    // If there's no content to hide, exit early
    if (!this.content) return;

    // Clear any existing delays that might show or hide the content
    this.#_clearDelay();

    // If the content is currently a child of the element, remove it.
    if (this.element.contains(this.content)) {
      this.element.removeChild(this.content);
    }

    this.#_deactive();
    this.#_removePosition();
  }

  /**
   * Initialize the component
   */
  #_init() {
    this.#_initValues();
    this.#_initTooltipContent();
    this.#_initEvents();
    this.#_initUI();
  }

  /**
   * Initialize tooltip content
   */
  #_initTooltipContent() {
    // Check if the content is already set to prevent unnecessary work
    if (this.content !== null) return;
    // Create a new div element that will hold the tooltip content
    const tooltipContent = document.createElement('div');
    tooltipContent.classList.add('tooltip-content');

    // If there's content specified in the config, use it for createTooltip method
    if (this.config.processedContent) {
      const content = this.config.processedContent;
      tooltipContent.appendChild(content);
    } else {
      // If there's no content specified in the config, use the tooltip content from the data-tooltip-content attribute
      const content = this.#_createTooltipByTooltipContent();
      tooltipContent.innerHTML = content ? content : '';
    }

    // Assign the prepared tooltip content to the instance's content property
    tooltipContent.innerHTML && (this.content = tooltipContent);
  }

  /**
   * Initialize tooltip Values
   */
  #_initValues() {
    const currentElementClasses = this.element.classList.value.split(' ');
    this.isPositionAlreadySet = currentElementClasses.some((element) => positions.includes(element));
    this.isActive = this.element.classList.contains('active');
    this.dataTooltip = convertDataToObject(this.element.getAttribute('data-tooltip'));
  }

  /**
   * Initialize tooltip Events
   */
  #_initEvents() {
    // Attach event listeners based on tooltip type
    if (this.dataTooltip.type === 'toggle') {
      this.element.addEventListener('click', () => this.#_handleToggleClick());
    } else {
      this.element.addEventListener('mouseenter', () => this.show());
      this.element.addEventListener('mouseleave', () => this.hide());
    }

    // Debounce the setPosition function to improve performance
    const debounceSetPosition = debounce(() => {
      this.#_removePosition();
      this.#_setPosition();
    }, 100);
    window.addEventListener('scroll', debounceSetPosition);
    window.addEventListener('resize', debounceSetPosition);
  }

  /**
   * Initialize UI
   */
  #_initUI() {
    this.dataTooltip.theme === 'light' && this.element.classList.add('light');
    this.isActive && this.show();
  }

  /**
   * Create a tooltip based on the tooltip content
   * @returns {string} - The tooltip content
   */
  #_createTooltipByTooltipContent() {
    // Get the content from the 'data-tooltip-content' attribute
    const content = this.element.getAttribute('data-tooltip-content');

    // If the content is HTML, return without setting the tooltip content
    if (isHTML(content)) {
      return;
    }

    return content;
  }

  /**
   * Active the element
   */
  #_active() {
    this.element.classList.add('active');
    this.isActive = true;
  }

  /**
   * Deactivate the element
   */
  #_deactive() {
    this.element.classList.remove('active');
    this.isActive = false;
  }

  /**
   * Clears the delay timer if it is active
   */
  #_clearDelay() {
    if (this.delayId) {
      clearTimeout(this.delayId);
    }
  }

  /**
   * Handle the toggle click event
   */
  #_handleToggleClick() {
    if (!this.isActive) {
      this.show();
      /**
       * Event handler for document click.
       *
       * @param {Object} event - The click event object
       * @return {void}
       */
      const documentClickHandler = (event) => {
        if (!this.element.contains(event.target)) {
          this.hide();
          document.removeEventListener('click', documentClickHandler);
        }
      };
      document.addEventListener('click', documentClickHandler);
    }
  }

  /**
   * Set the position
   */
  #_setPosition() {
    if (this.isPositionAlreadySet || !this.isActive) {
      return;
    }
    const newposition = this.#_determinePosition(this.content);
    this.element.classList.add(newposition);
  }

  /**
   * Remove the position classes from the element
   */
  #_removePosition() {
    if (this.isPositionAlreadySet) {
      return;
    }
    // Remove each position class from the element
    positions.forEach((position) => this.element.classList.remove(position));
  }

  /**
   * Determine the position of the target element relative to the viewport
   * @param {Element} target - The target element
   * @returns {string} - The position relative to the viewport
   */
  #_determinePosition(target) {
    // Get the position and dimensions of the target element
    const { left, top, height, width } = target.getBoundingClientRect();

    // Get the dimensions of the viewport
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    // Calculate margins from edges of the viewport
    const marginLeft = left + width / 2;
    const marginRight = viewportWidth - left - width / 2;
    const marginTop = top + height / 2;
    const marginBottom = viewportHeight - top - height / 2;
    const baseMargin = 108; // 108px

    // Determine the position based on margins
    if (marginLeft < baseMargin || marginRight < baseMargin) {
      if (marginLeft > marginRight) {
        if (marginTop > baseMargin) {
          return 'top-left';
        } else if (marginBottom > baseMargin) {
          return 'bottom-left';
        } else {
          return 'left';
        }
      } else {
        if (marginTop > baseMargin) {
          return 'top-right';
        } else if (marginBottom > baseMargin) {
          return 'bottom-right';
        } else {
          return 'right';
        }
      }
    }

    if (marginTop < 108 || marginBottom < 108) {
      return marginTop > marginBottom ? 'top' : 'bottom';
    }

    return 'top';
  }
}

/**
 * Initializes a tooltip for a specified DOM element with optional configuration.
 *
 * @param {Element} element - The target element for the tooltip.
 * @param {Object} config - An object containing optional properties:
 *   @param {string} config.content - The text content of the tooltip.
 *   @param {string} config.position - The position of the tooltip relative to the element.
 *   @param {string} config.type - The type of tooltip.
 *   @param {string} config.theme - The theme of the tooltip.
 *   @param {number} config.delay - The delay in milliseconds before showing the tooltip.
 *   @param {Object} config.btnLeft - An object containing properties for the left button:
 *     @param {string} config.btnLeft.content - The text content of the left button.
 *     @param {string} config.btnLeft.action - The action associated with the left button.
 *     @param {string} config.btnLeft.scrollTarget - The target for scrolling when left button is clicked.
 *     @param {string} config.btnLeft.href - The URL for opening in a new tab when left button is clicked.
 *   @param {Object} config.btnRight - An object containing properties for the right button:
 *     @param {string} config.btnRight.content - The text content of the right button.
 *     @param {string} config.btnRight.action - The action associated with the right button.
 *     @param {string} config.btnRight.scrollTarget - The target for scrolling when right button is clicked.
 *     @param {string} config.btnRight.href - The URL for opening in a new tab when right button is clicked.
 * @return {Tooltip|null} The Tooltip instance or null if element is not provided.
 */
export const createTooltip = (
  element,
  config = {
    type: '',
    theme: '',
    position: '',
    delay: 0,
    content: '',
    btnLeft: {
      content: '',
      action: 'dismiss',
      scrollTarget: '',
      href: '',
    },
    btnRight: {
      content: '',
      action: 'dismiss',
      scrollTarget: '',
      href: '',
    },
  },
) => {
  if (!element || !config.content || isHTML(config.content)) return null;

  document.addEventListener('DOMContentLoaded', () => {
    // Add 'tooltip' class to the element
    element.classList.add('tooltip');
    config.theme && element.classList.add(config.theme);
    config.position && element.classList.add(config.position);

    // Prepare data-tooltip attributes
    let dataTooltip = [];
    config.type && dataTooltip.push(`type:${config.type}`);
    config.delay && dataTooltip.push(`delay:${config.delay}`);
    element.setAttribute('data-tooltip', dataTooltip.join(' '));

    // Create new content element and set its innerHTML
    const newContent = document.createElement('div');
    config.content && (newContent.innerHTML += config.content);

    /**
     * Runs the specified action based on the input parameter.
     *
     * @param {string} action - The action to be executed.
     */
    const executeAction = (action) => {
      if (!action) return;

      // Dismiss action
      if (action === 'dismiss') element._instance.hide();

      // Scroll to action
      if (action === 'scrollTo') {
        const target = config.btnLeft?.scrollTarget || config.btnRight?.scrollTarget;
        target && document.querySelector(`#${target}`).scrollIntoView({ behavior: 'smooth' });
        element._instance.hide();
      }

      // Open new tab action
      if (action === 'openNewTab') {
        const href = config.btnLeft?.href || config.btnRight?.href;
        href && window.open(href, '_blank');
        element._instance.hide();
      }
    };

    /**
     * Adds a button to the specified container with the given configuration.
     *
     * @param {Object} btnConfig - The configuration for the button
     * @param {string} className - The class name for the button
     * @param {HTMLElement} container - The container to which the button will be added
     */
    const addButton = (btnConfig, className, container) => {
      if (btnConfig?.content && !isHTML(btnConfig.content)) {
        const button = document.createElement('button');
        button.classList.add(className);
        button.innerHTML = btnConfig.content;
        button.addEventListener('click', (e) => {
          e.stopPropagation();
          executeAction(btnConfig.action);
        });
        container.appendChild(button);
      }
    };

    // Add left and right buttons if provided in the configuration
    if (config.btnLeft || config.btnRight) {
      newContent.innerHTML += '<span class="breakline"></span>';
      const actions = document.createElement('div');
      actions.classList.add('actions');

      // Add left and right buttons to the actions container
      addButton(config.btnLeft, 'btn-left', actions);
      addButton(config.btnRight, 'btn-right', actions);

      // Add the actions container to the new content
      newContent.appendChild(actions);
    }

    // Set the content of the configuration to the new content element
    config.processedContent = newContent;

    // Create a new Tooltip instance and attach it to the element
    element._instance = new Tooltip(element, config);
  });
};

export default Tooltip;
