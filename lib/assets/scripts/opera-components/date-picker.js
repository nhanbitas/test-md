import BaseComponent from './base-component';
import ContainedLabel from './contained-label';
import flatpickr from 'flatpickr';
import rangePlugin from 'flatpickr/dist/plugins/rangePlugin';
import { Vietnamese } from 'flatpickr/dist/l10n/vn.js';

class DatePicker extends BaseComponent {
  /**
   * Constructs a new instance of the DatePicker class.
   * @constructor
   * @param {Element} element - the element to be passed to the constructor
   */
  constructor(element) {
    super(element);
    this.element = element;
    this.calendarButton = this.#_createCalendarButton();
    this.datePickerWrapper = this.#_createDatePickerWrapper();
    this.containedLabel = null;
    this.containedLabelText = this.element.getAttribute('data-label');
    this.secondRangeInput = null;
    this.hasDatePicker = this.element.getAttribute('data-date-picker') !== null;
    this.#_init();
  }

  #_init() {
    if (this.containedLabelText) {
      this.containedLabel = new ContainedLabel(
        this.element,
        this.containedLabelText,
        this.datePickerWrapper
      );
    }
    if (this.hasDatePicker) {
      flatpickr(
        '#' + this.element.id,
        this.#_setConfigOptions(this.#_parseConfigOptions())
      );
    }
  }

  #_createDatePickerWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('date-picker-wrapper');
    this.element.parentNode.insertBefore(wrapper, this.element);
    wrapper.appendChild(this.element);
    wrapper.appendChild(this.calendarButton);
    return wrapper;
  }

  #_createCalendarButton() {
    const button = document.createElement('button');
    const icon = document.createElement('i');
    button.setAttribute('type', 'button');
    button.classList.add('date-picker-calendar-button');
    icon.classList.add('far', 'fa-calendar');
    button.appendChild(icon);

    return button;
  }

  #_parseConfigOptions() {
    const string = this.element.getAttribute('data-date-picker');
    const array = string.split(' ');
    return array;
  }

  #_setConfigOptions(array) {
    const config = {
      locale: Vietnamese,
      dateFormat: 'd/m/Y',
      closeOnSelect: false,
      disableMobile: true,
      allowInput: false,
      onValueUpdate: (selectedDates, dateStr, instance) => {
        this.secondRangeInput?._instance.containedLabelInstance?.handleEvent();
        this.containedLabel?.handleEvent();
      },
      onChange: (selectedDates, dateStr, instance) => {
        if (this.secondRangeInput && selectedDates.length < 2) {
          this.secondRangeInput.value = '';
        }
        this.secondRangeInput?._instance.containedLabelInstance?.handleEvent();
        this.containedLabel?.handleEvent();
      },
      onClose: (selectedDates, dateStr, instance) => {
        if (this.secondRangeInput && this.secondRangeInput.value.length === 0) {
          instance.clear(false, false);
        }
        this.secondRangeInput?._instance.containedLabelInstance?.handleEvent();
        this.containedLabel?.handleEvent();
      },
    };

    array.forEach((value) => {
      if (value === 'allowInput') {
        config.allowInput = true;
      } else if (value === 'enableMobile') {
        config.disableMobile = false;
      } else if (value === 'time') {
        config.enableTime = true;
        config.dateFormat = 'd/m/Y H:i';
      } else if (value === 'timeWithSeconds') {
        config.enableTime = true;
        config.enableSeconds = true;
        config.dateFormat = 'd/m/Y H:i:S';
      } else if (value === 'weekNumbers') {
        config.weekNumbers = true;
      } else if (value === 'closeOnSelect') {
        config.closeOnSelect = true;
      } else if (
        value.startsWith('range') &&
        document.querySelector(value.substring(5)) !== null
      ) {
        this.secondRangeInput = document.querySelector(value.substring(5));
        config.plugins = [new rangePlugin({ input: `${value.substring(5)}` })];
      } else if (value.startsWith('showMonths')) {
        if (parseInt(value.substring(10)) > 0) {
          config.showMonths = parseInt(value.substring(10));
        }
      }
    });

    return config;
  }
}

export default DatePicker;
