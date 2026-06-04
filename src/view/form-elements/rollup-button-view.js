import AbstractView from '../../framework/view/abstract-view';

function createElementTemplate() {
  return `<button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>`;
}

export default class RollupButtonView extends AbstractView {
  get template() {
    return createElementTemplate();
  }
}
