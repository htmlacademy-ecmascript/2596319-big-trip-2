import OfferCheckboxView from './offer-checkbox-view.js';
import { render } from '../../render.js';
import { createElement } from '../../render.js';

function createElementTemplate() {
  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers" bis_skin_checked="1">
            </div>
          </section>`;
}

export default class OffersCheckboxesContainerView {
  constructor(bonuses) {
    this.bonuses = bonuses;
  }

  getTemplate() {
    return createElementTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.insertOffers();
    }
    return this.element;
  }

  insertOffers() {
    const container = this.element.querySelector('.event__available-offers');
    if (this.bonuses && Array.isArray(this.bonuses)) {
      this.bonuses.forEach((bonus) => {
        render(new OfferCheckboxView(bonus), container);
      });
    }
  }
}
