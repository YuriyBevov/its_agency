import { bodyLocker, focusTrap } from "../utils/helpers";
import { sorting } from "./catalog/sorting";

const catalogHeader = document.querySelector('.catalog__content-header');

const select = document.querySelector('.sorting');
const container = document.querySelector('.sorting__items');
const selected = document.querySelector('.sorting__header');
const selectOptions = document.querySelectorAll('.sorting__item');

function refresh() {
  selectOptions.forEach(opt => {
    opt.addEventListener('click', onClickSetActiveOption);
  })

  document.removeEventListener('keydown', onClickCloseSortList);
  document.removeEventListener('click', onClickByOverlayCloseSortList);

  select.classList.add('is-closing');
  bodyLocker(false);
  setTimeout(() => {
    select.classList.remove('is-opened');
    select.classList.remove('is-closing');
    catalogHeader.style.zIndex = '100';
  }, 600);
}

const onClickSetActiveOption = (evt) => {
  sorting(evt.target.dataset.sort);
  selected.innerHTML = evt.target.innerHTML;
  selected.dataset.activeSort = evt.target.dataset.sort;

  refresh();
};

const onClickCloseSortList = (evt) => {
  if(evt.key === 'Escape') {
    refresh();
  }
};

const onClickByOverlayCloseSortList = (evt) => {
  if(evt.target !== container) {
    refresh();
  }
};

const onClickOpenSortList = (evt) => {
  evt.stopPropagation();
  console.log(evt.target.dataset.activeSort)

  select.classList.add('is-opened');
  catalogHeader.style.zIndex = '103';
  bodyLocker(true);
  focusTrap(container);

  selectOptions.forEach(opt => {
    opt.addEventListener('click', onClickSetActiveOption);
  })

  document.addEventListener('keydown', onClickCloseSortList);
  document.addEventListener('click', onClickByOverlayCloseSortList);
}

selected.addEventListener('click', onClickOpenSortList);
