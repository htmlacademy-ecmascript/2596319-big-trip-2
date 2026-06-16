import AbstractView from '../../framework/view/abstract-view';

function createElementTemplate(offer) {
  const {title, price, id, isChecked} = offer;
  return `
    <div class="event__offer-selector">
      <input class="event__offer-checkbox visually-hidden" id="event-offer-${id}" type="checkbox" name="event-offer-${id}" value="${id}" ${isChecked ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${id}">
        <span class="event__offer-title">${title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
      </label>
    </div>`;
}
export default class OfferCheckboxView extends AbstractView {
  #offer = null;

  constructor(offer) {
    super();
    this.#offer = offer;
  }

  get template() {
    return createElementTemplate(this.#offer);
  }
}
