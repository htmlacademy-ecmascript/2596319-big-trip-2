import SortView from '../view/sort-view.js';
import PointView from '../view/point-view.js';
import { render, replace } from '../framework/render.js';
import ListView from '../view/form-elements/list-view.js';
import EditFormView from '../view/edit-form-view.js';

export default class BoardPresenter {
  constructor({ boardContainer, pointsModel, destinationsModel, offersModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.listComponent = new ListView();
    this.boardPoints = [...this.pointsModel.fetchPoints()];
    this.destinations = [...this.destinationsModel.fetchDestinations()];
    this.offers = [...this.offersModel.fetchOffers()];

    render(new SortView(), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    for (const point of this.boardPoints) {
      const destination = this.destinations.find((dest) => dest.id === point.destination);
      const offersByType = this.offers.find((opt) => opt.type === point.type).offers;
      const selectedOffers = offersByType.filter((opt) => point.offers.includes(opt.id));

      this.#renderPoint(point, destination, selectedOffers);
    }
  }

  #renderPoint(point, destination, selectedOffers) {

    const pointComponent = new PointView(point, destination, selectedOffers, {
      onRollupClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const editFormComponent = new EditFormView(point, this.destinations, this.offers, {
      onFormSubmit: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      },
      onRollupClick: () => {
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });


    function replacePointToForm() {
      replace(editFormComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, editFormComponent);
    }

    function escKeyDownHandler(evt) {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    }

    render(pointComponent, this.listComponent.element);
  }
}
