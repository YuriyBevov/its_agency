export const storage = window.localStorage;
export const cartStorageField = 'cart_mock';
export const catalogStorageField = 'catalog_mock';

export function ls(type, fieldName, data = null) {
  if(type === 'update') {
    storage.removeItem(fieldName);
    storage.setItem(fieldName, JSON.stringify(data));
  }

  if(type === 'set') {
    storage.setItem(fieldName, JSON.stringify(data));
    console.log('STORAGE SETED ITEM');
  }

  if(type === 'get') {
    console.log('STORAGE GETED ITEM');
    return JSON.parse(storage.getItem(fieldName));
  }
}
