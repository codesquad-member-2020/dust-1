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
let pbAnimation = null;
let loopTimer = null;
let isAnimationPlayable = true;
let touchStartPosX = null;

let imgLength = null;
const imgChangePoint = [];
const latestImg = {
  elem: null,
  index: null,
};

const setImageChangePoint = () => {
  imgLength = forecastImages().length;
  const basePoint = Math.floor(MAX_PERCENTAGE / imgLength);
  let point = basePoint;
  while (point <= MAX_PERCENTAGE) {
    imgChangePoint.push(point);
    point += basePoint;
  }
};

const initlatestImage = () => {
  [latestImg.elem] = forecastImages();
  latestImg.index = 0;
};

const setProgressBarPosX = posX => {
  progressBarElem.controlButton.style.left = `${posX}%`;
  progressBarElem.currentProgress.style.width = `${posX}%`;
};

const moveProgressBar = percentage => setProgressBarPosX(progressPosX + percentage);

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
  setProgressBarPosX(progressPosX);
  window.cancelAnimationFrame(pbAnimation);
  pbAnimation = window.requestAnimationFrame(animation);
};

const changeImage = (posX, changePoint) => {
  if (latestImg.index >= imgLength - 1) return;
  if (posX < changePoint[latestImg.index]) return;
  removeClass(CLASS_NAME.active, latestImg.elem);
  latestImg.index += 1;
  latestImg.elem = selectViewImage(forecastImages(), latestImg.index);
  addClass(CLASS_NAME.active, latestImg.elem);
};

const resetLatestImage = () => {
  removeClass(CLASS_NAME.active, latestImg.elem);
  initlatestImage();
  addClass(CLASS_NAME.active, latestImg.elem);
};

const progressAnimation = () => {
  if (progressPosX < MAX_PERCENTAGE) {
    progressPosX += IMAGE_PLAY_SPEED;
    setProgressBarPosX(progressPosX);
    pbAnimation = window.requestAnimationFrame(progressAnimation);
    changeImage(progressPosX, imgChangePoint);
    return;
  }
  loopTimer = setTimeout(() => {
    resetProgressAnimation(progressAnimation);
    resetLatestImage();
  }, IMAGE_LOOP_INTERVAL);
};

const stopProgressAnimation = () => {
  clearTimeout(loopTimer);
  window.cancelAnimationFrame(pbAnimation);
};

const toggleProgressAnimation = event => {
  event.preventDefault();
  isAnimationPlayable ? progressAnimation() : stopProgressAnimation();
  changePlayButtonState();
};

const changeProgressBarWidth = posX => {
  const barWidth = progressBarElem.bar.offsetWidth;
  const percentage = Math.floor((posX / barWidth) * MAX_PERCENTAGE);
  const sumPercentage = progressPosX + percentage;
  if (sumPercentage >= MAX_PERCENTAGE || sumPercentage <= 0) return;
  moveProgressBar(percentage);
};

const setTouchStartPosX = event => {
  isAnimationPlayable = false;
  stopProgressAnimation();
  changePlayButtonState();
  touchStartPosX = event.touches[0].clientX;
};

const changeProgressBarPosX = event => {
  const currentTouchPosX = event.touches[0].clientX;
  const offsetPosX = currentTouchPosX - touchStartPosX;
  changeProgressBarWidth(offsetPosX);
};

const changeProgressPosX = () => {
  const [currentPosX] = progressBarElem.controlButton.style.left.split("%");
  progressPosX = parseInt(currentPosX, 10);
};

export default () => {
  initlatestImage();
  setImageChangePoint();
  addMultipleEventListener(progressBarElem.playButton, toggleProgressAnimation, "touchstart", "click");
  progressBarElem.controlButton.addEventListener("touchstart", event => setTouchStartPosX(event));
  progressBarElem.controlButton.addEventListener("touchmove", event => changeProgressBarPosX(event));
  progressBarElem.controlButton.addEventListener("touchend", () => changeProgressPosX());
};
