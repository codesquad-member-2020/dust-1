import "./components/tab";
import fetchData from "./components/fetch";
import { GPS_ALERT_MESSAGE, DEFAULT_STATION_LOCATION } from "./utils/constants";
import { DUST_STATUS } from "./utils/mockData";
import { renderGraph } from "./components/graph";

const gps = navigator.geolocation;

renderGraph(DUST_STATUS);

const successGetCurrentPosition = position => {
  const { latitude, longitude } = position.coords;
  fetchData.getDailyDustStatus(fetchData.getNearestDustStation(latitude, longitude));
};

const errorGetCurrentPosition = () => {
  window.alert(GPS_ALERT_MESSAGE);
  fetchData.getDailyDustStatus(DEFAULT_STATION_LOCATION);
};

if (!gps) {
  errorGetCurrentPosition();
} else {
  gps.getCurrentPosition(successGetCurrentPosition, errorGetCurrentPosition);
}
