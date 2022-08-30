import { randomInteger } from "../../utils/helpers.js";

let count = 6;
let mockArray = [];

function getDate() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return new Date(timestamp);
}

const getRandomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

function getBoolean(num) {
  let bool = false;
  num === 1 ? bool = true : null;
  return bool;
}

function generateMockData() {
  console.log('generate mock')
  for(let i = 0; i < count; i++) {
    mockArray.push({
      id: Number(i) + 1,
      title: 'Краска Wallquest, Brownsone MS90102',
      img: `catalog-item-${ randomInteger(1, 9)}`,
      price: randomInteger(3000, 30000),
      watchedCount: randomInteger(0, 10000),
      dateFrom: getRandomDate(new Date( new Date - 365 * 24 * 60 * 60 * 1000), new Date()),
      isActive: true,
      isSale: getBoolean( randomInteger(0,1) ),
      isContract: getBoolean( randomInteger(0,1) ),
      isExclusive: getBoolean( randomInteger(0,1) ),
      isAvailable: getBoolean( randomInteger(0,1) )
    })
  }
}

generateMockData();
console.log(mockArray);
export let initialMockData = mockArray.sort((a,b) => Number(b.price) - Number(a.price));
