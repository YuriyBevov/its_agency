import { ls, cartStorageField } from "../../utils/sessionStorageHelper";
import { minicartContainer } from "../../utils/nodesHelper.js";
import { init as minicartInit } from "./init.js";

let cartItems;

const onClickToggleItem = (evt) => {
  const target = evt.currentTarget;
  const productID = Number(target.closest('.minicart-product').dataset.id);
  const current = cartItems.find(item => Number(item.id) === productID);

  current.predeleted = !current.predeleted;

  ls('update', cartStorageField, cartItems);
  minicartInit();
}

export function initRemoveOneButtons(data) {
  cartItems = data;
  const removeOneBtns = minicartContainer.querySelectorAll('.minicart-product__remove');

  removeOneBtns.forEach(btn => {
    btn.addEventListener('click', onClickToggleItem);
  })
}
