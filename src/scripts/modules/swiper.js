import Swiper, { EffectFade, Autoplay, Navigation, Pagination } from 'swiper';
import {gsap} from "gsap";

let heroSlider = document.querySelector('.hero__slider');

if(heroSlider) {

  new Swiper(heroSlider, {
    modules: [Navigation, Pagination, EffectFade, Autoplay],

    effect: "fade",
    fadeEffect: { crossFade: true },
    speed: 600,
    allowTouchMove: false,

    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },

    pagination: {
      el: ".hero__slider-pagination",
      clickable: true
    },

    navigation: {
      nextEl: ".hero__slider-button-next",
      prevEl: ".hero__slider-button-prev",
    },

    on: {
      slideChangeTransitionStart: (data) => {
        gsap.fromTo('.swiper-slide-active img', {
          clipPath: 'circle(0)'
        }, {
          clipPath: 'circle(100%)',
          duration: 1.5,
          ease: 'ease-in'
        })

        gsap.fromTo('.swiper-slide-active h2', {
          opacity: 0,
          y: 50
        }, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'ease-in'
        })

        gsap.fromTo('.swiper-slide-active p', {
          opacity: 0,
        }, {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'ease-in'
        })
      }
    }
  });
}
