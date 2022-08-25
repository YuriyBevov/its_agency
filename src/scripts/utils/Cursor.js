import { gsap } from 'gsap';
import { lerp, getMousePos } from './functions.js';

let cursorCoords = {x: 0, y: 0};
window.addEventListener('mousemove', evt => cursorCoords = getMousePos(evt));

export class Cursor {
	cursorElements = [];

  constructor(cursor, triggerSelectors = '.gsap-cursor-trigger') {
    this.DOM = { elems: cursor };

    [...this.DOM.elems].forEach(elem => this.cursorElements.push(new CursorElement(elem)) );

    [...document.querySelectorAll(triggerSelectors)].forEach(trigger => {
			trigger.addEventListener('mouseenter', () => this.onTriggerMouseEnter());
			trigger.addEventListener('mouseleave', () => this.onTriggerMouseLeave());
		});
  }

  onTriggerMouseEnter() {
    for (const el of this.cursorElements){
      el.hoverAnimationStart();
    }
  }

  onTriggerMouseLeave() {
    for (const el of this.cursorElements){
      el.hoverAnimationKill();
    }
  }
};

/*Кастомизация тут*/
class CursorElement {
  DOM = {
    cursor: null,
    innerCursor: null,
    feTurbulence: null
  };

  renderedStyles = {
		tx: {previous: 0, current: 0, amt: 0.2},
		ty: {previous: 0, current: 0, amt: 0.2},
    opacity: {previous: 1, current: 1, amt: 0.2}
  };
  bounds;
  filterID = '#cursor-filter';
	filterValues = {turbulence: 1};

  constructor(elem) {
    this.DOM.cursor = elem;
    this.DOM.innerCursor = this.DOM.cursor.querySelector('.cursor-inner');
    this.DOM.feTurbulence = document.querySelector(`${this.filterID} > feTurbulence`);

		this.DOM.cursor.style.opacity = 0;
		this.bounds = this.DOM.cursor.getBoundingClientRect();

    for (const key in this.renderedStyles) {
			this.renderedStyles[key].amt = this.DOM.cursor.dataset.amt || this.renderedStyles[key].amt;
		}

    this.createFilterTimeline();

    const onMouseMoveHandler = () => {
      this.renderedStyles.tx.previous = this.renderedStyles.tx.current = cursorCoords.x - this.bounds.width/2;
			this.renderedStyles.ty.previous = this.renderedStyles.ty.previous = cursorCoords.y - this.bounds.height/2;

			requestAnimationFrame(() => this.render());
			window.removeEventListener('mousemove', onMouseMoveHandler);
		};
		window.addEventListener('mousemove', onMouseMoveHandler);
  }

  hoverAnimationStart() {
    this.filterTimeline.restart();
  }

  hoverAnimationKill() {
    gsap.to(this.DOM.innerCursor, {
      duration: 1,
      scale: 1,
      fill: 'transparent',
      stroke: 'black',
      opacity: 1,
      transformOrigin: '50% 50%'
    });
    setTimeout(() => {
      this.filterTimeline.progress(0).kill();
    }, 200);
  }

  createFilterTimeline() {
    this.filterTimeline = gsap.timeline({
      paused: true
    })
    .to(this.DOM.innerCursor, {
      duration: 1,
      scale: 1.3,
      fill: 'red',
      stroke: 'red',
      opacity: 0.2,
      transformOrigin: '50% 50%'
    });
	}

  render() {
    this.DOM.cursor.style.opacity = this.renderedStyles['opacity'].previous;

    for (const key in this.renderedStyles ) {
      this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
    }

		this.DOM.cursor.style.transform = `translateX(${(this.renderedStyles['tx'].previous)}px) translateY(${this.renderedStyles['ty'].previous}px)`;
    this.DOM.feTurbulence.setAttribute('baseFrequency', this.filterValues.turbulence * Math.random().toFixed(2));

    this.renderedStyles['tx'].current = cursorCoords.x - this.bounds.width/2;
		this.renderedStyles['ty'].current = cursorCoords.y - this.bounds.height/2;

    requestAnimationFrame(() => this.render());
  }
}
