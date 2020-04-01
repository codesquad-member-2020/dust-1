import { _q, getGradeClassName } from "../utils/utils";
import { CLASS_NAME, MAX_DUST_VALUE, MIN_PERCENTAGE } from "../utils/constants";

const graphsElement = _q(`.${CLASS_NAME.graphs}`);

const calculateGraphWidth = dustValue => {
  const percentage = Math.floor((dustValue / MAX_DUST_VALUE) * 100);
  if (percentage > 100) return 100;
  if (percentage <= MIN_PERCENTAGE) return MIN_PERCENTAGE;
  return percentage;
};

const graphsContent = dustData =>
  dustData.reduce((graphElement, currentData) => {
    const { pm10Value, pm10Grade1h } = currentData;
    graphElement += `<div class="${CLASS_NAME.graphWrap}" style="width:${calculateGraphWidth(pm10Value)}%">
    <div class="${CLASS_NAME.graph} ${getGradeClassName(pm10Grade1h)}">
    <span class="${CLASS_NAME.graphValue}">${pm10Value}</span></div></div>`;
    return graphElement;
  }, "");

const getScrollTopGraphData = (event, dustData) => {
  const graphHeight = _q(`.${CLASS_NAME.graph}`).offsetHeight;
  const { scrollTop } = event.srcElement;
  for (let index = 0; index < dustData.length; index += 1) {
    if (scrollTop <= 0) return dustData[0];
    const prevGraphScrollTop = graphHeight * index;
    const graphScrollTop = graphHeight * (index + 1);
    if (scrollTop >= prevGraphScrollTop && scrollTop < graphScrollTop) return dustData[index];
  }
  return dustData[dustData.length - 1];
};

export const renderGraph = dustData => {
  graphsElement.innerHTML = `${graphsContent(dustData)}<div class="${CLASS_NAME.placeholder}"></div>`;
};

export const addGraphScrollEvent = (callback, dustData) => graphsElement.addEventListener("scroll", event => callback(getScrollTopGraphData(event, dustData)));
