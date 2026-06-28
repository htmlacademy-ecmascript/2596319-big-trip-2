import Observable from '../framework/observable.js';
import { offersMocks } from './mocks.js';

export default class OffersModel extends Observable {
  #offers = [];

  constructor() {
    super();
    this.#offers = offersMocks;
  }

  get offers() {
    return this.#offers;
  }

  set offers(offers) {
    this.#offers = offers;
  }

  updateOffers(updateType, update) {
    const index = this.#offers.findIndex((offer) => offer.id === update.id);

    this.#offers = [
      ...this.#offers.slice(0, index),
      update,
      ...this.#offers.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
