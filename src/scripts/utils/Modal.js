export class Modal {
  constructor( modal, options = {} ) {
      this.isBodyLocked = options.isBodyLocked ? true : false,
      this.modal = modal;
      this.id = this.modal.getAttribute('id');
      this.openers = document.querySelectorAll('[data-modal-anchor="' + this.id + '"]');
      this.isInited = false;
      this.overlay = this.modal.parentNode;
      this.close = this.modal.querySelector('.modal__close');
      this.focusableElements = [
        'a[href]',
        'input',
        'select',
        'textarea',
        'button',
        'iframe',
        '[contenteditable]',
        '[tabindex]:not([tabindex^="-"])'
      ];
      this.init();
  }

  bodyLocker = (bool) => {
      let body = document.querySelector('body');
      let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';

      if(bool) {
          body.style.overflow = 'hidden';
          body.style.paddingRight = paddingOffset;
      } else {
          body.style.overflow = 'auto';
          body.style.paddingRight = '0px';
      }
  }

  focusTrap = () => {
      const firstFocusableElement = this.modal.querySelectorAll(this.focusableElements)[0];
      const focusableContent = this.modal.querySelectorAll(this.focusableElements);
      const lastFocusableElement = focusableContent[focusableContent.length - 1];

      let onBtnClickHandler = (evt) => {
          let isTabPressed = evt.key === 'Tab' || evt.key === 9;

          if(evt.key === 'Escape') {
              document.removeEventListener('keydown', onBtnClickHandler);
          }

          if (!isTabPressed) {
              return;
          }

          if (evt.shiftKey) {
              if (document.activeElement === firstFocusableElement) {
                  lastFocusableElement.focus();
                  evt.preventDefault();
              }
          } else {
              if (document.activeElement === lastFocusableElement) {
                  firstFocusableElement.focus();
                  evt.preventDefault();
              }
          }
      }

      document.addEventListener('keydown', onBtnClickHandler);
      firstFocusableElement.focus();
  }

  addListeners = () => {
      this.openers.forEach(opener => {
          opener.removeEventListener('click', this.openModal);
      })

      document.addEventListener('click', this.closeByOverlayClick);
      document.addEventListener('keydown', this.closeByEscBtn);

      this.close.addEventListener('click', this.closeByBtnClick);
  }

  refresh = () => {
      document.removeEventListener('click', this.closeByOverlayClick);
      document.removeEventListener('keydown', this.closeByEscBtn);

      this.close.removeEventListener('click', this.closeByBtnClick);
      this.overlay.classList.remove('is-opened');
      this.modal.classList.remove('is-active');
      this.bodyLocker(false);

      this.openers.forEach(opener => {
          opener.addEventListener('click', this.openModal);
      })
}

  closeByOverlayClick = (evt) => {
      if(evt.target === this.overlay) {
          this.refresh();
      }
  }

  closeByEscBtn = (evt) => {
      if (evt.key === "Escape") {
          this.refresh();
      }
  }

  closeByBtnClick = () => {
      this.refresh();
  }

  openModal = (evt) => {
      evt.preventDefault();
      this.overlay.classList.add('is-opened');
      this.modal.classList.add('is-active');
      this.addListeners();
      this.focusTrap();
      this.bodyLocker(true);
  }

  init() {
      if(this.openers) {
          this.isInited = true;

          this.openers.forEach(opener => {
              opener.addEventListener('click', this.openModal, this.modal, this.overlay);
          })
      } else {
          console.error('Не добавлена кнопка открытия модального окна, либо в ней не прописан аттр-т: data-modal-anchor={modal-id} ')
      }
  };
}
