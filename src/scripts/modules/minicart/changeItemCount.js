import { init as minicartInit } from "./init.js";
import { ls, cartStorageField } from "../../utils/sessionStorageHelper.js";
import { minicartBtnAnimation } from "../minicartBtnAnimation.js";

export function changeItemCount(type, id, items) {
  let target = items.find(item => item.id === id);

  type === 'inc' ?
  target.count++ : target.count-- ;

  minicartBtnAnimation();

  ls('update', cartStorageField, items);
  minicartInit();
};
