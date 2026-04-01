import { createElement } from '../../render.js';

function createElementTemplate() {
  return `<button class="event__reset-btn"
   type="reset">Cancel</button>`;
}

export default class CancelButtonView {
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
