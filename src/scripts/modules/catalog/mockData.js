
let count = 16;
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
  for(let i = 1; i < count; i++) {
    mockArray.push({
      id: Number(i),
      title: 'Краска Wallquest, Brownsone MS90102',
      img: `catalog-item-${ (Math.random(1,8) * 10 ).toFixed() }`, // неверно, попадается 10
      price: (Math.random(3000, 100000) * 10000).toFixed(),
      watchedCount: (Math.random(0, 10000) * 10000).toFixed(),
      dateFrom: getDate(),
      isPopular: getBoolean( Math.round(Math.random(0,1)) ),
      isSale: getBoolean( Math.round(Math.random(0,1)) ),
      isContract: getBoolean( Math.round(Math.random(0,1)) ),
      isExclusive: getBoolean( Math.round(Math.random(0,1)) ),
    })
  }
}

generateMockData();

export const mock = mockArray;
