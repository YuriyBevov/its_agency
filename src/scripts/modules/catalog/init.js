export function init(data) {
    let node = document.querySelector('.catalog__content');
    let template = document.querySelector('#product-card-template');

    let catalog = document.createElement('ul');
    catalog.classList.add('catalog__list');

    data.forEach(item => {
      let catalogItem = template.content.cloneNode(true);

      catalogItem.querySelector('picture source')
        .setAttribute('srcset', `./assets/img/${item.img}@1x.webp 1x, ./assets/img/${item.img}@2x.webp 2x`);
      catalogItem.querySelector('picture img')
        .setAttribute('src', `./assets/img/${item.img}@1x.jpg 1x, ./assets/img/${item.img}@2x.jpg 2x`);

      catalogItem.querySelector('.product-card__content h2').innerHTML = item.title;
      catalogItem.querySelector('.product-card__footer span').innerHTML = `${item.price}&nbsp;&#8381;`;

      catalog.appendChild(catalogItem);
      node.appendChild(catalog);
    })
}
/*
myStorage = window.localStorage;
localStorage.setItem('myCat', 'Tom');
//Считывать данные из localStorage для определённого ключа, можно следующим образом:
let cat = localStorage.getItem('myCat');
//Удалять данные можно так:
localStorage.removeItem('myCat'); // вернёт undefined
//Для удаления всех записей, то есть полной очистки localStorage, используйте:
localStorage.clear();
*/
