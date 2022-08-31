/*import { init as catalogInit } from "./init";
import { ls, catalogStorageField } from "../../utils/localStorageHelper";

export function sorting (type) {
  let mock = ls('get', catalogStorageField);
  if(type === 'expensive') {
    ls('update', catalogStorageField, mock.sort((a,b) => Number(b.price) - Number(a.price)));
  }

  if(type === 'cheap') {
    ls('update', catalogStorageField, mock.sort((a,b) => Number(a.price) - Number(b.price)));
  }

  if(type === 'new') {
    ls('update', catalogStorageField, mock.sort((a,b) => new Date(b.dateFrom) - new Date(a.dateFrom)));
  }

  if(type === 'popular') {
    ls('update', catalogStorageField, mock.sort((a,b) => Number(b.watchedCount) - Number(a.watchedCount)))
  }

  catalogInit();
};*/
