/*
svg(style="overflow: visible;" width="40" height="40" viewBox="0 0 40 40").cursor
  //фильтр
  filter(id="cursor-filter")
    feTurbulence(type="fractalNoise" baseFrequency="1.5" numOctaves="5" result="turbulence")
    feDisplacementMap(in2="turbulence" in="SourceGraphic" scale="5" xChannelSelector="R" yChannelSelector="G")
  // курсор
  //rect( filter="url(#cursor-filter)" x="0" y="0" width="30" height="30" fill="transparent" stroke="black" stroke-width="2").cursor-cursor__inner
  circle(filter="url(#cursor-filter)" cx="20" cy="20" r="20" fill="transparent" stroke="black" stroke-width="3").cursor-inner

  svg(style="overflow: visible;" data-amt="0.25" width="40" height="40" viewBox="0 0 40 40").cursor
    //rect( filter="url(#cursor-filter)" x="0" y="0" width="30" height="30" fill="transparent" stroke="black" stroke-width="2").cursor-inner
    circle(filter="url(#cursor-filter)" cx="20" cy="20" r="10" fill="transparent" stroke="black" stroke-width="2").cursor-inner

  svg(style="overflow: visible;" data-amt="0.30" width="40" height="40" viewBox="0 0 40 40").cursor
    //rect( filter="url(#cursor-filter)" x="0" y="0" width="30" height="30" fill="transparent" stroke="black" stroke-width="2").cursor-inner
    circle(filter="url(#cursor-filter)" cx="20" cy="20" r="5" fill="transparent" stroke="black" stroke-width="2").cursor-inner
*/

import { Cursor } from '../utils/Cursor.js';

console.log(Cursor)
new Cursor(document.querySelectorAll('.cursor'), '.gsap-cursor-trigger, button');

/*
  Вторым аргументом можно передать селекторы триггеров,
  при которых запускается анимация курсора при наведении.
  По ум-ю: .gsap-cursor-trigger.
  Вся кастомизация внутри класса
*/

