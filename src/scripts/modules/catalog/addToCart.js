import { storage, cartFieldName } from "../../utils/nodesHelper";
import { mock } from "./mockData";
import { init as initMinicart } from "../minicart/minicartInit.js";
import { changeItemCount } from "../minicart/changeItemCount.js";
import { isMinicartButtonDisabled, minicartButtonDisabling } from "../minicart/minicartButtonDisabling";

function addCartItem(id, items = null) {
  if(items) {
    let product = mock[id-1];
    product.count = 1;
    let updated = [...items, product];

    storage.removeItem(cartFieldName);
    storage.setItem(cartFieldName, JSON.stringify(updated));

    initMinicart();
  } else {
    let products = [];
    let product = mock[id-1];
    product.count = 1;
    products.push(product);

    storage.setItem(cartFieldName, JSON.stringify(products));
    initMinicart();
  }
};

const onClickHandler = (evt) => {
  if(isMinicartButtonDisabled) {
    minicartButtonDisabling(false);
  }

  let itemID = Number(evt.currentTarget.closest('.product-card').dataset.id);
  let storeItems = JSON.parse(storage.getItem(cartFieldName));

  if(storeItems) {
    let isExist = storeItems.find(item => item.id === itemID);

    if(!!isExist === false) {
      addCartItem(itemID,storeItems);
    } else {
      changeItemCount('inc', itemID,storeItems);
    }
  } else {
    addCartItem(itemID);
  }
}

export function initCartAddButtons() {
  let btns = document.querySelectorAll('.cart-add-button');

  btns.forEach(btn => {
    btn.addEventListener('click', onClickHandler);
  })
}
