import { minicartRemoveAllButton } from "../../utils/nodesHelper";
import { ls, cartStorageField } from "../../utils/localStorageHelper";
import { init as minicartInit } from "./init";

let cartItems;

const onClickHandler = (evt) => {
  let target = evt.currentTarget;

  if(!target.classList.contains('minicart-removed-all')) {
    cartItems.forEach(item => item.predeleted = true );
  } else {
    cartItems.forEach(item => item.predeleted = false );
  };

  ls('update', cartStorageField, cartItems);
  minicartInit();
}

export function initRemoveAllButton(data) {
  cartItems = data;
  minicartRemoveAllButton.addEventListener('click', onClickHandler);
}
