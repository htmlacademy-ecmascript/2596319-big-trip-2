import { destinationsMocks } from './mocks.js';

export default class DestinationsModel {
  constructor() {
    this.destinations = destinationsMocks;
  }

  fetchDestinations() {
    return this.destinations;
  }
}
