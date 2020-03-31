import { URL } from "../utils/constants";
import { graphsElement, renderGraph, getScrollTopGraphData } from "./graph";

export default {
  getNearestDustStation: (latitude, longitude) => {
    fetch(URL.nearestDustStation(latitude, longitude), {
      method: "GET",
    })
      .then(response => response.json())
      .then(stationData => stationData.location)
      .catch(error => console.error(error));
  },

  getDailyDustStatus: stationLocation => {
    fetch(URL.dailyDustStatus(stationLocation), {
      method: "GET",
    })
      .then(response => response.json())
      .then(json => json.filter(data => data.pm10Grade1h >= 0))
      .then(dustData => {
        renderGraph(dustData);
        graphsElement.addEventListener("scroll", event => getScrollTopGraphData(event, dustData));
      })
      .catch(error => console.error(error));
  },
};
