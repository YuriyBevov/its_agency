import { init as initMinicart } from "./init.js";
import { ls, cartStorageField } from "../../utils/localStorageHelper.js";

export function changeItemCount(type, id, items) {
    let current = items.find(item => item.id === id);

    /*type === 'inc' ?
    current.count++ : current.count--;*/
    console.log('ITEMS:', items, id)
    if(type === 'inc') {
      current.count++;
    } else if(type === 'dec') {
      current.count--;
    }

    let updated = [...items];

    ls('update', cartStorageField, updated);
    initMinicart();
}
