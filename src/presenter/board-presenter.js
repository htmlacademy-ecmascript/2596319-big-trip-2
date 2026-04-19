import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';
import ListView from '../view/form-elements/list-view.js';

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

    render(new EditFormView(
      this.boardPoints[0],
      this.destinations,
      this.offers
    ), this.listComponent.getElement());

    for (const point of this.boardPoints) {
      const destination = this.destinations.find((dest) => dest.id === point.destination);
      const offersByType = this.offers.find((opt) => opt.type === point.type).offers;
      const selectedOffers = offersByType.filter((opt) => point.offers.includes(opt.id));

      render(new PointView(point, destination, selectedOffers), this.listComponent.getElement());
    }
  }
}
