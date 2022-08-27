// работа с классами эл-та

const root = document.querySelector(':root');

function getCssPropertyValue(name) {
  return getComputedStyle(root).getPropertyValue(name);
}

function setCssProperty(name, value) {
  root.style.setProperty(name, value);
}

function setVieportHeight() {
  let vh = window.innerHeight * 0.01;
  setCssProperty('--vh', `${vh}px`);

  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    setCssProperty('--vh', `${vh}px`);
  });
}

function addClass(el, cl) {
  el.classList.add(cl);
}

function removeClass(el, cl) {
  el.classList.remove(cl);
}

function checkClass(el, cl) {
  return el.classList.contains(cl);
}

function toggleClass(el, cl) {
  el.classList.toggle(cl);
}

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Позиция мыши
const getMousePos = evt => {
    return {
        x : evt.clientX,
        y : evt.clientY
    };
};

//получение радиан из градусов(для канваса)
function getRadians(degrees) {
	return (Math.PI/180)*degrees;
}

// Ограничение длины текста по кол-ву символов
function limitStr( str, n ) {
  if ( str.length > n ) {
      return str.slice(0, n) + '...';
  } else {
      return str
  }
}
// запрет скролла у body
function bodyLocker(bool) {
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

// вычисление поз-и/размеров эл-та
function getBoundingClientRect(elem, side) {
  if(side === 'height') {
      return elem.getBoundingClientRect().height
  }

  if(side === 'width') {
      return elem.getBoundingClientRect().width
  }

  if(side === 'top') {
      return elem.getBoundingClientRect().top
  }

  if(side === 'bottom') {
    return elem.getBoundingClientRect().bottom
  }

  if(side === 'left') {
    return elem.getBoundingClientRect().left
  }

  if(side === 'right') {
    return elem.getBoundingClientRect().right
  }

  if(side === 'x') {
    return elem.getBoundingClientRect().x
  }

  if(side === 'y') {
    return elem.getBoundingClientRect().y
  }
}

function focusTrap(el, initialFocusedEl = null) {
  const focusableElements = [
    'a[href]',
    'input',
    'select',
    'textarea',
    'button',
    'iframe',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ];

  const firstFocusableElement = el.querySelectorAll(focusableElements)[0];
  const focusableContent = el.querySelectorAll(focusableElements);
  const lastFocusableElement = focusableContent[focusableContent.length - 1];

  let onBtnClickHandler = (evt) => {
      let isTabPressed = evt.key === 'Tab' || evt.key === 9;

      if(evt.key === 'Escape') {
          document.removeEventListener('keydown', onBtnClickHandler);
          console.log('ESC')
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
  initialFocusedEl !== null ?
  initialFocusedEl.focus() : firstFocusableElement.focus();
}

let debounce = false;

function setDebounce(timeoutTime) {
  debounce = true;
  setTimeout(() => {
    debounce = false;
  }, timeoutTime);
}

export  { setVieportHeight, debounce, setDebounce, focusTrap, getCssPropertyValue, setCssProperty, lerp, getMousePos, getRadians,limitStr, addClass, removeClass, checkClass, toggleClass, bodyLocker, getBoundingClientRect }
