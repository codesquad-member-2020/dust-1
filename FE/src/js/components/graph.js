import { _q, getLastIndex, getGradeClassName } from "../utils/utils";
import { CLASS_NAME, MAX_DUST_VALUE, MIN_PERCENTAGE } from "../utils/constants";

export const graphsElement = _q(`.${CLASS_NAME.graphs}`);

const calculateGraphWidth = dustValue => {
  const percentage = Math.floor((dustValue / MAX_DUST_VALUE) * 100);
  if (percentage > 100) return 100;
  if (percentage <= MIN_PERCENTAGE) return MIN_PERCENTAGE;
  return percentage;
};

const graphsContents = dustData =>
  dustData.reduce((graphElement, currentData) => {
    graphElement += `<div class="${CLASS_NAME.graphWrap}" style="width:${calculateGraphWidth(currentData.pm10Value)}%">
  <div class="${CLASS_NAME.graph} ${getGradeClassName(currentData.pm10Grade1h)}">
  <span class="${CLASS_NAME.graphValue}">${currentData.pm10Value}</span></div></div>`;
    return graphElement;
  }, "");

export const renderGraph = dustData => {
  graphsElement.innerHTML = `${graphsContents(dustData)}<div class="${CLASS_NAME.placeholder}"></div>`;
};

export const getScrollTopGraphData = (event, dustData) => {
  const graphHeight = _q(`.${CLASS_NAME.graph}`).offsetHeight;
  const { scrollTop } = event.srcElement;
  const dustDataLength = dustData.length;
  for (let index = 1; index < dustDataLength; index += 1) {
    const prevGraphScrollTop = graphHeight * (index - 1);
    const graphScrollTop = graphHeight * index;
    if (scrollTop >= prevGraphScrollTop && scrollTop < graphScrollTop) {
      return dustData[index - 1];
    }
  }
  return dustData[getLastIndex(dustDataLength)];
};
