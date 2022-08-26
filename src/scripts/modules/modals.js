import { Modal } from '../utils/Modal.js'

let modals = document.querySelectorAll('.modal, #catalog-filter');

if(modals) {
  modals.forEach(modal => {
      if(modal.classList.contains('filter')) {
        new Modal(modal, {swipe: true, swipeArea: '.filter'});
      } else {
        new Modal(modal);
      }
  });
}
