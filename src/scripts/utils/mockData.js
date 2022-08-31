import { randomInteger, getRandomDateInterval, getBoolean } from "./helpers.js";
import { CATALOG_PRODUCTS_COUNT } from "./siteOptions.js";

export function generateMockData() {

  console.log('generate mock');
  let mockData = [];

  for(let i = 0; i < CATALOG_PRODUCTS_COUNT; i++) {
    mockData.push({
      id: Number(i) + 1,
      title: 'Краска Wallquest, Brownsone MS90102',
      img: `catalog-item-${ randomInteger(1, 9)}`,
      price: randomInteger(3000, 30000),
      watchedCount: randomInteger(0, 10000),
      dateFrom: getRandomDateInterval(new Date( new Date - 365 * 24 * 60 * 60 * 1000), new Date()),
      isActive: true,
      isSale: getBoolean( randomInteger(0,1) ),
      isContract: getBoolean( randomInteger(0,1) ),
      isExclusive: getBoolean( randomInteger(0,1) ),
      isAvailable: getBoolean( randomInteger(0,1) ),
      predeleted: false
    })
  }

  return mockData.sort((a,b) => Number(b.price) - Number(a.price));
}
