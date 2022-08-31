import { init as minicartInit } from "../minicart/init.js";
import { ls, cartStorageField, catalogStorageField } from "../../utils/localStorageHelper";

const onClickAddItemToCart = (evt) => {
  const target = evt.currentTarget;
  const targetID = Number(target.closest('.product-card').dataset.id);
  let cartItems = ls('get', cartStorageField);

  let current = cartItems.find(item => item.id === targetID);

  if(current) {
    current.count++;
    ls('update', cartStorageField, cartItems);
    minicartInit();
  } else {
    const catalogItems = ls('get', catalogStorageField);
    const current = catalogItems.find(item => item.id === targetID);

    current.count = 1;
    cartItems = [...cartItems, current];

    ls('update', cartStorageField, cartItems);
    minicartInit();
  }
}

export function initCartAddButtons(data) {
  const btns = document.querySelectorAll('.cart-add-button');

  btns.forEach(btn => {
    btn.addEventListener('click', onClickAddItemToCart);
  })
}
