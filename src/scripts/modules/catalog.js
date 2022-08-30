
import { initialMockData } from "./catalog/mockData.js";
import { init as catalogInit } from "./catalog/init.js";
import { init as initMinicart} from "./minicart/init.js";
import { randomInteger } from "../utils/helpers.js";
import { ls, cartStorageField, catalogStorageField } from "../utils/localStorageHelper";

let data = initialMockData;
ls('update', catalogStorageField, initialMockData);

catalogInit();

function fillCartMockFromStorage() {
  let products = [];
  let count = 4;

  for(let i = 0; i < count; i++) {
    let random = randomInteger(0, data.length - 1);
    //добавляю рандомное кол-во товара в корзине
    data[random].count = randomInteger(1, 5);

    products.push(data[random]);
  }

  return [...new Set(products)];
};

if(ls('get', cartStorageField).length) {
  console.log('length', ls('get', cartStorageField), ls('get', cartStorageField).length)
  ls('update', cartStorageField, fillCartMockFromStorage())
  initMinicart();
} else {
  console.log('CATALOG ELSE')
  ls('set', cartStorageField, fillCartMockFromStorage());

  initMinicart();
};
