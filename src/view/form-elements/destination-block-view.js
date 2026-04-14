import { createElement } from '../../render.js';

function createElementTemplate(cityDescription) {
  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${cityDescription}</p>
          </section>`;
}

export default class DestinationBlockView {
  constructor(cityDescription) {
    this.cityDescription = cityDescription;
  }

  getTemplate() {
    return createElementTemplate(this.cityDescription);
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
