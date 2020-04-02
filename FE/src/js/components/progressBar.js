import { _q, addClass, removeClass, hasClass, addMultipleEventListener } from "../utils/utils";
import { CLASS_NAME, FORECAST_PLAY_BUTTON_ICON, IMAGE_PLAY_SPEED, IMAGE_LOOP_INTERVAL, MAX_PERCENTAGE } from "../utils/constants";
import { forecastImages, selectViewImage } from "./forecast";

const progressBarElem = {
  wrap: _q(`.${CLASS_NAME.progressBarWrap}`),
  bar: _q(`.${CLASS_NAME.progressBar}`),
  playButton: _q(`.${CLASS_NAME.playButton}`),
  controlButton: _q(`.${CLASS_NAME.controlButton}`),
  playButtonIcon: _q(`.${CLASS_NAME.playButtonIcon}`),
};

let progressPosX = 0;
let progressBarAnimation = null;

const selectImageIndex = images => {};

const calculateProgressBarWidth = () => {};

const moveControlButton = () => {};

const controlImages = () => {
  // latestImg = 이 전역변수에 여기에 이미지 변경한 인덱스 이미지를 담고, 다음에 이 이미지의 클래스를 삭제.
};

const setProgressBarStyle = posX => {
  progressBarElem.controlButton.style.left = `${posX}%`;
  progressBarElem.bar.style.width = `${posX}%`;
};

const resetProgressAnimation = animation => {
  progressPosX = 0;
  setProgressBarStyle(progressPosX);
  window.cancelAnimationFrame(progressBarAnimation);
  progressBarAnimation = window.requestAnimationFrame(animation);
};

const startProgressAnimation = () => {
  progressPosX += IMAGE_PLAY_SPEED;
  setProgressBarStyle(progressPosX);
  if (progressPosX <= MAX_PERCENTAGE) {
    progressBarAnimation = window.requestAnimationFrame(startProgressAnimation);
  }
  if (progressPosX >= MAX_PERCENTAGE) {
    setTimeout(() => resetProgressAnimation(startProgressAnimation), IMAGE_LOOP_INTERVAL);
  }
};

const isPlayableState = () => hasClass(CLASS_NAME.playing, progressBarElem.playButton);

const stopProgressAnimation = () => window.cancelAnimationFrame(progressBarAnimation);

const changePlayButtonState = () => {
  if (!isPlayableState()) {
    addClass(CLASS_NAME.playing, progressBarElem.playButton);
    progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.pause;
  } else {
    removeClass(CLASS_NAME.playing, progressBarElem.playButton);
    progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.play;
  }
};

const isProgressComplete = () => progressPosX >= MAX_PERCENTAGE;

const playForecastImage = event => {
  event.preventDefault();
  if (!isPlayableState()) startProgressAnimation();
  else stopProgressAnimation();
  if (!isProgressComplete()) changePlayButtonState();
};

export const addProgressBarTouchEvent = () => {
  addMultipleEventListener(progressBarElem.playButton, playForecastImage, "touchend", "click");
};
