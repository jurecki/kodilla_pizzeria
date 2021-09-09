/* global flatpickr  */ // eslint-disable-line no-unused-vars

import { settings, select } from '../settings.js';
import BaseWidget from './BaseWidget.js';
import { utils } from '../utils.js';

class DatePicker extends BaseWidget {
  constructor(wrapper) {
    super(wrapper, utils.dateToStr(new Date()));
    const thisWidget = this;

    thisWidget.dom.input = thisWidget.dom.wrapper.querySelector(
      select.widgets.datePicker.input
    );

    // console.log('INPUT', thisWidget.dom.input);

    thisWidget.initPlugin();

    flatpickr(thisWidget.dom.input, {
      dateFormat: 'Y-m-d',
      defaultDate: thisWidget.minDate,
      minDate: thisWidget.minDate,
      maxDate: thisWidget.maxDate,
      locale: {
        firstDayOfWeek: 1, // start week on Monday
      },
      disable: [
        function (date) {
          // return true to disable
          return date.getDay() === 1;
        },
      ],
      onChange: function (selectedDates, dateStr) {
        thisWidget.value = dateStr;
        // console.log('thisWidget.value', thisWidget.value);
      },
    });

    // console.log('data', thisWidget.value);
  }

  parseValue(value) {
    return value;
  }

  isValid() {
    return true;
  }

  renderValue() {}

  initPlugin() {
    const thisWidget = this;
    thisWidget.minDate = new Date(thisWidget.value);
    thisWidget.maxDate = utils.addDays(
      thisWidget.minDate,
      settings.datePicker.maxDaysInFuture
    );
  }
}

export default DatePicker;
