import { _q, addClass, clearClass } from "../utils/utils";
import { CLASS_NAME, STATUS_STRING, ERROR_MESSAGE, getGradeClassName, getGradeEmoji, getGradeText, getRestGradeClassName } from "../utils/constants";

export const dustContents = _q(`.${CLASS_NAME.dustContents}`);

const dustElem = {
  emoji: _q(`.${CLASS_NAME.dustEmoji}`),
  grade: _q(`.${CLASS_NAME.dustGrade}`),
  value: _q(`.${CLASS_NAME.dustValue}`),
  time: _q(`.${CLASS_NAME.dustTime}`),
  station: _q(`.${CLASS_NAME.dustStation}`),
};

const isToday = (targetYear, targetMonth, targetDay) => {
  const currentDateTime = new Date();
  const currentYear = currentDateTime.getFullYear();
  const currentMonth = currentDateTime.getMonth() + 1;
  const currentDay = currentDateTime.getDate();
  return currentYear === parseInt(targetYear, 10) && currentMonth === parseInt(targetMonth, 10) && currentDay === parseInt(targetDay, 10);
};

const processTime = targetDateTime => {
  const [targetDate, targetTime] = targetDateTime.split(" ");
  const [targetYear, targetMonth, targetDay] = targetDate.split("-");
  let dayString = STATUS_STRING.yesterday;
  if (isToday(targetYear, targetMonth, targetDay)) dayString = STATUS_STRING.today;
  return STATUS_STRING.time(dayString, targetTime);
};

const changeBackgroundColor = (className, element) => {
  clearClass(getRestGradeClassName(className), element);
  addClass(className, element);
};

const isDuplicateData = (targetDateTime, currentTimeElement) => {
  const [, targetTime] = targetDateTime.split(" ");
  const [, currentTime] = currentTimeElement.innerHTML.split(" ");
  return targetTime === currentTime;
};

export const renderStationName = stationName => {
  dustElem.station.innerHTML = STATUS_STRING.station(CLASS_NAME.stationName, stationName);
};

export const showErrorMessage = () => {
  dustElem.emoji.innerHTML = ERROR_MESSAGE.emoji;
  dustElem.grade.innerHTML = ERROR_MESSAGE.code;
  dustElem.station.innerHTML = ERROR_MESSAGE.text;
};

export const renderStatus = dustData => {
  const { pm10Grade1h, pm10Value, dateTime } = dustData;
  if (isDuplicateData(dateTime, dustElem.time)) return;
  changeBackgroundColor(getGradeClassName(pm10Grade1h), dustContents);
  dustElem.emoji.innerHTML = getGradeEmoji(pm10Grade1h);
  dustElem.grade.innerHTML = getGradeText(pm10Grade1h);
  dustElem.value.innerHTML = STATUS_STRING.dustValue(pm10Value);
  dustElem.time.innerHTML = processTime(dateTime);
};
