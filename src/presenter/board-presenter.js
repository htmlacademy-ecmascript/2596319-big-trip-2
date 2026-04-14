import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';

export default class BoardPresenter {
  listElement = null;

  listComponent = {
    getElement: () => {
      if (!this.listElement) {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'trip-events__list';
      }
      return this.listElement;
    }
  };

  constructor({ boardContainer, pointsModel }) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.destinations = [...this.pointsModel.getDestinations()];
    this.offers = [...this.pointsModel.getOffers()];

    render(new SortView(), this.boardContainer);
    render(this.listComponent, this.boardContainer);

    render(new EditFormView(
      this.boardPoints[0],
      this.destinations,
      this.offers
    ), this.listComponent.getElement());

    for (let i = 0; i < this.boardPoints.length; i++) {
      const point = this.boardPoints[i];
      const destination = this.destinations.find((dest) => dest.id === point.destination);
      const offersByType = this.offers.find((opt) => opt.type === point.type).offers;
      const selectedOffers = offersByType.filter((opt) => point.offers.includes(opt.id));

      render(new PointView(point, destination, selectedOffers), this.listComponent.getElement());
    }
  }
}
