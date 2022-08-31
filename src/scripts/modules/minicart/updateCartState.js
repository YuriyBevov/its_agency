
import { ls, cartStorageField } from "../../utils/localStorageHelper";
import { init as minicartInit } from "./init";

export function updateCartState() {
  let data = ls('get', cartStorageField);

  ls('update', cartStorageField, data.filter(item => !(!!item.predeleted)) );
  minicartInit();
}
