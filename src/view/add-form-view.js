import EventTypeView from './form-elements/event-type-view.js';
import DestinationInputView from './form-elements/destination-input-view.js';
import TimeInputView from './form-elements/time-input-view.js';
import PriceInputView from './form-elements/price-input-view.js';
import SaveButtonView from './form-elements/save-button-view.js';
import CancelButtonView from './form-elements/cancel-button-view.js';
import DestinationBlockView from './form-elements/destination-block-view.js';
import RollupButtonView from './form-elements/rollup-button-view.js';
import OffersCheckboxesContainerView from './form-elements/offers-checkboxes-container.js';
import DestinationPhotosView from './form-elements/destination-photos-view.js';
import { render } from '../render.js';
import { offersMocks } from '../model/mocks.js';

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
    const offersComponent = new OffersCheckboxesContainerView(offersMocks);
    render(offersComponent, details);
    render(new DestinationBlockView(), details);
    render(new DestinationPhotosView(), details);
  }
}
