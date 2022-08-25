import {gsap} from "gsap";
import { debounce, setDebounce } from "./debounce";
import { focusTrap } from "../utils/functions.js";
import { body, nav } from "../utils/nodesHelper";

const navOpener = document.querySelector('.js-nav-opener');
const navCloser = document.querySelector('.js-nav-closer');

if(navOpener) {
  const debounceTime = 1800;

  let navAnimationInTimeline = gsap.timeline();
  navAnimationInTimeline.paused(true);
  navAnimationInTimeline
      .fromTo(nav, { opacity: 0 }, {
        opacity: 1,
        duration: 0.6,
        ease: 'linear'
      })
      .fromTo('.nav__container', {
        x: '-100%'
      }, {
        x: 0,
        duration: 0.6,
        ease: 'ease-in'
      })
      .fromTo('.nav__list-item a', {
        y: '50px',
      }, {
        y: 0,
        duration: 0.5,
        ease: 'linear'
      }, "-=.3")

  const onClickOpenNav = () => {
    if(!debounce) {
      nav.classList.add('opened');
      setDebounce(debounceTime);
      navAnimationInTimeline.play();
      focusTrap(nav, navCloser);
    }
  }

  const onClickCloseNav = () => {
    if(!debounce) {
      setDebounce(debounceTime);
      navAnimationInTimeline.reverse();
      setTimeout(() => {
        nav.classList.remove('opened');
        focusTrap(body, navOpener);
      }, 1800);
    }
  }

  const onClickByEscCloseNav = (evt) => {
    if(evt.key === "Escape" && !debounce) {
      setDebounce(debounceTime);
      navAnimationInTimeline.reverse();
      setTimeout(() => {
        nav.classList.remove('opened');
        focusTrap(body, navOpener);
      }, 1800);
    }
  }

  const onClickByOverlayCloseNav = (evt) => {
    if(evt.target === nav && !debounce) {
      setDebounce(debounceTime);
      navAnimationInTimeline.reverse();
      setTimeout(() => {
        nav.classList.remove('opened');
        focusTrap(body, navOpener);
      }, 1800);
    }
  }

  navOpener.addEventListener('click', onClickOpenNav);
  navCloser.addEventListener('click', onClickCloseNav);
  window.addEventListener('keydown', onClickByEscCloseNav);
  window.addEventListener('click', onClickByOverlayCloseNav);
}
