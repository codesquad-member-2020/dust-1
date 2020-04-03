import { API_URL } from "../utils/constants";
import { renderStatus, renderStationName, showErrorMessage } from "./dustStatus";
import { renderGraph, addGraphScrollEvent } from "./graph";
import { renderForecast } from "./forecast";
import addProgressBarTouchEvent from "./progressBar";
import { initImageChanger } from "./imageChanger";

const isDataValid = data => data.pm10Value >= 0;

export const getDailyDustStatus = stationName => {
  fetch(API_URL.dailyDustStatus(stationName), {
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
    .catch(() => showErrorMessage());
};

export const getNearestDustStation = (latitude, longitude) => {
  fetch(API_URL.nearestDustStation(latitude, longitude), {
    method: "GET",
  })
    .then(response => response.json())
    .then(stationData => {
      const { stationName, _ignore } = stationData;
      renderStationName(stationName);
      getDailyDustStatus(stationName);
    })
    .catch(() => showErrorMessage());
};

export const getForecast = () => {
  fetch(API_URL.forecast, {
    method: "GET",
  })
    .then(response => response.json())
    .then(forecastData => {
      renderForecast(forecastData);
      initImageChanger();
      addProgressBarTouchEvent();
    });
};
