
import { ls, cartStorageField } from "../../utils/sessionStorageHelper";
import { init as minicartInit } from "./init";

export function updateCartState() {
  let data = ls('get', cartStorageField);

  ls('update', cartStorageField, data.filter(item => !(!!item.predeleted)) );
  minicartInit();
}
