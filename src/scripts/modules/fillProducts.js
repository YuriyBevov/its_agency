import { generateMockData } from "../utils/mockData.js";
import { init as catalogInit } from "./catalog/init.js";
import { fillMinicartInitialState } from "./minicart/fillMinicartInitialState.js";
import { ls, catalogStorageField } from "../utils/localStorageHelper.js";

console.log('CREATE MOCK, FILL PRODUCTS');

let mock = generateMockData();

ls('update', catalogStorageField, mock);

catalogInit();
fillMinicartInitialState(mock);








