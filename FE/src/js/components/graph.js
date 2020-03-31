import { _q } from "../utils/utils";
import { CLASS_NAME, MAX_DUST_VALUE } from "../utils/constants";
import { DUST_STATUS } from "../utils/mockData";

const graphElement = _q(`.${CLASS_NAME.graph}`);

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

const graphContents = DUST_STATUS.reduce((contents, data) => {
  contents += `<div class="${CLASS_NAME.graphColumnWrap}" style="width:${calculateGraphWidth(data.pm10Value)}%">
  <div class="${CLASS_NAME.graphColumn} ${getGradeClassName(data.pm10Grade1h)}">
  <span class="${CLASS_NAME.dustValue}">${data.pm10Value}</span></div></div>`;
  return contents;
}, "");

const renderGraph = () => {
  graphElement.innerHTML = `${graphContents}<div class="${CLASS_NAME.placeholder}"></div>`;
};

renderGraph();
