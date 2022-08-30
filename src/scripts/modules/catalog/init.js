import { initCartAddButtons } from "./addToCart";
import { initCatalogFilter } from "./filtration";
import { ls, catalogStorageField } from "../../utils/localStorageHelper";

export function init() {
    let data = ls('get', catalogStorageField);
    const fragment = document.createDocumentFragment();
    const template = document.querySelector('#product-card-template');

    const catalogContainer = document.querySelector('.catalog__list');
    const catalogItems = catalogContainer.querySelectorAll('.catalog__list-item');

    if(catalogItems.length) {
      catalogItems.forEach(item => item.remove());
    }

    data.forEach(item => {
      let catalogItem = template.content.cloneNode(true);

      catalogItem.querySelector('.product-card').setAttribute('data-id', item.id);
      catalogItem.querySelector('picture source')
        .setAttribute('srcset', `./assets/img/${item.img}@1x.webp 1x, ./assets/img/${item.img}@2x.webp 2x`);
      catalogItem.querySelector('picture img')
        .setAttribute('src', `./assets/img/${item.img}@1x.jpg 1x, ./assets/img/${item.img}@2x.jpg 2x`);

      catalogItem.querySelector('.product-card__content h2').textContent = item.title;
      catalogItem.querySelector('.product-card__footer span').textContent = item.price;

      fragment.appendChild(catalogItem);
    })

    catalogContainer.appendChild(fragment);

    initCartAddButtons();
    initCatalogFilter();
};
