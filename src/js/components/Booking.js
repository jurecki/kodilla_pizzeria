import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';
import DatePicker from './DatePicker.js';
import HourPicker from './HourPicker.js';

class Booking {
  constructor(booking) {
    const thisBooking = this;

    thisBooking.render(booking);
    thisBooking.initWidget();
  }

  render(bookingWrapper) {
    const thisBooking = this;

    const html = templates.bookingWidget();
    thisBooking.dom = {};

    thisBooking.dom.wrapper = bookingWrapper;

    bookingWrapper.innerHTML = html;

    thisBooking.dom.peopleAmount = bookingWrapper.querySelector(
      select.booking.peopleAmount
    );

    thisBooking.dom.hoursAmount = bookingWrapper.querySelector(
      select.booking.hoursAmount
    );

    thisBooking.dom.datePicker = bookingWrapper.querySelector(
      select.widgets.datePicker.wrapper
    );

    thisBooking.dom.hourPicker = bookingWrapper.querySelector(
      select.widgets.hourPicker.wrapper
    );
  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
    thisBooking.datePicker = new DatePicker(thisBooking.dom.datePicker);
    thisBooking.hourPicker = new HourPicker(thisBooking.dom.hourPicker);
  }
}

export default Booking;
