import { setVieportHeight } from '../utils/helpers.js';
import { body } from "../utils/nodesHelper.js";

document.addEventListener('DOMContentLoaded', () => {
  let content = document.querySelectorAll('svg, img, video, audio');
  let i;

  content.forEach(item => {
    if(i === content.length - 1) {
      item.onload = function() {
        i++;
      };
    } else {
      body.classList.remove('loading');
    }
  });

  setVieportHeight();
});


