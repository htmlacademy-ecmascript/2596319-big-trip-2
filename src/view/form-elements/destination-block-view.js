import AbstractView from '../../framework/view/abstract-view.js';

function createElementTemplate(cityDescription) {
  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${cityDescription}</p>
          </section>`;
}

export default class DestinationBlockView extends AbstractView {
  #cityDescription = null;

  constructor(cityDescription) {
    super();
    this.#cityDescription = cityDescription;
  }

  get template() {
    return createElementTemplate(this.#cityDescription);
  }
}
