import { randomInteger } from "../../utils/helpers.js";

let count = 6;
let mockArray = [];

function getDate() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}

function getBoolean(num) {
  let bool = false;
  num === 1 ? bool = true : null;
  return bool;
}

function generateMockData() {
  for(let i = 0; i < count; i++) {
    mockArray.push({
      id: Number(i) + 1,
      title: 'Краска Wallquest, Brownsone MS90102',
      img: `catalog-item-${ randomInteger(1, 9)}`,
      price: randomInteger(3000, 30000),
      watchedCount: randomInteger(0, 10000),
      dateFrom: getDate(),
      isPopular: getBoolean( randomInteger(0,1) ),
      isSale: getBoolean( randomInteger(0,1) ),
      isContract: getBoolean( randomInteger(0,1) ),
      isExclusive: getBoolean( randomInteger(0,1) ),
    })
  }
}

generateMockData();

export const mock = mockArray;
