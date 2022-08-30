export function countLibrary(count) {
  if( count === 1 ) {
    return " товар"
  } if( count > 1 && count < 5 ) {
    return " товара"
  } else {
    return " товаров"
  }
}
