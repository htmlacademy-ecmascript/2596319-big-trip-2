import AbstractView from '../../framework/view/abstract-view.js';

function createElementTemplate(pictures) {
  if (!pictures || pictures.length === 0) {
    return '';
  }

  const photosTape = pictures
    .map((picture) => `<img class="event__photo" src="${picture.src}" alt="${picture.description}">`)
    .join('');

  return `<div class="event__photos-container" bis_skin_checked="1">
            <div class="event__photos-tape" bis_skin_checked="1">
              ${photosTape}
            </div>
          </div>`;
}

export default class DestinationPhotosView extends AbstractView {
  #pictures = null;

  constructor(pictures) {
    super();
    this.#pictures = pictures;
  }

  get template() {
    return createElementTemplate(this.#pictures);
  }
}
