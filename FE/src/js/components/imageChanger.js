import { addClass, removeClass } from "../utils/utils";
import { CLASS_NAME, MAX_PERCENTAGE } from "../utils/constants";
import { forecastImages, selectViewImage } from "./forecast";

let imageLength = null;
const imageChangePoint = [];
const latestImage = {
  elem: null,
  index: null,
};

const setImageChangePoint = () => {
  imageLength = forecastImages().length;
  const basePoint = Math.floor(MAX_PERCENTAGE / imageLength);
  let point = basePoint;
  while (point <= MAX_PERCENTAGE) {
    imageChangePoint.push(point);
    point += basePoint;
  }
};

const initlatestImage = () => {
  [latestImage.elem] = forecastImages();
  latestImage.index = 0;
};

const setNextImage = () => {
  latestImage.index += 1;
  latestImage.elem = selectViewImage(forecastImages(), latestImage.index);
};

const setPrevImage = () => {
  latestImage.index -= 1;
  latestImage.elem = selectViewImage(forecastImages(), latestImage.index);
};

const changeClassAndimage = changeImageFunction => {
  removeClass(CLASS_NAME.active, latestImage.elem);
  changeImageFunction();
  addClass(CLASS_NAME.active, latestImage.elem);
};

const changePrevImage = posX => {
  if (latestImage.index <= 0) return;
  if (posX >= imageChangePoint[latestImage.index]) return;
  changeClassAndimage(setPrevImage);
};

export const changeNextImage = posX => {
  if (latestImage.index >= imageLength - 1) return;
  if (posX < imageChangePoint[latestImage.index]) return;
  changeClassAndimage(setNextImage);
};

export const changeImage = (percentage, latestPercentage, posX) => {
  if (percentage > latestPercentage) changeNextImage(posX + percentage);
  else changePrevImage(posX + percentage);
};

export const resetLatestImage = () => {
  changeClassAndimage(initlatestImage);
};

export const initImageChanger = () => {
  initlatestImage();
  setImageChangePoint();
};
