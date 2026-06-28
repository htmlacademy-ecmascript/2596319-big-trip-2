import AbstractView from '../framework/view/abstract-view.js';

function createElementTemplate(isAddFormOpen) {
  return `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button" ${isAddFormOpen ? 'disabled' : ''}>
            New event</button>`;
}

export default class NewEventButtonView extends AbstractView {
  #isAddFormOpen = false;
  #handleNewEventButtonClick = null;

  constructor({ isAddFormOpen, onNewEventButtonClick }) {
    super();
    this.#isAddFormOpen = isAddFormOpen;
    this.#handleNewEventButtonClick = onNewEventButtonClick;

    this.element.addEventListener('click', this.#newEventButtonClickHandler);
  }

  get template() {
    return createElementTemplate(this.#isAddFormOpen);
  }

  #newEventButtonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleNewEventButtonClick();
  };
}
