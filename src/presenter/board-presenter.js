import SortView from '../view/sort-view.js';
import { render } from '../framework/render.js';
import ListView from '../view/form-elements/list-view.js';
import NoEventView from '../view/no-event-view.js';
import TripInfoView from '../view/trip-info-view.js';
import { RenderPosition } from '../render.js';
import PointPresenter from './point-presenter.js';
import { sortPointsByDay, sortPointsByTime, sortPointsByPrice } from '../utils.js';
import { SortType } from '../const.js';

export default class BoardPresenter {
  #pointPresenters = new Map();
  #currentSortType = SortType.DAY;
  #defaultOrderedBoardPoints = [];

  constructor({ boardHeader, boardContainer, pointsModel, destinationsModel, offersModel }) {
    this.boardHeader = boardHeader;
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.listComponent = new ListView();

    this.boardPoints = [...this.pointsModel.fetchPoints()].sort(sortPointsByDay);
    this.#defaultOrderedBoardPoints = [...this.pointsModel.fetchPoints()];
    this.destinations = [...this.destinationsModel.fetchDestinations()];
    this.offers = [...this.offersModel.fetchOffers()];

    render(new TripInfoView(this.boardPoints, this.offers), this.boardHeader, RenderPosition.AFTERBEGIN);

    render(new SortView({ onSortTypeChange: this.#handleSortTypeChange }), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    if (this.boardPoints.length === 0) {
      render(new NoEventView(), this.boardContainer);
      return;
    }

    this.#renderPoints();
  }

  #renderPoints() {
    for (const point of this.boardPoints) {
      this.#renderPoint(point);
    }
  }

  #clearPointList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
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

  #sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY:
        this.boardPoints.sort(sortPointsByDay);
        break;
      case SortType.TIME:
        this.boardPoints.sort(sortPointsByTime);
        break;
      case SortType.PRICE:
        this.boardPoints.sort(sortPointsByPrice);
        break;
      default:
        this.boardPoints = [...this.#defaultOrderedBoardPoints].sort(sortPointsByDay);
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointList();
    this.#renderPoints();
  };

  #handlePointChange = (updatedPoint) => {
    this.boardPoints = this.boardPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);
    this.#defaultOrderedBoardPoints = this.#defaultOrderedBoardPoints.map((point) => point.id === updatedPoint.id ? updatedPoint : point);

    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint, this.destinations, this.offers);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetPoint());
  };
}
