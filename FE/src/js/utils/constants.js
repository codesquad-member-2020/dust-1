export const CLASS_NAME = {
  graphs: "dust-graph",
  graphWrap: "graph-wrap",
  graph: "graph",
  dustValue: "value",
  placeholder: "placeholder",
  grade1: "good",
  grade2: "normal",
  grade3: "bad",
  grade4: "very-bad",
};

export const MAX_DUST_VALUE = 200;

export const GPS_ALERT_MESSAGE = "GPS가 지원되지 않습니다. 측정소는 강남구로 설정됩니다.";

export const URL = {
  serverURL: "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/",
  nearestDustStation: (latitude, longitude) => `${URL.serverURL}location/@={${latitude},${longitude}}`,
  dailyDustStatus: stationLocation => `${URL.serverURL}${stationLocation}/daily-dust-status`,
};

export const DEFAULT_STATION_LOCATION = "서울 강남구 학동로 426강남구청 별관 1동";
