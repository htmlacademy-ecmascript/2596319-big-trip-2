import SortView from '../view/sort-view.js';
import EditFormView from '../view/edit-form-view.js';
import PointView from '../view/point-view.js';
import { render } from '../render.js';
import AddFormView from '../view/add-form-view.js';

export default class BoardPresenter {
  listComponent = {
    getElement: () => {
      if (!this.listElement) {
        this.listElement = document.createElement('ul');
        this.listElement.className = 'trip-events__list';
      }
      return this.listElement;
    }
  };

  constructor({ boardContainer }) {
    this.boardContainer = boardContainer;
  }

  init() {
    render(new SortView(), this.boardContainer);
    render(this.listComponent, this.boardContainer);
    render(new EditFormView(), this.listComponent.getElement());
    render(new AddFormView(), this.listComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new PointView(), this.listComponent.getElement());
    }
  }
}
