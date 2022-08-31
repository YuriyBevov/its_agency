import { init as minicartInit } from "./init.js";
import { ls, cartStorageField } from "../../utils/localStorageHelper.js";

export function changeItemCount(type, id, items) {
  let target = items.find(item => item.id === id);

  type === 'inc' ?
  target.count++ : target.count-- ;

  ls('update', cartStorageField, items);
  minicartInit();
};
