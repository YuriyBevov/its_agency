export const storage = window.localStorage;
export const cartStorageField = 'store_cart';
export const catalogStorageField = 'catalog_mock';

export function ls(type, fieldName, data = null) {
  if(type === 'update') {
    storage.removeItem(fieldName);
    storage.setItem(fieldName, JSON.stringify(data));
  }

  if(type === 'set') {
    storage.setItem(fieldName, JSON.stringify(data));
  }

  if(type === 'get') {
    return JSON.parse(storage.getItem(fieldName));
  }
}
