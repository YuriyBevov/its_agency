import './modules/swiper.js';
import './modules/counter.js';
import './modules/modals.js';
//import './modules/swipe.js';


document.querySelector('.filter').addEventListener('pointerdown', function(evt){
  console.log(evt.clientX, evt.clientY); // drag origin coordinates
});
