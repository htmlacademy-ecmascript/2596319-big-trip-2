import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { render } from './render.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const siteFilters = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});

render(new FilterView(), siteFilters);

boardPresenter.init();
