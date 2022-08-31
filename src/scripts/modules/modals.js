import { Modal } from '../utils/Modal.js'

let modals = document.querySelectorAll('.is-modal, #catalog-filter');

if(modals) {
  modals.forEach(modal => {
      if(modal.classList.contains('filter')) {
        new Modal(modal, {swipe: true, swipeArea: '.filter', refreshOnWidth: true, refreshWidth: 768 });
      } else {
        new Modal(modal);
      }
  });
}
