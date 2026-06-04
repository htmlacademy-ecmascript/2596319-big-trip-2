import OfferCheckboxView from './offer-checkbox-view.js';
import AbstractView from '../../framework/view/abstract-view.js';
import { render } from '../../render.js';

function createElementTemplate() {
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers" bis_skin_checked="1">
            </div>
          </section>`;
}

export default class OffersCheckboxesContainerView extends AbstractView {
  #bonuses = null;

  constructor(bonuses) {
    super();
    this.#bonuses = bonuses;

    this.#insertOffers();
  }

  get template() {
    return createElementTemplate();
  }

  #insertOffers() {
    const container = this.element.querySelector('.event__available-offers');

    if (this.#bonuses && Array.isArray(this.#bonuses)) {
      this.#bonuses.forEach((bonus) => {
        render(new OfferCheckboxView(bonus), container);
      });
    }
  }
}
