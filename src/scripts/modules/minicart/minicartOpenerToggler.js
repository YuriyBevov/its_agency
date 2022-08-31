import { minicartNode, minicartFooter, minicartEmptyNode, minicartOpenerButton } from "../../utils/nodesHelper";

export function minicartOpenerDisabling(bool) {
  if(bool) {
    isMinicartOpenerDisabled = true;
    minicartNode.classList.add('hidden');
    minicartFooter.classList.add('hidden');
    minicartEmptyNode.classList.add('showed')
    minicartOpenerButton.innerHTML = 0;
    minicartOpenerButton.setAttribute('disabled', true);
  } else {
    isMinicartOpenerDisabled = false;
    minicartNode.classList.remove('hidden');
    minicartFooter.classList.remove('hidden');
    minicartEmptyNode.classList.remove('showed');

    minicartOpenerButton.innerHTML = 1;
    minicartOpenerButton.removeAttribute('disabled');
  }
}
