import { createElement } from '../../render.js';

function createElementTemplate(price) {
  return `<div class="event__field-group  event__field-group--price" bis_skin_checked="1">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
          </div>`;
}

export default class PriceInputView {
  constructor(price) {
    this.price = price;
  }

  getTemplate() {
    return createElementTemplate(this.price);
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
