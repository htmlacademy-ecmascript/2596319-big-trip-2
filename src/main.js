import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import PointsModel from './model/points-model.js';
import { render } from './render.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const FILTERS = [
  { name: 'everything', isDisabled: false },
  { name: 'future', isDisabled: true },
  { name: 'present', isDisabled: true },
  { name: 'past', isDisabled: false }
];

const siteFilters = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');
const siteHeaderElement = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const boardPresenter = new BoardPresenter({
  boardHeader: siteHeaderElement,
  boardContainer: siteMainElement,
  pointsModel: pointsModel,
  destinationsModel: destinationsModel,
  offersModel: offersModel
});
//1
render(new FilterView(FILTERS), siteFilters);

boardPresenter.init();
