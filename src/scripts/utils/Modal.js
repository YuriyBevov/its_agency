export class Modal {
  constructor( modal, options = {} ) {
      //this.isBodyLocked = options.isBodyLocked ? true : false,
      this.options = options;
      this.swipe = options.swipe ? options.swipe : null;
      this.swipeArea = options.swipeArea ? document.querySelector(options.swipeArea) : null;
      this.modal = modal;
      this.id = this.modal.getAttribute('id');
      this.openers = document.querySelectorAll('[data-modal-anchor="' + this.id + '"]');
      this.isInited = false;
      this.overlay = this.modal.parentNode;
      this.close = this.modal.querySelector('.js-modal-close');
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
      this.debounce = false;
      this.debounceTime = 750;
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

  setDebounce(timeoutTime) {
    this.debounce = true;
    setTimeout(() => {
      this.debounce = false;
    }, timeoutTime);
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
      if(this.close) {
        this.close.addEventListener('click', this.closeByBtnClick);
      }

      if(this.swipe) {
        console.log('swipe on', this.swipeArea)

        document.addEventListener('mousedown', this.onMouseDownListenSwipeHandler);
        document.addEventListener('touchstart', this.onTouchListenSwipeHandler);
      }
  }

  refresh = () => {
    if(!this.debounce) {
      this.setDebounce(this.debounceTime);
      document.removeEventListener('click', this.closeByOverlayClick);
      document.removeEventListener('keydown', this.closeByEscBtn);

      if(this.close) {
        this.close.removeEventListener('click', this.closeByBtnClick);
      }

      if(this.swipe) {
        console.log('swipe on', this.swipeArea)

        document.removeEventListener('mousedown', this.onMouseDownListenSwipeHandler);
        document.removeEventListener('touchstart', this.onTouchListenSwipeHandler);
      }

      this.overlay.classList.add('is-closing');

      setTimeout(() => {
        this.overlay.classList.remove('is-opened');
        this.overlay.classList.remove('is-closing');
        this.bodyLocker(false);

        this.openers.forEach(opener => {
            opener.addEventListener('click', this.openModal);
        })
      }, 600);
    }
  }

  onMouseDownListenSwipeHandler = (evt) => {
    if(evt.target === this.swipeArea) {
      console.log('area')


    }
  }

  onTouchListenSwipeHandler = (evt) => {
    alert('onTouchListenSwipeHandler', evt, evt.target);
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
      if(!this.debounce) {
        this.setDebounce(this.debounceTime);
        this.overlay.classList.add('is-opened');
        this.addListeners();
        this.focusTrap();
        this.bodyLocker(true);
      }
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
