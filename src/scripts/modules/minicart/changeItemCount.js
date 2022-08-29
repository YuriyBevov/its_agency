import { init as initMinicart } from "./minicartInit.js";
import { storage } from "../../utils/nodesHelper.js";
import { cartFieldName } from "../../utils/nodesHelper.js";

export function changeItemCount(type, id, items) {
  console.log('addcount')
    let current = items.find(item => item.id === id);

    type === 'inc' ?
    current.count++ : current.count-- ;

    let updated = [...items];

    storage.removeItem(cartFieldName);
    storage.setItem(cartFieldName, JSON.stringify(updated));

    initMinicart();
}
