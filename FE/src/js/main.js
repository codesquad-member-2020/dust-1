import "./components/tab";
import fetchData from "./components/fetch";
import { renderStationName } from "./components/dustStatus";
import { GPS_ALERT_MESSAGE, DEFAULT_STATION } from "./utils/constants";

const gps = navigator.geolocation;

const successGetCurrentPosition = position => {
  const { latitude, longitude } = position.coords;
  fetchData.getDailyDustStatus(fetchData.getNearestDustStation(latitude, longitude));
};

const errorGetCurrentPosition = () => {
  window.alert(GPS_ALERT_MESSAGE);
  renderStationName(DEFAULT_STATION.name);
  fetchData.getDailyDustStatus(DEFAULT_STATION.location);
};

if (!gps) errorGetCurrentPosition();
else gps.getCurrentPosition(successGetCurrentPosition, errorGetCurrentPosition);
