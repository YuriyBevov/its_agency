import { minicartOpenerButton, minicartCloser } from "../../utils/nodesHelper";
import { updateCartState } from "./updateCartState";

const onKeydownHandler = (evt) => {
  if(evt.key === 'Escape') {
    onActionRemoveEventListeners();
    updateCartState();
  }
}

const onClickHandler = () => {
  onActionRemoveEventListeners();
  updateCartState();
}

const onOverlayClickHandler = (evt) => {
  if(evt.target === document.querySelector('.minicart__overlay')) {
    onActionRemoveEventListeners();
    updateCartState();
  }
}

function onClickAddEventListeners() {
  document.addEventListener('keydown', onKeydownHandler);
  document.addEventListener('click', onOverlayClickHandler);
  minicartCloser.addEventListener('click', onClickHandler);
}

function onActionRemoveEventListeners() {
  document.removeEventListener('keydown', onKeydownHandler);
  document.removeEventListener('click', onOverlayClickHandler);
  minicartCloser.removeEventListener('click', onClickHandler);
}

export function minicartUpdater() {
  minicartOpenerButton.addEventListener('click', onClickAddEventListeners);
}
