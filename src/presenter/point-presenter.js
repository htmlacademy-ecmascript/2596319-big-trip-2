import PointView from '../view/point-view.js';
import EditFormView from '../view/edit-form-view.js';
import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #container = null;
  #changeData = null;
  #changeMode = null;

  #point = null;
  #destinations = [];
  #offers = [];

  #pointComponent = null;
  #pointEditComponent = null;
  #mode = Mode.DEFAULT;

  constructor(container, changeData, changeMode) {
    this.#container = container;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init(point, destinations, offers) {
    this.#point = point;
    this.#destinations = destinations;
    this.#offers = offers;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    const destination = this.#destinations.find((dest) => dest.id === point.destination);
    const offersByType = this.#offers.find((opt) => opt.type === point.type).offers;
    const selectedOffers = offersByType.filter((opt) => point.offers.includes(opt.id));

    this.#pointComponent = new PointView(point, destination, selectedOffers, {
      onRollupClick: this.#handleRollupClick,
      onFavoriteClick: this.#handleFavoriteClick,
    });

    this.#pointEditComponent = new EditFormView(this.#point, this.#destinations, this.#offers, {
      onFormSubmit: this.#handleFormSubmit,
      onRollupClick: this.#handleFormRollupClick,
      onEditModeEnter: this.#handleRollupClick,
      onCancelButtonClick: this.#handleFormCancelButtonClick
    });

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetPoint() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm() {
    this.#changeMode();
    this.#pointEditComponent.initDatepickers();
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint() {
    this.#pointEditComponent.reset(this.#point);
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleRollupClick = () => {
    this.#replacePointToForm();
  };

  #handleFormSubmit = (updatedPoint) => {
    this.#changeData(updatedPoint);
    this.#replaceFormToPoint();
  };

  #handleFormRollupClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFormCancelButtonClick = () => {
    this.#replaceFormToPoint();
  };

  #handleFavoriteClick = () => {
    this.#changeData({
      ...this.#point,
      isFavorite: !this.#point.isFavorite
    });
  };
}
