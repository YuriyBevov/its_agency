import { minicartOpenerButton } from "../utils/nodesHelper"

export function minicartBtnAnimation() {
  if(!minicartOpenerButton.classList.contains('animated')) {
    minicartOpenerButton.classList.add('animated');
    setTimeout(() => {
      minicartOpenerButton.classList.remove('animated');
    }, 600);
  }
}
