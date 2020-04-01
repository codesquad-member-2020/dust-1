import { CLASS_NAME } from "../utils/constants";
import { _q, reverseClass } from "../utils/utils";
import { dustContents } from "./dustStatus";

const tabs = _q(`.${CLASS_NAME.tabs}`);
const dustTab = _q(`.${CLASS_NAME.dustTab}`);
const forecastTab = _q(`.${CLASS_NAME.forecastTab}`);
const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

tabs.addEventListener("touchend", event => {
  if (event.target === dustTab) {
    reverseClass("active", dustTab, forecastTab);
    reverseClass("hidden", forecastContents, dustContents);
    return;
  }
  reverseClass("active", forecastTab, dustTab);
  reverseClass("hidden", dustContents, forecastContents);
});
