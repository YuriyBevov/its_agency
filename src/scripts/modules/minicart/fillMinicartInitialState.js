import { randomInteger } from "../../utils/helpers";
import { init as minicartInit} from "./init";
import { INITIAL_CART_ITEMS } from "../../utils/siteOptions";
import { ls, cartStorageField } from "../../utils/localStorageHelper";

export function fillMinicartInitialState(mock) {
  console.log('FILL_MINICART_INITIAL_STATE');

  function getProducts() {
    let products = [];
    function fillProducts() {
      if(products.length !== INITIAL_CART_ITEMS) {
        let random = randomInteger(0, mock.length - 1);
        mock[random].count = randomInteger(1, 5);
        products.push(mock[random]);
        products = [...new Set(products)];

        fillProducts();
      }
    }

    fillProducts();

    return products;
  }

  let isExist = ls('get', cartStorageField);

  if(isExist) {
    ls('update', cartStorageField, getProducts());
    minicartInit();
  } else {
    ls('set', cartStorageField, getProducts());
    minicartInit();
  }
}
