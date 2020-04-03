import { _q, _qa, addClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT, INFORM_REGEX } from "../utils/constants";

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

export const selectViewImage = (images, index = 0) => images[index];

export const renderForecast = forecastData => {
  const { informOverall, informGrade, images } = forecastData;
  const filteredInformOverall = informOverall.replace(INFORM_REGEX, "");
  forecastElem.inform.innerHTML = forecastInformContent(filteredInformOverall, informGrade);
  forecastElem.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElem.images = _qa(`.${CLASS_NAME.forecastImage}`);
  addClass(CLASS_NAME.active, selectViewImage(forecastElem.images));
};

export const forecastImages = () => forecastElem.images;
