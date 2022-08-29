import {
  cartFieldName,
  storage,
  minicartTotalCount,
  minicartTotalPrice,
  cartNode,
  cartOpenerButton } from "../../utils/nodesHelper.js";

import { minicartButtonDisabling } from "./minicartButtonDisabling.js";
import { initCounters } from "../counter.js";
import { clearCartButtonInit, cartBtnsInit } from "./clear.js";

function countLibrary(count) {
  if( count === 1 ) {
    return " товар"
  } if( count > 1 && count < 5 ) {
    return " товара"
  } else {
    return " товаров"
  }
}

export function init() {
  if(cartNode) {
    let data = JSON.parse(storage.getItem(cartFieldName));
    console.log('INIT DATA', data)
    let parentNode = document.querySelector('.minicart__content-list');

    if(data) {
      if(parentNode.querySelector('.minicart__content-item')) {
        let childNodes = parentNode.querySelectorAll('.minicart__content-item');

        childNodes.forEach(node => {
          node.remove();
        });
      }

      const fragment = document.createDocumentFragment();
      const template = document.querySelector('#cart-product-template');

      let totalCartItemsCount = data.length;
      let totalCartItemsPrice = 0;

      data.forEach(product => {
        let cartItem = template.content.cloneNode(true);

        const productCard = cartItem.querySelector('.minicart-product');
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
        totalCartItemsPrice += (Number(product.price) * (product.count ? product.count : 1));
      });

      parentNode.appendChild(fragment);

      minicartTotalCount.textContent = totalCartItemsCount + countLibrary(totalCartItemsCount);
      minicartTotalPrice.textContent = totalCartItemsPrice;
      cartOpenerButton.textContent = totalCartItemsCount;

      initCounters();
      cartBtnsInit(parentNode);
    } else {
      minicartButtonDisabling(true);
    }
  }
}
