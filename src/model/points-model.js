import { pointsMocks, destinationsMocks, offersMocks } from './mocks.js';

export default class PointsModel {
  constructor() {
    this.points = pointsMocks;
    this.destinations = destinationsMocks;
    this.offers = offersMocks;
  }

  getPoints() {
    return this.points;
  }

  getDestinations() {
    return this.destinations;
  }

  getOffers() {
    return this.offers;
  }
}
