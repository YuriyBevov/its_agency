/*import { initialMockData } from "../../utils/mockData";
import { ls, catalogStorageField } from "../../utils/localStorageHelper";
import { sorting } from "./sorting";

const filters = document.querySelectorAll('.filter__item input');

const onClickActivateFiltration = (evt) => {
  let mock = initialMockData;
  let currentSortType = document.querySelector('.sorting__header').dataset.activeSort;

  filters.forEach(filter => {
    let type = filter.dataset.type;
    if(filter.checked) {
      if(type === 'available') {
        mock = mock.filter(item => !!item.isAvailable);
      }
      if(type === 'new') {
        const days = 180;
        const interval = days * 24 * 60 * 60 * 1000;

        mock = mock.filter(item => new Date(item.dateFrom) > (new Date() - interval) );
      }

      if(type === 'contract') {
        mock = mock.filter(item => !!item.isContract);
      }

      if(type === 'exclusive') {
        mock = mock.filter(item => !!item.isExclusive);
      }

      if(type === 'sale') {
        mock = mock.filter(item => !!item.isSale);
      }
    }
  })

  ls('update', catalogStorageField, mock);
  sorting(currentSortType);
}

export function initCatalogFilter() {
  filters.forEach(filter => {
    filter.addEventListener('click', onClickActivateFiltration);
  })
}*/
