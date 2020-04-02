import { _q } from "../utils/utils";
import { CLASS_NAME, FORECAST_PLAY_BUTTON_ICON, IMAGE_PLAY_SPEED, MAX_PERCENTAGE } from "../utils/constants";
import { forecastImages } from "./forecast";

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

const controlImages = () => {};

const moveProgressBar = () => {
  progressPosX += IMAGE_PLAY_SPEED;
  progressBarElem.controlButton.style.left = `${progressPosX}%`;
  progressBarElem.bar.style.width = `${progressPosX}%`;
  if (progressPosX <= MAX_PERCENTAGE) {
    progressBarAnimation = requestAnimationFrame(moveProgressBar);
  }
};

const pauseImages = () => window.cancelAnimationFrame(progressBarAnimation);

const changePlayButtonState = () => {
  const currentIcon = progressBarElem.playButtonIcon.innerHTML;
  if (currentIcon === FORECAST_PLAY_BUTTON_ICON.play) progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.pause;
  else progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.play;
};

const isPlayableState = () => progressBarElem.playButtonIcon.innerHTML === FORECAST_PLAY_BUTTON_ICON.play;

const isProgressComplete = () => progressPosX >= MAX_PERCENTAGE;

const playForecastImage = event => {
  event.preventDefault();
  if (isPlayableState()) moveProgressBar();
  else pauseImages();
  if (!isProgressComplete()) changePlayButtonState();
};

export const addProgressBarTouchEvent = () => {
  progressBarElem.playButton.addEventListener("touchend", event => playForecastImage(event));
  progressBarElem.playButton.addEventListener("click", event => playForecastImage(event));
};
