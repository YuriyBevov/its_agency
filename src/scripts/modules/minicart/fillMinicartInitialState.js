import { randomInteger } from "../../utils/helpers";
import { init as minicartInit} from "./init";
import { INITIAL_CART_ITEMS } from "../../utils/siteOptions";
import { ls, cartStorageField } from "../../utils/localStorageHelper";

function getProducts(mock) {
  let products = [];

  (function fillProducts() {
    if(products.length !== INITIAL_CART_ITEMS) {
      let random = randomInteger(0, mock.length - 1);
      mock[random].count = randomInteger(1, 5);
      products.push(mock[random]);
      products = [...new Set(products)];

      fillProducts();
    }
  })();

  return products;
}

export function fillMinicartInitialState(mock) {

  let isExist = ls('get', cartStorageField);

  if(isExist) {
    ls('update', cartStorageField, getProducts(mock));
    minicartInit();
  } else {
    ls('set', cartStorageField, getProducts(mock));
    minicartInit();
  }
}
