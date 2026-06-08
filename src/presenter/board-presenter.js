import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import ListView from '../view/form-elements/list-view.js';
import NoEventView from '../view/no-event-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../render.js';
import PointPresenter from './point-presenter.js';

export default class BoardPresenter {
  #pointPresenters = new Map();

  constructor({ boardHeader, boardContainer, pointsModel, destinationsModel, offersModel }) {
    this.boardHeader = boardHeader;
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

    render(new TripInfoView(this.boardPoints, this.offers), this.boardHeader, RenderPosition.AFTERBEGIN);

    render(new SortView(), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    if (this.boardPoints.length === 0) {
      render(new NoEventView(), this.boardContainer);
      return;
    }

    for (const point of this.boardPoints) {
      this.#renderPoint(point);
    }
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter(
      this.listComponent.element,
      this.#handlePointChange,
      this.#handleModeChange
    );

    pointPresenter.init(point, this.destinations, this.offers);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handlePointChange = (updatedPoint) => {
    this.boardPoints = this.boardPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.destinations, this.offers);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetPoint());
  };
}
