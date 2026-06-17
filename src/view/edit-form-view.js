import { BlankPoint } from '../const.js';
import EventTypeView from './form-elements/event-type-view.js';
import DestinationInputView from './form-elements/destination-input-view.js';
import TimeInputView from './form-elements/time-input-view.js';
import PriceInputView from './form-elements/price-input-view.js';
import SaveButtonView from './form-elements/save-button-view.js';
import CancelButtonView from './form-elements/cancel-button-view.js';
import DestinationBlockView from './form-elements/destination-block-view.js';
import RollupButtonView from './form-elements/rollup-button-view.js';
import OffersCheckboxesContainerView from './form-elements/offers-checkboxes-container.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { render } from '../render.js';

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

export default class EditFormView extends AbstractStatefulView {
  #allDestinations = null;
  #allOffers = null;
  #handleFormSubmit = null;
  #handleRollupClick = null;
  #handleFormCancelButtonClick = null;

  constructor(point = BlankPoint, allDestinations, allOffers, { onFormSubmit, onRollupClick, onCancelButtonClick }) {
    super();
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleRollupClick = onRollupClick;
    this.#handleFormCancelButtonClick = onCancelButtonClick;

    this._setState(EditFormView.parsePointToState(point));

    this._restoreHandlers();
  }

  get template() {
    return createElementTemplate();
  }

  _restoreHandlers() {
    this.#renderForm();

    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupClickHandler);
    this.element.querySelector('.event__type-list').addEventListener('change', this.#typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#handleFormCancelButtonClick);
    this.element.querySelectorAll('.event__offer-selector').forEach((checkbox) => checkbox.addEventListener('change', this.#offersChangeHandler));
  }

  #renderForm() {
    const header = this.element.querySelector('.event__header');
    const details = this.element.querySelector('.event__details');

    header.innerHTML = '';
    details.innerHTML = '';

    const currentDestination = this.#allDestinations.find((dest) => dest.id === this._state.destination);
    const offersByType = this.#allOffers.find((opt) => opt.type === this._state.type);
    const description = currentDestination ? currentDestination.description : '';

    render(new EventTypeView(this._state.type), header);
    render(new DestinationInputView(this._state.type, currentDestination, this.#allDestinations), header);
    render(new TimeInputView(this._state.dateFrom, this._state.dateTo), header);
    render(new PriceInputView(this._state.basePrice), header);
    render(new SaveButtonView(), header);
    render(new CancelButtonView(), header);
    render(new RollupButtonView(), header);

    if (offersByType && offersByType.offers && offersByType.offers.length > 0) {
      render(new OffersCheckboxesContainerView(offersByType.offers, this._state.offers), details);
    }

    render(new DestinationBlockView(description), details);
  }

  #typeChangeHandler = (evt) => {
    evt.preventDefault();
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    this.updateElement({
      type: evt.target.value,
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const currentDestination = this.#allDestinations.find((dest) => dest.name === evt.target.value);

    if (!currentDestination) {
      return;
    }

    this.updateElement({
      destination: currentDestination.id
    });
  };

  #offersChangeHandler = (evt) => {
    if (evt.target.tagName !== 'INPUT' || !evt.target.classList.contains('event__offer-checkbox')) {
      return;
    }
    const clickedOfferId = isNaN(evt.target.value) ? evt.target.value : Number(evt.target.value);

    const currentOffers = [...this._state.offers];
    const offerIndex = currentOffers.indexOf(clickedOfferId);

    if (offerIndex === -1) {
      currentOffers.push(clickedOfferId);
    } else {
      currentOffers.splice(offerIndex, 1);
    }

    this.updateElement({
      offers: currentOffers,
    });
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(EditFormView.parseStateToPoint(this._state));
  };

  #rollupClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleRollupClick();
  };

  static parsePointToState(point) {
    return { ...point };
  }

  static parseStateToPoint(state) {
    return { ...state };
  }

  reset(point) {
    this.updateElement(
      EditFormView.parsePointToState(point)
    );
  }
}
