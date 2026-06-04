import AbstractView from '../../framework/view/abstract-view.js';

function createElementTemplate() {
  return `<button class="event__reset-btn" type="reset">
            Cancel</button>`;
}

export default class CancelButtonView extends AbstractView {
  get template() {
    return createElementTemplate();
  }
}
