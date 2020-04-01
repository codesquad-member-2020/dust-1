export const CLASS_NAME = {
  tabs: "tab",
  dustTab: "tab-dust",
  forecastTab: "tab-forecast",
  dustContents: "dust-wrap",
  forecastContents: "forecast-wrap",
  dustEmoji: "dust-emoji",
  dustGrade: "dust-grade",
  dustValue: "dust-value",
  dustTime: "dust-time",
  dustStation: "dust-station",
  stationName: "station-name",
  graphs: "dust-graph",
  graphWrap: "graph-wrap",
  graph: "graph",
  graphValue: "value",
  placeholder: "placeholder",
  grade1: "good",
  grade2: "normal",
  grade3: "bad",
  grade4: "very-bad",
};

export const STATUS_STRING = {
  today: "오늘",
  yesterday: "어제",
  dustValue: value => `${value}𝜇g/m³`,
  time: (dayString, time) => `${dayString} ${time}`,
  station: (className, stationName) => `<strong class="${className}">${stationName}</strong> 측정소 기준`,
};

export const MAX_DUST_VALUE = 200;

export const MIN_PERCENTAGE = 6;

export const DEFAULT_STATION = {
  name: "강남구",
  loaction: "서울 강남구 학동로 426강남구청 별관 1동",
};

export const GPS_ALERT_MESSAGE = `GPS가 지원되지 않습니다. 측정소는 ${DEFAULT_STATION.name}로 설정됩니다.`;

export const URL = {
  serverURL: "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/",
  nearestDustStation: (latitude, longitude) => `${URL.serverURL}location/@={${latitude},${longitude}}`,
  dailyDustStatus: stationLocation => `${URL.serverURL}${stationLocation}/daily-dust-status`,
};
