import { _q, getObjLength } from "../utils/utils";
import { CLASS_NAME, MAX_DUST_VALUE } from "../utils/constants";
import { DUST_STATUS } from "../utils/mockData";

export const graphsElement = _q(`.${CLASS_NAME.graphs}`);

const getGradeClassName = grade => {
  const gradeClass = {
    1: CLASS_NAME.grade1,
    2: CLASS_NAME.grade2,
    3: CLASS_NAME.grade3,
    4: CLASS_NAME.grade4,
  };
  return gradeClass[grade] || null;
};

const calculateGraphWidth = dustValue => {
  const percentage = Math.floor((dustValue / MAX_DUST_VALUE) * 100);
  return percentage > 100 ? 100 : percentage;
};

const graphsContents = () =>
  DUST_STATUS.reduce((graphElement, dustData) => {
    graphElement += `<div class="${CLASS_NAME.graphWrap}" style="width:${calculateGraphWidth(dustData.pm10Value)}%">
  <div class="${CLASS_NAME.graph} ${getGradeClassName(dustData.pm10Grade1h)}">
  <span class="${CLASS_NAME.dustValue}">${dustData.pm10Value}</span></div></div>`;
    return graphElement;
  }, "");

export const renderGraph = () => {
  graphsElement.innerHTML = `${graphsContents(DUST_STATUS)}<div class="${CLASS_NAME.placeholder}"></div>`;
};

export const getScrollTopGraphData = event => {
  const graphHeight = _q(`.${CLASS_NAME.graph}`).offsetHeight;
  const { scrollTop } = event.srcElement;
  for (let index = 1; index < getObjLength(DUST_STATUS); index += 1) {
    const prevGraphScrollTop = graphHeight * (index - 1);
    const graphScrollTop = graphHeight * index;
    if (scrollTop >= prevGraphScrollTop && scrollTop < graphScrollTop) {
      return DUST_STATUS[index - 1];
    }
  }
  return DUST_STATUS[getObjLength(DUST_STATUS) - 1];
};
