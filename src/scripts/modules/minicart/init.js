import {
  minicartContainer,
  minicartTotalCountNode,
  minicartTotalPriceNode,
  minicartNode,
  minicartOpenerButton,
  minicartRemoveAllButton } from "../../utils/nodesHelper.js";

import { storage, ls, cartStorageField } from "../../utils/localStorageHelper.js";
import { countLibrary } from "../../utils/countLibrary.js";
import { initCounters } from "../counter.js";
import { initRemoveOneButtons } from "./removeOne.js";
import { initRemoveAllButton } from "./removeAll.js";
import { minicartOpenerDisabling } from "./minicartOpenerToggler.js";
import { minicartUpdater } from "./update.js";

let itemsCount,
    totalPrice;

function setMinicartOptions(productData, productCard) {
  productCard.setAttribute('data-id', productData.id);

  productData.count === 1 ?
  productCard.querySelector('.js-counter-dec').setAttribute('disabled', true) :
  productData.count === 99 ?
  productCard.querySelector('.js-counter-inc').setAttribute('disabled', true) : null;

  if(!productData.predeleted) {
    totalPrice += (Number(productData.price) * (productData.count ? productData.count : 1));
    itemsCount++;
  } else {
    productCard.classList.add('predeleted');
    productCard.querySelector('.minicart-product__remove').classList.add('minicart-product__remove--refresh');
  }

  minicartTotalCountNode.textContent = itemsCount + countLibrary(itemsCount);
  minicartTotalPriceNode.textContent = totalPrice;
  minicartOpenerButton.textContent = itemsCount;

  if(itemsCount === 0) {
    minicartRemoveAllButton.classList.add('minicart-removed-all');
    minicartRemoveAllButton.textContent = 'восстановить';
    minicartOpenerButton.setAttribute('disabled', true);
  } else {
    minicartRemoveAllButton.classList.remove('minicart-removed-all');
    minicartRemoveAllButton.textContent = 'очистить все';
    minicartOpenerButton.removeAttribute('disabled');
  }

}

function fillMinicartTemplate(data) {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector('#cart-product-template');

  data.forEach(product => {
    const cartItem = template.content.cloneNode(true);
    const productCard = cartItem.querySelector('.minicart-product');

    cartItem.querySelector('picture source')
      .setAttribute('srcset', `./assets/img/${product.img}@1x.webp 1x, ./assets/img/${product.img}@2x.webp 2x`);
    cartItem.querySelector('picture img')
      .setAttribute('src', `./assets/img/${product.img}@1x.jpg 1x, ./assets/img/${product.img}@2x.jpg 2x`);

    cartItem.querySelector('.minicart-product__desc h2').textContent = product.title;
    cartItem.querySelector('.minicart-product__desc span').textContent = product.price;
    cartItem.querySelector('.js-counter-total').textContent = product.count ? product.count : 1;

    fragment.appendChild(cartItem);

    setMinicartOptions(product, productCard);
  });

  minicartContainer.appendChild(fragment);

  initCounters();
  initRemoveAllButton(data);
  initRemoveOneButtons(data);
  minicartUpdater();
}

export function init() {
  itemsCount = 0;
  totalPrice = 0;

  let data = ls('get', cartStorageField);

  console.log('MINICART INIT: ', data);
  if(data) {
    if(minicartContainer.querySelector('.minicart__content-item')) {
      let childNodes = minicartContainer.querySelectorAll('.minicart__content-item');

      childNodes.forEach(node => {
        node.remove();
      });
    }

    fillMinicartTemplate(data);
  } else {
    minicartOpenerDisabling(true);
  }
};
