import { storage, cartFieldName,minicartTotalCount,minicartTotalPrice, cartNode } from "../../utils/nodesHelper.js";
import { init as minicartInit } from "./minicartInit.js";
let removeBtn = document.querySelector('.js-minicart-remove-all');
import { minicartCloser } from "../../utils/nodesHelper.js";

/*export function clearCartButtonInit(node) {
  if(removeBtn) {
    const onClickRemoveAllCartItems = () => {
      storage.removeItem(cartFieldName);
      node.remove();

      let container = document.createElement('ul');
      container.classList.add('minicart__content-list');
      cartNode.appendChild(container);

      minicartTotalCount.textContent = 0;
      minicartTotalPrice.textContent = 0;

      minicartInit();
    }

    removeBtn.addEventListener('click', onClickRemoveAllCartItems);
  }
}*/

function addActionListeneres() {
  console.log('add handlers');

  document.addEventListener('keydown', onKeydownHandler);
  document.addEventListener('click', onOverlayClickHandler);
  minicartCloser.addEventListener('click', onClickHandler);

  isListeneresAdded = true;
}

function removeActionHandlers() {
  console.log('remove handlers');
  document.removeEventListener('keydown', onKeydownHandler);
  document.removeEventListener('click', onOverlayClickHandler);
  minicartCloser.removeEventListener('click', onClickHandler);
  isListeneresAdded = false;
}

function action() {
  console.log('lets action !');
  predeleted = [];
}

let _node;
let isListeneresAdded = false;
let predeleted = [];
let removeAllBtn;
let removeBtns;

const onKeydownHandler = (evt) => {
  if(evt.key === 'Escape') {
    console.log('close by esc');
    removeActionHandlers();
    action();
  }
}

const onClickHandler = () => {
  console.log('close by click');
  removeActionHandlers();
  action();
}

const onOverlayClickHandler = (evt) => {
  if(evt.target === document.querySelector('.minicart__overlay')) {
    console.log('close by overlay click');
    removeActionHandlers();
    action();
  }
}

function setRemoveAllBtnType(type) {
  if(type === 'clear') {
    removeAllBtn.classList.add('clicked');
    removeAllBtn.textContent = 'восстановить все';
  } else {
    removeAllBtn.classList.remove('clicked');
    removeAllBtn.textContent = 'очистить список';
  }
}

function removeAll() {

  /*
    берем стор,
    поещаем эл-ты в массив для удаления,
    вешаем оверлэй,
    меняем кнопку,
    на кнопку вешаем события рефреша,
    по нажатию на кнопку рефреша делаем обратное действие
  */

  console.log('remove all');
  if(!isListeneresAdded) {
    addActionListeneres();
  }

  let cartList = document.querySelector('.minicart__content-list');
  let refreshBtns = cartList.querySelectorAll('.minicart-product__remove');
  let products = cartList.querySelectorAll('.minicart-product');
  predeleted = [];

  if(!removeAllBtn.classList.contains('clicked')) {
    setRemoveAllBtnType('clear');

    products.forEach(product => {
      product.classList.add('predelete');
      predeleted.push(product);

      refreshBtns.forEach(btn => {
        if(!btn.classList.contains('minicart-product__remove--refresh')) {
          btn.classList.add('minicart-product__remove--refresh');
        }
      });
    })
    console.log(predeleted);

  } else {
    setRemoveAllBtnType('refresh');

    products.forEach(product => {
      product.classList.remove('predelete');

      refreshBtns.forEach(btn => {
        if(btn.classList.contains('minicart-product__remove--refresh')) {
          btn.classList.remove('minicart-product__remove--refresh');
        }
      });
    })

  }
}

function removeOne(evt) {
  if(!isListeneresAdded) {
    addActionListeneres();
  }

  if(evt.currentTarget.classList.contains('minicart-product__remove--refresh')) {
    console.log('restore branch');
    setRemoveAllBtnType('restore');

    evt.currentTarget.classList.remove('minicart-product__remove--refresh');
    evt.currentTarget.closest('.minicart-product').classList.remove('predelete');
  } else {
    evt.currentTarget.classList.add('minicart-product__remove--refresh');
    evt.currentTarget.closest('.minicart-product').classList.add('predelete');

    let removedItemsState = [];
    removeBtns.forEach(btn => {
      btn.classList.contains('minicart-product__remove--refresh') ?
      removedItemsState.push(false) : removedItemsState.push(true);
    })

    let isAllItemsRemoved = removedItemsState.includes(false);

    !!isAllItemsRemoved ?
    setRemoveAllBtnType('clear') : null;
  }
}

export function cartBtnsInit(node) {
  _node = node;
  removeAllBtn = document.querySelector('.js-minicart-remove-all');
  removeBtns = node.querySelectorAll('.minicart-product__remove');
  removeAllBtn.addEventListener('click', removeAll);

  removeBtns.forEach(btn => {
    btn.addEventListener('click', removeOne);
  });
}
