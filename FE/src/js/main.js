import { GPS_ALERT_MESSAGE, DEFAULT_STATION } from "./utils/constants";
import addTabTouchEvent from "./components/tab";
import getCurrentLocation from "./components/gps";
import { renderStationName } from "./components/dustStatus";
import { getNearestDustStation, getDailyDustStatus, getForecast } from "./components/fetch";
import { renderLoadingPage } from "./components/loadingPage";

renderLoadingPage();
addTabTouchEvent();

getCurrentLocation()
  .then(position => {
    const { latitude, longitude } = position.coords;
    getNearestDustStation(latitude, longitude);
  })
  .catch(() => {
    window.alert(GPS_ALERT_MESSAGE);
    renderStationName(DEFAULT_STATION);
    getDailyDustStatus(DEFAULT_STATION);
  });

getForecast();
