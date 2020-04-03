import { _q, addClass } from "../utils/utils";
import { CLASS_NAME, LOADING_ICON, LOADING_DELAY } from "../utils/constants";

const loadingPageContent = () => {
  return `<div class="${CLASS_NAME.loadingPage}"><span class="${CLASS_NAME.loadingIcon}">${LOADING_ICON}</span></div>`;
};

export const renderLoadingPage = () => _q("body").insertAdjacentHTML("beforebegin", loadingPageContent());

export const removeLoadingPage = () => {
  const loadingPage = _q(`.${CLASS_NAME.loadingPage}`);
  addClass(CLASS_NAME.hidden, loadingPage);
  setTimeout(() => loadingPage.remove(), LOADING_DELAY);
};
