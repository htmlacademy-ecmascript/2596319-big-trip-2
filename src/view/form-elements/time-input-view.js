import AbstractView from '../../framework/view/abstract-view';

function createElementTemplate(dateFrom, dateTo) {
  return `<div class="event__field-group  event__field-group--time" bis_skin_checked="1">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
            —
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
          </div>`;
}

export default class TimeInputView extends AbstractView{
  #dateFrom = null;
  #dateTo = null;

  constructor(dateFrom, dateTo) {
    super();
    this.#dateFrom = dateFrom;
    this.#dateTo = dateTo;
  }

  get template() {
    return createElementTemplate(this.#dateFrom, this.#dateTo);
  }
}
