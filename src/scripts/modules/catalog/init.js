import { initCartAddButtons } from "./addToCart";

export function init(data) {
    let node = document.querySelector('.catalog__content');
    let template = document.querySelector('#product-card-template');
    let catalog = node.querySelector('.catalog__list');

    data.forEach(item => {
      let catalogItem = template.content.cloneNode(true);

      catalogItem.querySelector('.product-card').setAttribute('data-id', item.id);
      catalogItem.querySelector('picture source')
        .setAttribute('srcset', `./assets/img/${item.img}@1x.webp 1x, ./assets/img/${item.img}@2x.webp 2x`);
      catalogItem.querySelector('picture img')
        .setAttribute('src', `./assets/img/${item.img}@1x.jpg 1x, ./assets/img/${item.img}@2x.jpg 2x`);

      catalogItem.querySelector('.product-card__content h2').textContent = item.title;
      catalogItem.querySelector('.product-card__footer span').textContent = item.price;

      catalog.appendChild(catalogItem);
      node.appendChild(catalog);
    })

    initCartAddButtons();
};
