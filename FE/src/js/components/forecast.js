import { _q, _qa, addClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT } from "../utils/constants";

export const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

const forecastElem = {
  imagesWrap: _q(`.${CLASS_NAME.forecastImagesWrap}`),
  images: null,
  inform: _q(`.${CLASS_NAME.forecastInform}`),
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
  forecastElem.inform.innerHTML = forecastInformContent(informOverall, informGrade);
  forecastElem.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElem.images = _qa(`.${CLASS_NAME.forecastImage}`);
  selectViewImage(forecastElem.images);
};

export const forcastImages = () => forecastElem.images;
