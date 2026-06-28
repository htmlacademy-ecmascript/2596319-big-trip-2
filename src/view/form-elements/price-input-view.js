import AbstractView from '../../framework/view/abstract-view';

function createElementTemplate(price) {
  return `<div class="event__field-group  event__field-group--price" bis_skin_checked="1">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
          </div>`;
}

export default class PriceInputView extends AbstractView {
  #price = null;

  constructor(price) {
    super();
    this.#price = price;
  }

  get template() {
    return createElementTemplate(this.#price);
  }
}
