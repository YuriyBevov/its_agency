import { init as catalogInit } from "./init";
import { ls, catalogStorageField } from "../../utils/localStorageHelper";

export function sorting (type, items = null) {
  const catalogItems = items ? items : ls('get', catalogStorageField);
  let updated;

  if(type === 'expensive') {
    updated = catalogItems.sort((a,b) => Number(b.price) - Number(a.price));
  }

  if(type === 'cheap') {
    updated = catalogItems.sort((a,b) => Number(a.price) - Number(b.price));
  }

  if(type === 'new') {
    updated = catalogItems.sort((a,b) => new Date(b.dateFrom) - new Date(a.dateFrom));
  }

  if(type === 'popular') {
    updated = catalogItems.sort((a,b) => Number(b.watchedCount) - Number(a.watchedCount));
  }

  ls('update', catalogStorageField, updated);
  catalogInit(catalogItems);
};
