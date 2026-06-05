import AbstractView from '../framework/view/abstract-view';

const Texts = {
  EVERYTHING: 'Click New Event to create your first point',
  PAST: 'There are no past events now',
  PRESENT: 'There are no present events now',
  FUTURE: 'There are no future events now',
};


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
