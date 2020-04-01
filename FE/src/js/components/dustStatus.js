import { _q, getGradeClassName, getGradeEmoji, getGradeText, addClass, clearClass, getRestGradeClassName } from "../utils/utils";
import { CLASS_NAME, STATUS_STRING, ERROR_MESSAGE } from "../utils/constants";

export const dustContents = _q(`.${CLASS_NAME.dustContents}`);

const emojiElement = _q(`.${CLASS_NAME.dustEmoji}`);
const gradeElement = _q(`.${CLASS_NAME.dustGrade}`);
const valueElement = _q(`.${CLASS_NAME.dustValue}`);
const timeElement = _q(`.${CLASS_NAME.dustTime}`);
const stationElement = _q(`.${CLASS_NAME.dustStation}`);

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
  stationElement.innerHTML = STATUS_STRING.station(CLASS_NAME.stationName, stationName);
};

export const showErrorMessage = () => {
  emojiElement.innerHTML = ERROR_MESSAGE.emoji;
  gradeElement.innerHTML = ERROR_MESSAGE.code;
  stationElement.innerHTML = ERROR_MESSAGE.text;
};

export const renderStatus = dustData => {
  const { pm10Grade1h, pm10Value, dateTime } = dustData;
  if (isDuplicateData(dateTime, timeElement)) return;
  changeBackgroundColor(getGradeClassName(pm10Grade1h), dustContents);
  emojiElement.innerHTML = getGradeEmoji(pm10Grade1h);
  gradeElement.innerHTML = getGradeText(pm10Grade1h);
  valueElement.innerHTML = STATUS_STRING.dustValue(pm10Value);
  timeElement.innerHTML = processTime(dateTime);
};
