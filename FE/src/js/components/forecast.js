import { _q, _qa, addClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT, FORECAST_PLAY_BUTTON_ICON, IMAGE_PLAY_SPEED } from "../utils/constants";

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

const forecastInformContent = (informOverall, informGrade) => `<p class="${CLASS_NAME.forecastInformOverall}">${informOverall}</p><p class="${CLASS_NAME.forecastInformGrade}">${informGrade}</p>`;

const forecastImageContent = images =>
  images.reduce((imageElement, currentImage) => {
    const { imageUrl } = currentImage;
    imageElement += `<image class="${CLASS_NAME.forecastImage}" src="${imageUrl}" alt="${FORECAST_IMG_ALT}">`;
    return imageElement;
  }, "");

const selectViewImage = (images, index = 0) => addClass(CLASS_NAME.active, images[index]);

const changePlayButtonIcon = () => {
  const currentIcon = forecastElem.playButtonIcon.innerHTML;
  if (currentIcon === FORECAST_PLAY_BUTTON_ICON.play) forecastElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.pause;
  else forecastElem.playButtonIcon.innerHTML = FORECAST_PLAY_BUTTON_ICON.play;
};

const calculateProgressBarWidth = () => {};

const moveControlButton = () => {};

let startPosX = 0;
const playImages = () => {
  startPosX += IMAGE_PLAY_SPEED;
  forecastElem.controlButton.style.left = `${startPosX}%`;
  forecastElem.progressBar.style.width = `${startPosX}%`;
  if (startPosX <= 100) {
    window.requestAnimationFrame(playImages);
  }
};

const pauseImages = () => {};

const controlImages = () => {};

const addProgressBarTouchEvent = () => {
  forecastElem.playButton.addEventListener("click", event => {
    console.log(event.target);
    changePlayButtonIcon();
    playImages();
  });
};

export const renderForecast = forecastData => {
  const { informOverall, informGrade, images } = forecastData;
  forecastElem.inform.innerHTML = forecastInformContent(informOverall, informGrade);
  forecastElem.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElem.images = _qa(`.${CLASS_NAME.forecastImage}`);
  selectViewImage(forecastElem.images);
  addProgressBarTouchEvent();
};
