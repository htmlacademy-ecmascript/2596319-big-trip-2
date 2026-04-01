import FilterView from './view/filter-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import { render } from './render.js';

const siteFilters = document.querySelector('.trip-controls__filters');
const siteMainElement = document.querySelector('.trip-events');

const boardPresenter = new BoardPresenter({
  boardContainer: siteMainElement
});

render(new FilterView(), siteFilters);

boardPresenter.init();
