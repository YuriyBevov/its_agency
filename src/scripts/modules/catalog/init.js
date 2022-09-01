import { mock } from "../../utils/mockData";
import { initCartAddButtons } from "./addToCart";
import { initCatalogFilter } from "./filtration";
import { ls, catalogStorageField } from "../../utils/sessionStorageHelper";
import { catalogContainer, catalogTotal, catalogContent } from "../../utils/nodesHelper.js";
import { countLibrary } from "../../utils/countLibrary.js";
import { fillMinicartInitialState } from "../minicart/fillMinicartInitialState.js";

function fillCatalogTemplate(data) {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#product-card-template');
  catalogTotal.textContent = data.length + countLibrary(data.length);
  const emptyNode = document.querySelector('.empty-catalog-note');

  if(!data.length) {

    if (!emptyNode) {
      let div = document.createElement('div');
      div.classList.add('empty-catalog-note');

      let text = document.createElement('span');
      text.classList.add('lw-text-sm');
      text.textContent = 'Не удалось найти товары соответствующие заданным фильтрам... Попробуйте изменить параметры фильтрации !';

      div.appendChild(text);
      catalogContent.appendChild(div);
    }

  } else {

    if(emptyNode) {
      emptyNode.remove();
    }

    data.forEach(item => {
      const catalogItem = template.content.cloneNode(true);

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
  }

  initCartAddButtons(data);
  initCatalogFilter();
}

export function init(_data = null) {
  const data = _data ? _data : ls('get', catalogStorageField);
  const catalogItems = catalogContainer.querySelectorAll('.catalog__list-item');

  if(catalogItems.length) {
    catalogItems.forEach(item => item.remove());
  }

  fillCatalogTemplate(data);
  fillMinicartInitialState(mock);
}
