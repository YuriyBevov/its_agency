import { cartNode, cartFooter, cartEmptyNode, cartOpenerButton } from "../../utils/nodesHelper";

export let isMinicartButtonDisabled = false;

export function minicartButtonDisabling(bool) {
  if(bool) {
    isMinicartButtonDisabled = true;
    cartNode.classList.add('hidden');
    cartFooter.classList.add('hidden');
    cartEmptyNode.classList.add('showed')
    cartOpenerButton.innerHTML = 0;
    cartOpenerButton.setAttribute('disabled', true);
  } else {
    isMinicartButtonDisabled = false;
    cartNode.classList.remove('hidden');
    cartFooter.classList.remove('hidden');
    cartEmptyNode.classList.remove('showed');

    cartOpenerButton.innerHTML = 1;
    cartOpenerButton.removeAttribute('disabled');
  }
}
