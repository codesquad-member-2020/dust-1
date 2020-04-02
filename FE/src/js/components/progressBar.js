import { _q, addClass, removeClass, hasClass, addMultipleEventListener, clearClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_PLAY_BUTTON_ICON, IMAGE_PLAY_SPEED, IMAGE_LOOP_INTERVAL, MAX_PERCENTAGE } from "../utils/constants";
import { forecastImages, selectViewImage } from "./forecast";

const progressBarElem = {
  wrap: _q(`.${CLASS_NAME.progressBarWrap}`),
  bar: _q(`.${CLASS_NAME.progressBar}`),
  currentProgress: _q(`.${CLASS_NAME.currentProgress}`),
  playButton: _q(`.${CLASS_NAME.playButton}`),
  controlButton: _q(`.${CLASS_NAME.controlButton}`),
  playButtonIcon: _q(`.${CLASS_NAME.playButtonIcon}`),
};

let progressPosX = 0;
let progressBarAnimation = null;
let loopTimer = null;
let isAnimationPlayable = true;
let startTouchPosX = null;

const selectImageIndex = images => {};

const controlImages = () => {
  // latestImg = 이 전역변수에 여기에 이미지 변경한 인덱스 이미지를 담고, 다음에 이 이미지의 클래스를 삭제.
};

const setProgressBarStyle = posX => {
  progressBarElem.controlButton.style.left = `${posX}%`;
  progressBarElem.currentProgress.style.width = `${posX}%`;
};

const moveProgressBar = percentage => setProgressBarStyle(progressPosX + percentage);

const changePlayButtonState = () => {
  if (isAnimationPlayable) {
    isAnimationPlayable = false;
    addClass(CLASS_NAME.playing, progressBarElem.playButton);
    progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.pause;
    return;
  }
  isAnimationPlayable = true;
  removeClass(CLASS_NAME.playing, progressBarElem.playButton);
  progressBarElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.play;
};

const resetProgressAnimation = animation => {
  progressPosX = 0;
  setProgressBarStyle(progressPosX);
  window.cancelAnimationFrame(progressBarAnimation);
  progressBarAnimation = window.requestAnimationFrame(animation);
};

const loopProgressAnimation = () => {
  progressPosX += IMAGE_PLAY_SPEED;
  setProgressBarStyle(progressPosX);
  if (progressPosX < MAX_PERCENTAGE) {
    progressBarAnimation = window.requestAnimationFrame(loopProgressAnimation);
    return;
  }
  loopTimer = setTimeout(() => resetProgressAnimation(loopProgressAnimation), IMAGE_LOOP_INTERVAL);
};

const stopProgressAnimation = () => {
  clearTimeout(loopTimer);
  window.cancelAnimationFrame(progressBarAnimation);
};

const toggleProgressAnimation = event => {
  event.preventDefault();
  isAnimationPlayable ? loopProgressAnimation() : stopProgressAnimation();
  changePlayButtonState();
};

const calculateProgressBarWidth = posX => {
  const barWidth = progressBarElem.bar.offsetWidth;
  const percentage = Math.floor((posX / barWidth) * MAX_PERCENTAGE);
  const sumPercentage = progressPosX + percentage;
  if (sumPercentage >= MAX_PERCENTAGE || sumPercentage <= 0) return;
  moveProgressBar(percentage);
};

const setStartTouchPosX = event => {
  isAnimationPlayable = false;
  stopProgressAnimation();
  changePlayButtonState();
  startTouchPosX = Math.floor(event.touches[0].clientX);
};

const moveControlButton = event => {
  const currentTouchPosX = Math.floor(event.touches[0].clientX);
  const offsetPosX = currentTouchPosX - startTouchPosX;
  calculateProgressBarWidth(offsetPosX);
};

const setProgressPosX = () => {
  const [currentPosX] = progressBarElem.controlButton.style.left.split("%");
  progressPosX = parseInt(currentPosX, 10);
};

export default () => {
  addMultipleEventListener(progressBarElem.playButton, toggleProgressAnimation, "touchstart", "click");
  progressBarElem.controlButton.addEventListener("touchstart", event => setStartTouchPosX(event));
  progressBarElem.controlButton.addEventListener("touchmove", event => moveControlButton(event));
  progressBarElem.controlButton.addEventListener("touchend", () => setProgressPosX());
};
