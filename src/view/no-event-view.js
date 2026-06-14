import { Texts } from '../const.js';
import AbstractView from '../framework/view/abstract-view';

function createElementTemplate(filterType) {
  const noEventText = Texts[filterType] || Texts.EVERYTHING;
  return `<p class="trip-events__msg">${noEventText}</p>`;
}

export default class NoEventView extends AbstractView {
  #filterType = null;

  constructor(filterType = 'everything') {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createElementTemplate(this.#filterType);
  }
}
