import { createElement } from '../../render.js';

function createElementTemplate() {
  return '<ul class="trip-events__list"></ul>';
}

export default class ListView {
  getTemplate() {
    return createElementTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
