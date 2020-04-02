import { CLASS_NAME } from "../utils/constants";
import { _q, reverseClass } from "../utils/utils";
import { dustContents } from "./dustStatus";
import { forecastContents } from "./forecast";

const tabElem = {
  tabs: _q(`.${CLASS_NAME.tabs}`),
  dustTab: _q(`.${CLASS_NAME.dustTab}`),
  forecastTab: _q(`.${CLASS_NAME.forecastTab}`),
};

const changeTab = event => {
  event.preventDefault();
  if (event.target === tabElem.dustTab) {
    reverseClass(CLASS_NAME.active, tabElem.dustTab, tabElem.forecastTab);
    reverseClass(CLASS_NAME.hidden, forecastContents, dustContents);
    return;
  }
  reverseClass(CLASS_NAME.active, tabElem.forecastTab, tabElem.dustTab);
  reverseClass(CLASS_NAME.hidden, dustContents, forecastContents);
};

export default () => {
  tabElem.tabs.addEventListener("touchend", event => changeTab(event));
  tabElem.tabs.addEventListener("click", event => changeTab(event));
};
