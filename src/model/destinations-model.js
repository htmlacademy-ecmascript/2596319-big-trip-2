import Observable from '../framework/observable.js';
import { destinationsMocks } from './mocks.js';

export default class DestinationsModel extends Observable {
  #destinations = [];

  constructor() {
    super();
    this.#destinations = destinationsMocks;
  }

  get destinations() {
    return this.#destinations;
  }

  set destinations(destinations) {
    this.#destinations = destinations;
  }

  updateDestination(updateType, update) {
    const index = this.#destinations.find((dest) => dest.id === update.id);

    this.#destinations = [
      ...this.#destinations.slice(0, index),
      update,
      ...this.#destinations.slice(index + 1),
    ];

    this._notify(updateType, update);
  }
}
