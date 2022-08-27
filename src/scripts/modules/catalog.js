
import { mock } from "./catalog/mockData.js";
import { init as catalogInit } from "./catalog/init.js";
import { init as cartInit} from "./minicart/init.js";

const storage = window.localStorage;

catalogInit(mock);

if(storage.getItem('colors_catalog')) {
  let data = storage.getItem('colors_catalog');
  cartInit(data);
}
