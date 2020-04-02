import { _q, _qa, addClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT, FORECAST_PLAY_BUTTON_ICON, IMAGE_PLAY_SPEED, MAX_PERCENTAGE } from "../utils/constants";

export const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

const forecastElem = {
  imagesWrap: _q(`.${CLASS_NAME.forecastImagesWrap}`),
  images: null,
  inform: _q(`.${CLASS_NAME.forecastInform}`),
  progressBarWrap: _q(`.${CLASS_NAME.progressBarWrap}`),
  progressBar: _q(`.${CLASS_NAME.progressBar}`),
  playButton: _q(`.${CLASS_NAME.playButton}`),
  controlButton: _q(`.${CLASS_NAME.controlButton}`),
  playButtonIcon: _q(`.${CLASS_NAME.playButtonIcon}`),
};

let progressPosX = 0;
let progressBarAnimation = null;

const forecastInformContent = (informOverall, informGrade) => `<p class="${CLASS_NAME.forecastInformOverall}">${informOverall}</p><p class="${CLASS_NAME.forecastInformGrade}">${informGrade}</p>`;

const forecastImageContent = images =>
  images.reduce((imageElement, currentImage) => {
    const { imageUrl } = currentImage;
    imageElement += `<image class="${CLASS_NAME.forecastImage}" src="${imageUrl}" alt="${FORECAST_IMG_ALT}">`;
    return imageElement;
  }, "");

const selectViewImage = (images, index = 0) => addClass(CLASS_NAME.active, images[index]);

const selectImageIndex = images => {};

const calculateProgressBarWidth = () => {};

const moveControlButton = () => {};

const moveProgressBar = () => {
  progressPosX += IMAGE_PLAY_SPEED;
  forecastElem.controlButton.style.left = `${progressPosX}%`;
  forecastElem.progressBar.style.width = `${progressPosX}%`;
  if (progressPosX <= MAX_PERCENTAGE) {
    progressBarAnimation = requestAnimationFrame(moveProgressBar);
  }
};

const pauseImages = () => window.cancelAnimationFrame(progressBarAnimation);

const controlImages = () => {};

const changePlayButtonState = () => {
  const currentIcon = forecastElem.playButtonIcon.innerHTML;
  if (currentIcon === FORECAST_PLAY_BUTTON_ICON.play) forecastElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.pause;
  else forecastElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.play;
};

const isPlayableState = () => forecastElem.playButtonIcon.innerHTML === FORECAST_PLAY_BUTTON_ICON.play;

const isProgressComplete = () => progressPosX >= MAX_PERCENTAGE;

const playForecastImage = event => {
  event.preventDefault();
  if (isPlayableState()) moveProgressBar();
  else pauseImages();
  if (!isProgressComplete()) changePlayButtonState();
};

const addProgressBarTouchEvent = () => {
  forecastElem.playButton.addEventListener("touchend", event => playForecastImage(event));
  forecastElem.playButton.addEventListener("click", event => playForecastImage(event));
};

export const renderForecast = forecastData => {
  const { informOverall, informGrade, images } = forecastData;
  forecastElem.inform.innerHTML = forecastInformContent(informOverall, informGrade);
  forecastElem.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElem.images = _qa(`.${CLASS_NAME.forecastImage}`);
  selectViewImage(forecastElem.images);
  addProgressBarTouchEvent();
};
