import { CLASS_NAME } from "../utils/constants";
import { _q, reverseClass } from "../utils/utils";
import { dustContents } from "./dustStatus";

const tabs = _q(`.${CLASS_NAME.tabs}`);
const dustTab = _q(`.${CLASS_NAME.dustTab}`);
const forecastTab = _q(`.${CLASS_NAME.forecastTab}`);
const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

const changeTab = event => {
  event.preventDefault();
  if (event.target === dustTab) {
    reverseClass(CLASS_NAME.active, dustTab, forecastTab);
    reverseClass(CLASS_NAME.hidden, forecastContents, dustContents);
    return;
  }
  reverseClass(CLASS_NAME.active, forecastTab, dustTab);
  reverseClass(CLASS_NAME.hidden, dustContents, forecastContents);
};

tabs.addEventListener("touchend", event => changeTab(event));
tabs.addEventListener("click", event => changeTab(event));
