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

export const changeImage = posX => {
  if (latestImage.index >= imageLength - 1) return;
  if (posX < imageChangePoint[latestImage.index]) return;
  removeClass(CLASS_NAME.active, latestImage.elem);
  setNextImage();
  addClass(CLASS_NAME.active, latestImage.elem);
};

export const resetLatestImage = () => {
  removeClass(CLASS_NAME.active, latestImage.elem);
  initlatestImage();
  addClass(CLASS_NAME.active, latestImage.elem);
};

export const initImageChanger = () => {
  initlatestImage();
  setImageChangePoint();
};
