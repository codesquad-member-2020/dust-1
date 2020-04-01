import { getDailyDustStatus, getNearestDustStation } from "./fetch";
import { renderStationName } from "./dustStatus";
import { GPS_ALERT_MESSAGE, DEFAULT_STATION } from "../utils/constants";

const gps = navigator.geolocation;

const successGetCurrentPosition = position => {
  const { latitude, longitude } = position.coords;
  getNearestDustStation(latitude, longitude);
};

const errorGetCurrentPosition = () => {
  window.alert(GPS_ALERT_MESSAGE);
  renderStationName(DEFAULT_STATION);
  getDailyDustStatus(DEFAULT_STATION);
};

export default () => {
  if (!gps) errorGetCurrentPosition();
  else gps.getCurrentPosition(successGetCurrentPosition, errorGetCurrentPosition);
};
