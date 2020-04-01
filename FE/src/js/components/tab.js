import { _q, addClass, removeClass, toggleClass } from "../utils/utils";

const tabs = _q(".tab");
const dustTab = _q(".tab-dust");
const forecastTab = _q(".tab-forecast");
const dustContent = _q(".dust-wrap");
const forecastContent = _q(".forecast-wrap");

tabs.addEventListener("click", event => {
  if (event.target === dustTab) {
    addClass("active", dustTab);
    removeClass("active", forecastTab);
    addClass("hidden", forecastContent);
    removeClass("hidden", dustContent);
    return;
  }
  removeClass("active", dustTab);
  addClass("active", forecastTab);
  removeClass("hidden", forecastContent);
  addClass("hidden", dustContent);
});
