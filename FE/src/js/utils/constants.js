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
  graph: "graph",
  graphWrap: "graph-wrap",
  graphValue: "value",
  forecastImages: "forecast-images",
  forecastImage: "forecast-image",
  forecastInform: "forecast-inform",
  forecastInformOverall: "forecast-inform-overall",
  forecastInformGrade: "forecast-inform-grade ",
  progressBarIcon: "material-icons",
  placeholder: "placeholder",
  grade1: "good",
  grade2: "normal",
  grade3: "bad",
  grade4: "very-bad",
  active: "active",
  hidden: "hidden",
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

export const DEFAULT_STATION = "강남구";

export const ERROR_MESSAGE = {
  emoji: "😭",
  code: "404",
  text: "서버가 응답하지 않습니다.",
};

export const GPS_ALERT_MESSAGE = `GPS가 지원되지 않습니다. 측정소는 ${DEFAULT_STATION}로 설정됩니다.`;

export const FORECAST_IMG_ALT = "미세먼지 예보 이미지";

export const FORECAST_PLAY_BUTTON = {
  play: "play_arrow",
  pause: "pause",
};

const serverURL = "http://ec2-15-164-254-158.ap-northeast-2.compute.amazonaws.com:8080/";

export const API_URL = {
  nearestDustStation: (latitude, longitude) => `${serverURL}location/@=${latitude},${longitude}`,
  dailyDustStatus: stationLocation => `${serverURL}${stationLocation}/daily-dust-status`,
  forecast: `${serverURL}forecast`,
};

export const getRestGradeClassName = className => {
  const gradeClassList = [CLASS_NAME.grade1, CLASS_NAME.grade2, CLASS_NAME.grade3, CLASS_NAME.grade4];
  return gradeClassList.filter(gradeClass => gradeClass !== className);
};

export const getGradeClassName = grade => {
  const gradeClass = {
    1: CLASS_NAME.grade1,
    2: CLASS_NAME.grade2,
    3: CLASS_NAME.grade3,
    4: CLASS_NAME.grade4,
  };
  return gradeClass[grade] || null;
};

export const getGradeEmoji = grade => {
  const gradeEmoji = {
    1: "😀",
    2: "🙂",
    3: "😷",
    4: "😱",
  };
  return gradeEmoji[grade] || null;
};

export const getGradeText = grade => {
  const gradeText = {
    1: "좋음",
    2: "보통",
    3: "나쁨",
    4: "매우 나쁨",
  };
  return gradeText[grade] || null;
};
