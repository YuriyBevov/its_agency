import {
  minicartTotalCountNode,
  minicartTotalPriceNode,
  cartNode,
  cartOpenerButton,
  removeAllBtn } from "../../utils/nodesHelper.js";

import { ls, cartStorageField } from "../../utils/localStorageHelper.js";

import { minicartButtonDisabling } from "./minicartButtonDisabling.js";
import { initCounters } from "../counter.js";
import { cartBtnsInit } from "./clear.js";
import { countLibrary } from "./countLibrary.js";

export function init() {
  if(cartNode) {
    let data = ls('get', cartStorageField)
    let minicartContainer = document.querySelector('.minicart__content-list');

    if(data) {
      if(minicartContainer.querySelector('.minicart__content-item')) {
        let childNodes = minicartContainer.querySelectorAll('.minicart__content-item');

        childNodes.forEach(node => {
          node.remove();
        });
      }

      const fragment = document.createDocumentFragment();
      const template = document.querySelector('#cart-product-template');

      let totalCartItemsCount = 0;
      let totalCartItemsPrice = 0;

      data.forEach(product => {
        let cartItem = template.content.cloneNode(true);

        const productCard = cartItem.querySelector('.minicart-product');
        console.log(product.predeleted, !product.predeleted, !!product.predeleted);

        if(!!product.predeleted) {
          productCard.classList.add('predeleted');
          productCard.querySelector('.minicart-product__remove').classList.add('minicart-product__remove--refresh');
        }

        productCard.setAttribute('data-id', product.id);

        if(product.count === 1) {
          productCard.querySelector('.js-counter-dec').setAttribute('disabled', true);
        } else if(product.count === 99) {
          productCard.querySelector('.js-counter-inc').setAttribute('disabled', true);
        }

        cartItem.querySelector('picture source')
          .setAttribute('srcset', `./assets/img/${product.img}@1x.webp 1x, ./assets/img/${product.img}@2x.webp 2x`);
        cartItem.querySelector('picture img')
          .setAttribute('src', `./assets/img/${product.img}@1x.jpg 1x, ./assets/img/${product.img}@2x.jpg 2x`);

        cartItem.querySelector('.minicart-product__desc h2').textContent = product.title;
        cartItem.querySelector('.minicart-product__desc span').textContent = product.price;
        cartItem.querySelector('.js-counter-total').textContent = product.count ? product.count : 1;

        fragment.appendChild(cartItem);

        if(!product.predeleted) {
          totalCartItemsPrice += (Number(product.price) * (product.count ? product.count : 1));
          totalCartItemsCount += 1;
        }
      });

      minicartContainer.appendChild(fragment);

      minicartTotalCountNode.textContent = totalCartItemsCount + countLibrary(totalCartItemsCount);
      minicartTotalPriceNode.textContent = totalCartItemsPrice;
      cartOpenerButton.textContent = totalCartItemsCount;

      if(totalCartItemsCount === 0) {
        removeAllBtn.classList.add('minicart-remove-all-refresh');
        removeAllBtn.textContent = 'восстановить';
        cartOpenerButton.setAttribute('disabled', true);
      } else {
        removeAllBtn.classList.remove('minicart-remove-all-refresh');
        removeAllBtn.textContent = 'очистить все';
        cartOpenerButton.removeAttribute('disabled');
      }

      initCounters();
      cartBtnsInit(minicartContainer);
    } else {
      minicartButtonDisabling(true);
    }
  }
}
