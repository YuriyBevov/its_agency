import { addClass, removeClass, checkClass } from '../utils/helpers.js';

const decBtns = document.querySelectorAll('.js-counter-dec');
const incBtns = document.querySelectorAll('.js-counter-inc');

if(decBtns && incBtns) {
    const minValue = 1;
    const maxValue = 99;

    const setValue = (operationType, value, counter) => {
        operationType === 'dec' ?
        value -= 1 :
        operationType === 'inc' ?
        value += 1 : null;

        counter.innerHTML = value;
    }

    const onClickDecValue = (evt) => {

        let decBtn = evt.currentTarget;
        let counter =  decBtn.parentNode.querySelector('.js-counter-total');
        let currentCounterValue = Number(counter.innerHTML);

        if (currentCounterValue === maxValue) {
            let disabledIncBtn = decBtn.parentNode.querySelector('.js-counter-inc');
            removeClass(disabledIncBtn, 'disabled');
            setValue('dec',  currentCounterValue, counter);
        }
        if(currentCounterValue > (minValue + 1) && currentCounterValue < maxValue ) {
            checkClass(decBtn, 'disabled') ?
            removeClass(decBtn, 'disabled') : null;
            setValue('dec', currentCounterValue, counter);
        } else if(currentCounterValue === 2) {
            setValue('dec',  currentCounterValue, counter);
            addClass(decBtn, 'disabled');
        }
    }

    const onClickIncValue = (evt) => {
        let incBtn = evt.currentTarget;
        let counter =  incBtn.parentNode.querySelector('.js-counter-total');
        let currentCounterValue = Number(counter.innerHTML);

        if(currentCounterValue === 1) {
            let disabledDecBtn = incBtn.parentNode.querySelector('.js-counter-dec');
            removeClass(disabledDecBtn, 'disabled');
            setValue('inc', currentCounterValue, counter);
        } else if ( currentCounterValue > minValue && currentCounterValue < (maxValue - 1) ) {
            setValue('inc', currentCounterValue, counter);
        } else if (currentCounterValue === (maxValue - 1) ) {
            setValue('inc', currentCounterValue, counter);
            addClass(incBtn, 'disabled');
        }
    }


    decBtns.forEach(btn => {
        btn.addEventListener('click', onClickDecValue);
    })

    incBtns.forEach(btn => {
        btn.addEventListener('click', onClickIncValue);
    })
}

