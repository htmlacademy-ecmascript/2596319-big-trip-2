import EventTypeView from './form-elements/event-type-view.js';
import DestinationInputView from './form-elements/destination-input-view.js';
import TimeInputView from './form-elements/time-input-view.js';
import PriceInputView from './form-elements/price-input-view.js';
import SaveButtonView from './form-elements/save-button-view.js';
import CancelButtonView from './form-elements/cancel-button-view.js';
import DestinationBlockView from './form-elements/destination-block-view.js';
import RollupButtonView from './form-elements/rollup-button-view.js';
import OffersCheckboxesContainerView from './form-elements/offers-checkboxes-container.js';
import { render, createElement } from '../render.js';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

function createElementTemplate() {
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header"></header>
        <section class="event__details"></section>
      </form>
    </li>`
  );
}

export default class EditFormView {
  constructor(point = BLANK_POINT, allDestinations, allOffers) {
    this.point = point;
    this.allDestinations = allDestinations;
    this.allOffers = allOffers;
  }

  getTemplate() {
    return createElementTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.renderForm();
    }
    return this.element;
  }

  renderForm() {
    const header = this.element.querySelector('.event__header');
    const details = this.element.querySelector('.event__details');


    const currentDestination = this.allDestinations.find((dest) => dest.id === this.point.destination);
    const offersByType = this.allOffers.find((opt) => opt.type === this.point.type);
    const description = currentDestination ? currentDestination.description : '';

    render(new EventTypeView(this.point.type), header);
    render(new DestinationInputView(this.point.type, currentDestination, this.allDestinations), header);
    render(new TimeInputView(this.point.dateFrom, this.point.dateTo), header);
    render(new PriceInputView(this.point.basePrice), header);
    render(new SaveButtonView(), header);
    render(new CancelButtonView(), header);
    render(new RollupButtonView(), header);

    render(new OffersCheckboxesContainerView(offersByType.offers, this.point.offers), details);
    render(new DestinationBlockView(description), details);
  }

  removeElement() {
    this.element = null;
  }
}
