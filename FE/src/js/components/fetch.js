import { URL } from "../utils/constants";
import { renderStatus, renderStationName } from "./dustStatus";
import { renderGraph, addGraphScrollEvent } from "./graph";

const isDataValid = data => data.pm10Value >= 0;

export default {
  getNearestDustStation: (latitude, longitude) => {
    fetch(URL.nearestDustStation(latitude, longitude), {
      method: "GET",
    })
      .then(response => response.json())
      .then(stationData => {
        const { stationName, location } = stationData;
        renderStationName(stationName);
        return location;
      })
      .catch(error => console.error(error));
  },

  getDailyDustStatus: stationLocation => {
    fetch(URL.dailyDustStatus(stationLocation), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => json.filter(data => isDataValid(data)))
      .then(dustData => {
        const latestDustData = dustData[0];
        renderStatus(latestDustData);
        renderGraph(dustData);
        addGraphScrollEvent(renderStatus, dustData);
      })
      .catch(error => console.error(error));
  },
};
