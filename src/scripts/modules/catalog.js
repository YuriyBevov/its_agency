
import { mock } from "./catalog/mockData.js";
import { init as catalogInit } from "./catalog/init.js";
import { init as initMinicart} from "./minicart/minicartInit.js";
import { randomInteger } from "../utils/helpers.js";
import { cartFieldName, storage } from "../utils/nodesHelper.js";

catalogInit(mock);

function fillCartMockFromStorage() {
  let products = [];
  let count = 2;

  for(let i = 0; i < count; i++) {
    let random = randomInteger(0, mock.length - 1);
    //добавляю рандомное кол-во товара в корзине
    mock[random].count = randomInteger(1, 5);

    products.push(mock[random]);
  }

  return [...new Set(products)];
};

if(storage.getItem(cartFieldName)) {
  storage.removeItem(cartFieldName);
  storage.setItem(cartFieldName, JSON.stringify(fillCartMockFromStorage()) );

  initMinicart();
} else {
  storage.setItem(cartFieldName, JSON.stringify(fillCartMockFromStorage()) );

  initMinicart();
};
