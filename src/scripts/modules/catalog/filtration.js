import { sorting } from "./sorting";
import { mock } from "../../utils/mockData";
import { ls, catalogStorageField } from "../../utils/sessionStorageHelper";

const filters = document.querySelectorAll('.filter__item input');

const onClickStartFiltration = () => {
  const currentSortType = document.querySelector('.sorting__header').dataset.activeSort;
  let catalogItems = mock;

  filters.forEach(filter => {
    let type = filter.dataset.type;

    if(filter.checked) {

      if(type === 'available') {
        catalogItems = catalogItems.filter(item => !!item.isAvailable);
      };

      if(type === 'new') {
        const days = 180;
        const interval = days * 24 * 60 * 60 * 1000;
        catalogItems = catalogItems.filter(item => new Date(item.dateFrom) > (new Date() - interval) );
      };

      if(type === 'contract') {
        catalogItems = catalogItems.filter(item => !!item.isContract);
      };

      if(type === 'exclusive') {
        catalogItems = catalogItems.filter(item => !!item.isExclusive);
      };

      if(type === 'sale') {
        catalogItems = catalogItems.filter(item => !!item.isSale);
      };

    };
  });

  ls('update', catalogStorageField, catalogItems);
  sorting(currentSortType, catalogItems);
};

export function initCatalogFilter() {
  filters.forEach(filter => {
    filter.addEventListener('click', onClickStartFiltration);
  })
};
