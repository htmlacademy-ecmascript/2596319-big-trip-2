import EventTypeView from './event-type-view.js';
import DestinationInputView from './destination-input-view.js';
import TimeInputView from './time-input-view.js';
import PriceInputView from './price-input-view.js';
import SaveButtonView from './save-button-view.js';
import CancelButtonView from './cancel-button-view.js';
import DestinationBlockView from './destination-block-view.js';
import RollupButtonView from './rollup-button-view.js';
import OffersCheckboxesContainerView from './offers-checkboxes-container.js';
import DestinationPhotosView from './destination-photos-view.js';
import { render } from '../render.js';

const offers = [
  {
    title: 'Add luggage',
    price: '30',
    id: 'luggage-1'
  },
  {
    title: 'Switch to comfort class',
    price: '100',
    id: 'comfort-1'
  },
  {
    title: 'Add meal',
    price: '15',
    id: 'meal-1'
  },
  {
    title: 'Choose seats',
    price: '5',
    id: 'seats-1'
  },
  {
    title: 'Travel by train',
    price: '40',
    id: 'train-1'
  },
];

function createElementTemplate() {
  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header"></header>
        <section class="event__details">
          </section>
      </form>
    </li>`
  );
}
export default class AddFormView {
  constructor(offers) {
    this.offers = offers;
  }

  getTemplate() {
    return createElementTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = this.createElement(this.getTemplate());
      this.renderForm();
    }
    return this.element;
  }

  createElement(template) {
    const newElement = document.createElement('div');
    newElement.innerHTML = template;
    return newElement.firstElementChild;
  }

  renderForm() {
    const header = this.element.querySelector('.event__header');
    const details = this.element.querySelector('.event__details');

    render(new EventTypeView(), header);
    render(new DestinationInputView(), header);
    render(new TimeInputView(), header);
    render(new PriceInputView(), header);
    render(new SaveButtonView(), header);
    render(new CancelButtonView(), header);
    render(new RollupButtonView(), header);
    const offersComponent = new OffersCheckboxesContainerView(offers);
    render(offersComponent, details);
    render(new DestinationBlockView(), details);
    render(new DestinationPhotosView(), details);
  }
}
