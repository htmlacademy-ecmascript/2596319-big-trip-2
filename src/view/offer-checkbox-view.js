import { createElement } from '../render.js';

function createElementTemplate(offer) {
  const {title, price, id} = offer; // Ось тут була помилка, бо offer був undefined
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}">
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}
export default class OfferCheckboxView {
  constructor(offer) {
    this.offer = offer;
  }

  getTemplate() {
    return createElementTemplate(this.offer);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }
}
