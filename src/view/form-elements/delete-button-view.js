import AbstractView from '../../framework/view/abstract-view';

function createElementTemplate() {
  return `<button class="event__reset-btn"
   type="reset">Delete</button>`;
}

export default class DeleteButtonView extends AbstractView {
  get template() {
    return createElementTemplate();
  }
}
