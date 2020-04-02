import { _q, _qa, addClass, clearClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT } from "../utils/constants";

export const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

const forecastElements = {
  imagesWrap: _q(`.${CLASS_NAME.forecastImagesWrap}`),
  images: null,
  inform: _q(`.${CLASS_NAME.forecastInform}`),
  progressBarIcon: _q(`${CLASS_NAME.progressBarIcon}`),
};

const forecastInformContent = (informOverall, informGrade) => `<p class="${CLASS_NAME.forecastInformOverall}">${informOverall}</p><p class="${CLASS_NAME.forecastInformGrade}">${informGrade}</p>`;

const forecastImageContent = images =>
  images.reduce((imageElement, currentImage) => {
    const { imageUrl } = currentImage;
    imageElement += `<image class="${CLASS_NAME.forecastImage}" src="${imageUrl}" alt="${FORECAST_IMG_ALT}">`;
    return imageElement;
  }, "");

const selectViewImage = (images, index = 0) => addClass(CLASS_NAME.active, images[index]);

export const renderForecast = forecastData => {
  const { informOverall, informGrade, images } = forecastData;
  forecastElements.inform.innerHTML = forecastInformContent(informOverall, informGrade);
  forecastElements.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElements.images = _qa(`.${CLASS_NAME.forecastImage}`);
  selectViewImage(forecastElements.images);
};

const changePlayButtonIcon = () => {
  //  play_arrow or pause
};

const calculateProgressBarWidth = () => {};

const addPlayButtonTouchEvent = () => {};

const addControlButtonTouchEvent = () => {};

const controlImage = () => {};
