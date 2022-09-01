import { changeItemCount } from './minicart/changeItemCount.js';
import { ls, cartStorageField } from "../utils/sessionStorageHelper.js";

export function initCounters() {
  const decBtns = document.querySelectorAll('.js-counter-dec');
  const incBtns = document.querySelectorAll('.js-counter-inc');

  if(decBtns && incBtns) {
      const minValue = 1;
      const maxValue = 99;

      const setValue = (operationType, value, counter, target) => {

          let itemID = Number(target.closest('.minicart-product').dataset.id);
          let storeItems = ls('get', cartStorageField)

          if(operationType === 'dec') {
            changeItemCount('dec', itemID, storeItems);
            value--;
          } else {
            changeItemCount('inc', itemID, storeItems);
            value++;
          }

          counter.textContent = value;
      }

      const onClickDecValue = (evt) => {

          let decBtn = evt.currentTarget;
          let counter =  decBtn.parentNode.querySelector('.js-counter-total');
          let currentCounterValue = Number(counter.textContent);

          if (currentCounterValue === maxValue) {
              setValue('dec',  currentCounterValue, counter, evt.currentTarget);
          }
          if(currentCounterValue > (minValue + 1) && currentCounterValue < maxValue ) {
              setValue('dec', currentCounterValue, counter, evt.currentTarget);
          } else if(currentCounterValue === 2) {
              setValue('dec',  currentCounterValue, counter, evt.currentTarget);
          }
      }

      const onClickIncValue = (evt) => {
          let incBtn = evt.currentTarget;
          let counter =  incBtn.parentNode.querySelector('.js-counter-total');
          let currentCounterValue = Number(counter.textContent);

          if(currentCounterValue === 1) {
              setValue('inc', currentCounterValue, counter, evt.currentTarget);
          } else if ( currentCounterValue > minValue && currentCounterValue < (maxValue - 1) ) {
              setValue('inc', currentCounterValue, counter, evt.currentTarget);
          } else if (currentCounterValue === (maxValue - 1) ) {
              setValue('inc', currentCounterValue, counter, evt.currentTarget);
          }
      }


      decBtns.forEach(btn => {
          btn.addEventListener('click', onClickDecValue);
      })

      incBtns.forEach(btn => {
          btn.addEventListener('click', onClickIncValue);
      })
  }
}

