import { _q, getObjLength, getLastIndex, getGradeClassName } from "../utils/utils";
import { CLASS_NAME, MAX_DUST_VALUE } from "../utils/constants";

export const graphsElement = _q(`.${CLASS_NAME.graphs}`);

const calculateGraphWidth = dustValue => {
  const percentage = Math.floor((dustValue / MAX_DUST_VALUE) * 100);
  return percentage > 100 ? 100 : percentage;
};

const graphsContents = dustData =>
  dustData.reduce((graphElement, currentData) => {
    graphElement += `<div class="${CLASS_NAME.graphWrap}" style="width:${calculateGraphWidth(currentData.pm10Value)}%">
  <div class="${CLASS_NAME.graph} ${getGradeClassName(currentData.pm10Grade1h)}">
  <span class="${CLASS_NAME.dustValue}">${currentData.pm10Value}</span></div></div>`;
    return graphElement;
  }, "");

export const renderGraph = dustData => {
  graphsElement.innerHTML = `${graphsContents(dustData)}<div class="${CLASS_NAME.placeholder}"></div>`;
};

export const getScrollTopGraphData = (event, dustData) => {
  const graphHeight = _q(`.${CLASS_NAME.graph}`).offsetHeight;
  const { scrollTop } = event.srcElement;
  const dustDataLength = getObjLength(dustData);
  for (let index = 1; index < dustDataLength; index += 1) {
    const prevGraphScrollTop = graphHeight * (index - 1);
    const graphScrollTop = graphHeight * index;
    if (scrollTop >= prevGraphScrollTop && scrollTop < graphScrollTop) {
      return dustData[index - 1];
    }
  }
  return dustData[getLastIndex(dustDataLength)];
};
