import { setCssProperty } from "./helpers";

export class Modal {
  constructor( modal, options = {} ) {
      this.options = options;
      this.swipe = options.swipe ? options.swipe : null;
      this.swipeArea = options.swipeArea ? document.querySelector(options.swipeArea) : null;
      this.swipeDistance = 150;
      this.initialTouchPos = null;
      this.lastTouchPos = null;
      this.rafPending = false;
      this.updateSwipeRestPositionPaused = false;
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

  getGesturePointFromEvent(evt) {
    let point = {};

    if (evt.targetTouches) {
      point.x = evt.targetTouches[0].clientX;
      point.y = evt.targetTouches[0].clientY;
    } else {
      point.x = evt.clientX;
      point.y = evt.clientY;
    }
    return point;
  }

  swipeAnimation = () => {
    if (this.rafPending === false) {
      return;
    }

    let differenceInY = this.lastTouchPos.y - this.initialTouchPos.y;

    if(differenceInY > 0) {
      this.swipeArea.style.bottom = `calc(-100% - (${differenceInY}px))`;

      if(differenceInY > this.swipeDistance) {
        this.updateSwipeRestPositionPaused = true;
        this.refresh();
      }
    }

    this.rafPending = false;
  }

  updateSwipeRestPosition = () => {
    if(this.updateSwipeRestPositionPaused) {
      setTimeout(() => {
        this.swipeArea.style.bottom = '-100%';
      }, 600);
    } else {
      this.swipeArea.style.bottom = '-100%';
    }
  }

  handleGestureStart = (evt) => {
    evt.preventDefault();
    document.addEventListener('mousemove', this.handleGestureMove, true);
    document.addEventListener('mouseup', this.handleGestureEnd, true);

    this.initialTouchPos = this.getGesturePointFromEvent(evt);
    this.swipeArea.style.transition = 'initial';
  }


  handleGestureMove = (evt) => {
    evt.preventDefault();

    if (this.initialTouchPos === null) {
      return;
    }

    this.lastTouchPos = this.getGesturePointFromEvent(evt);

    if (this.rafPending) {
      return;
    }

    this.rafPending = true;

    window.requestAnimationFrame(this.swipeAnimation);
  }

  handleGestureEnd = (evt) => {
    evt.preventDefault();

    if (evt.touches && evt.touches.length > 0) {
      return;
    }

    this.rafPending = false;

    document.removeEventListener('mousemove', this.handleGestureMove, true);
    document.removeEventListener('mouseup', this.handleGestureEnd, true);

    this.updateSwipeRestPosition();

    this.initialTouchPos = null;
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
        this.swipeArea.addEventListener('touchstart', this.handleGestureStart, true);
        this.swipeArea.addEventListener('touchmove', this.handleGestureMove, true);
        this.swipeArea.addEventListener('touchend', this.handleGestureEnd, true);
        this.swipeArea.addEventListener('touchcancel', this.handleGestureEnd, true);

        this.swipeArea.addEventListener('mousedown', this.handleGestureStart, true);

        this.updateSwipeRestPositionPaused = false;
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
          this.swipeArea.removeEventListener('touchstart', this.handleGestureStart, true);
          this.swipeArea.removeEventListener('touchmove', this.handleGestureMove, true);
          this.swipeArea.removeEventListener('touchend', this.handleGestureEnd, true);
          this.swipeArea.removeEventListener('touchcancel', this.handleGestureEnd, true);

          this.swipeArea.removeEventListener('mousedown', this.handleGestureStart, true);
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
