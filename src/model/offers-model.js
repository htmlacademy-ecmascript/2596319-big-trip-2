import { offersMocks } from './mocks.js';

export default class OffersModel {
  constructor() {
    this.offers = offersMocks;
  }

  fetchOffers() {
    return this.offers;
  }
}
