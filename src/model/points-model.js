import { pointsMocks } from './mocks.js';

export default class PointsModel {
  constructor() {
    this.points = pointsMocks;
  }

  fetchPoints() {
    return this.points;
  }
}
