import { _q, _qa, addClass } from "../utils/utils";
import { CLASS_NAME, FORECAST_IMG_ALT, INFORM_REGEX, TABLE_HEAD_TEXT, TABLE_COLUMN } from "../utils/constants";

export const forecastContents = _q(`.${CLASS_NAME.forecastContents}`);

const forecastElem = {
  imagesWrap: _q(`.${CLASS_NAME.forecastImagesWrap}`),
  images: null,
  inform: _q(`.${CLASS_NAME.forecastInform}`),
  table: _q(CLASS_NAME.table),
};

const forecastInformContent = informOverall => `<p class="${CLASS_NAME.forecastInformOverall}">${informOverall}</p>`;

const forecastInformGradeTable = informGrade => {
  let tableContent = TABLE_HEAD_TEXT;
  tableContent += informGrade.reduce((gradeContent, wordElem, index) => {
    let word = "";
    if (index === 0 || index % TABLE_COLUMN === 0) word = `<tr><td>${wordElem}</td>`;
    else if ((index + 1) % TABLE_COLUMN === 0) word = `<td>${wordElem}</td></tr>`;
    else word = `<td>${wordElem}</td>`;
    gradeContent += word;
    return gradeContent;
  }, "");
  return tableContent;
};

const forecastImageContent = images =>
  images.reduce((imageElement, currentImage) => {
    const { imageUrl } = currentImage;
    imageElement += `<image class="${CLASS_NAME.forecastImage}" src="${imageUrl}" alt="${FORECAST_IMG_ALT}">`;
    return imageElement;
  }, "");

export const selectViewImage = (images, index = 0) => images[index];

export const renderForecast = forecastData => {
  const { informOverall, informGrade, images } = forecastData;
  const filteredInformOverall = informOverall.replace(INFORM_REGEX.overall, "");
  const filteredinformGrade = informGrade
    .replace(INFORM_REGEX.whitespace, "")
    .replace(INFORM_REGEX.specialCharacters, " ")
    .split(" ");
  forecastElem.inform.innerHTML = forecastInformContent(filteredInformOverall);
  forecastElem.table.innerHTML = forecastInformGradeTable(filteredinformGrade);
  forecastElem.imagesWrap.innerHTML = forecastImageContent(images);
  forecastElem.images = _qa(`.${CLASS_NAME.forecastImage}`);
  addClass(CLASS_NAME.active, selectViewImage(forecastElem.images));
};

export const forecastImages = () => forecastElem.images;
