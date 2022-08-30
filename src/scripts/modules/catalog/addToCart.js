//import { mock } from "./mockData";

import { init as initMinicart } from "../minicart/init.js";
import { changeItemCount } from "../minicart/changeItemCount.js";
import { isMinicartButtonDisabled, minicartButtonDisabling } from "../minicart/minicartButtonDisabling";
import { ls, cartStorageField, catalogStorageField } from "../../utils/localStorageHelper";

function addCartItem(id, items = null) {
  let mock = ls('get', catalogStorageField);

  if(items) {
    console.log('items exist', items)
    let product = mock.find(item => item.id === id);
    product.count = 1;
    let updated = [...items, product];

    ls('update', cartStorageField, updated);

    initMinicart();
  } else {
    console.log('items exist not', items)
    let products = [];
    let product = mock.find(item => item.id === id);
    product.count = 1;
    products.push(product);

    ls('update', cartStorageField, products)
    initMinicart();
  }
};

const onClickHandler = (evt) => {
  if(isMinicartButtonDisabled) {
    minicartButtonDisabling(false);
  }

  let itemID = Number(evt.currentTarget.closest('.product-card').dataset.id);
  let storeItems = ls('get', cartStorageField);

  if(storeItems.length) {
    let isExist = storeItems.find(item => item.id === itemID);

    console.log(isExist)
    if(!isExist) {
      addCartItem(itemID,storeItems);
    } else {
      changeItemCount('inc', itemID, storeItems);
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
