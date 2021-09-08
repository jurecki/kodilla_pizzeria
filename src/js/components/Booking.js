import { templates, select } from '../settings.js';
import AmountWidget from './AmountWidget.js';

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
  }

  initWidget() {
    const thisBooking = this;

    thisBooking.peopleAmount = new AmountWidget(thisBooking.dom.peopleAmount);
    thisBooking.hoursAmount = new AmountWidget(thisBooking.dom.hoursAmount);
  }
}

export default Booking;
