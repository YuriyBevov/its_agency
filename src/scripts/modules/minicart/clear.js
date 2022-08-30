import { init as minicartInit } from "./init.js";
import { minicartCloser, removeAllBtn } from "../../utils/nodesHelper.js";
import { ls, cartStorageField } from "../../utils/localStorageHelper.js";

let storeItems;
let isListeneresAdded = false;

function addActionListeneres() {
  document.addEventListener('keydown', onKeydownHandler);
  document.addEventListener('click', onOverlayClickHandler);
  minicartCloser.addEventListener('click', onClickHandler);

  isListeneresAdded = true;
}

function removeActionHandlers() {
  document.removeEventListener('keydown', onKeydownHandler);
  document.removeEventListener('click', onOverlayClickHandler);
  minicartCloser.removeEventListener('click', onClickHandler);

  isListeneresAdded = false;
}

function action() {
  let updated = storeItems.filter(item => !(!!item.predeleted));

  ls('update', cartStorageField, updated);
  minicartInit();
}

const onKeydownHandler = (evt) => {
  if(evt.key === 'Escape') {
    removeActionHandlers();
    action();
  }
}

const onClickHandler = () => {
  removeActionHandlers();
  action();
}

const onOverlayClickHandler = (evt) => {
  if(evt.target === document.querySelector('.minicart__overlay')) {
    removeActionHandlers();
    action();
  }
}

function removeAll() {

  if(!isListeneresAdded) {
    addActionListeneres();
  }

  if(!removeAllBtn.classList.contains('minicart-remove-all-refresh')) {
    storeItems.forEach(item => {
      item.predeleted = true;
    });
  } else {
    storeItems.forEach(item => {
      item.predeleted = false;
    });
  }

  ls('update', cartStorageField, storeItems);
  minicartInit();
}

function removeOne(evt) {
  if(!isListeneresAdded) {
    addActionListeneres();
  }

  let current = storeItems.find(item => {
    return Number(item.id) === Number(evt.currentTarget.closest('.minicart-product').dataset.id)
  });

  if(!evt.currentTarget.classList.contains('minicart-product__remove--refresh')) {
    current.predeleted = true;
  } else {
    current.predeleted = false;
  }

  ls('update', cartStorageField, storeItems);
  minicartInit();
}

export function cartBtnsInit(node) {
  storeItems = ls('get', cartStorageField);

  removeAllBtn.addEventListener('click', removeAll);
  let removeBtns = node.querySelectorAll('.minicart-product__remove');

  removeBtns.forEach(btn => {
    btn.addEventListener('click', removeOne);
  });
}
