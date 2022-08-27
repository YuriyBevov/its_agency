import { bodyLocker, focusTrap } from "../utils/helpers";
const catalogHeader = document.querySelector('.catalog__content-header');
const sort = document.querySelector('.sorting');
const container = document.querySelector('.sorting__items');
const header = document.querySelector('.sorting__header');
const items = document.querySelectorAll('.sorting__item');

function refresh() {
  items.forEach(item => {
    item.addEventListener('click', onClickSetActiveOption);
  })

  document.removeEventListener('keydown', onClickCloseSortList);
  document.removeEventListener('click', onClickByOverlayCloseSortList);

  sort.classList.add('is-closing');
  bodyLocker(false);
  setTimeout(() => {
    sort.classList.remove('is-opened');
    sort.classList.remove('is-closing');
    catalogHeader.style.zIndex = '100';
  }, 600);
}

const onClickSetActiveOption = (evt) => {
  catalogSorting(evt.target.dataset.sort);
  header.innerHTML = evt.target.innerHTML;

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

  sort.classList.add('is-opened');
  catalogHeader.style.zIndex = '103';
  bodyLocker(true);
  focusTrap(container);

  items.forEach(item => {
    item.addEventListener('click', onClickSetActiveOption);
  })

  document.addEventListener('keydown', onClickCloseSortList);
  document.addEventListener('click', onClickByOverlayCloseSortList);
}

header.addEventListener('click', onClickOpenSortList);

function catalogSorting(type) { //вынести логику в отдельный модуль
  console.log(type);
}
