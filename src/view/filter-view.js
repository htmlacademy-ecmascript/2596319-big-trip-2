import AbstractView from '../framework/view/abstract-view';

function createSingleElementTemplate(filter, isChecked) {
  const { name, isDisabled } = filter;
  return (
    `<div class="trip-filters__filter">
      <input
        id="filter-${name}"
        class="trip-filters__filter-input  visually-hidden"
        type="radio"
        name="trip-filter"
        value="${name}"
        ${isChecked ? 'checked' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`
  );
}

function createElementTemplate(filters = []) {
  const filterItemsTemplate = filters
    .map((filter, index) => createSingleElementTemplate(filter, index === 0))
    .join('');

  return (
    `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
}

export default class FilterView extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createElementTemplate(this.#filters);
  }
}
