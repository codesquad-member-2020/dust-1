import { _q, getGradeClassName, getGradeEmoji, getGradeText, addClass, clearClass, getRestGradeClassName } from "../utils/utils";
import { CLASS_NAME, STATUS_STRING } from "../utils/constants";

export const dustContents = _q(`.${CLASS_NAME.dustContents}`);

const emojiElement = _q(`.${CLASS_NAME.dustEmoji}`);
const gradeElement = _q(`.${CLASS_NAME.dustGrade}`);
const valueElement = _q(`.${CLASS_NAME.dustValue}`);
const timeElement = _q(`.${CLASS_NAME.dustTime}`);
const stationElement = _q(`.${CLASS_NAME.dustStation}`);

const isToday = (targetYear, targetMonth, targetDay) => {
  const todayDateTime = new Date();
  const todayYear = todayDateTime.getFullYear();
  const todayMonth = todayDateTime.getMonth() + 1;
  const todayDay = todayDateTime.getDate();
  return todayYear === parseInt(targetYear, 10) && todayMonth === parseInt(targetMonth, 10) && todayDay === parseInt(targetDay, 10);
};

const processTime = targetDateTime => {
  const [targetDate, targetTime] = targetDateTime.split(" ");
  const [targetYear, targetMonth, targetDay] = targetDate.split("-");
  let dayString = STATUS_STRING.yesterday;
  if (isToday(targetYear, targetMonth, targetDay)) dayString = STATUS_STRING.today;
  return STATUS_STRING.time(dayString, targetTime);
};

const changeBackgroundColor = (element, className) => {
  clearClass(element, getRestGradeClassName(className));
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

export const renderStatus = dustData => {
  const { pm10Grade1h, pm10Value, dateTime } = dustData;
  if (isDuplicateData(dateTime, timeElement)) return;
  changeBackgroundColor(dustContents, getGradeClassName(pm10Grade1h));
  emojiElement.innerHTML = getGradeEmoji(pm10Grade1h);
  gradeElement.innerHTML = getGradeText(pm10Grade1h);
  valueElement.innerHTML = STATUS_STRING.dustValue(pm10Value);
  timeElement.innerHTML = processTime(dateTime);
};
