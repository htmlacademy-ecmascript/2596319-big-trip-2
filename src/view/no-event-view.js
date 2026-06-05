import AbstractView from '../framework/view/abstract-view';

const TEXTS = {
  everything: 'Click New Event to create your first point',
  past: 'There are no past events now',
  present: 'There are no present events now',
  future: 'There are no future events now'
};

function createElementTemplate(filterType) {
  const noEventText = TEXTS[filterType] || TEXTS.everything;
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
