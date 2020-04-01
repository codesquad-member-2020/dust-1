import { CLASS_NAME } from "./constants";

export const _q = str => document.querySelector(str);

export const _qa = str => document.querySelectorAll(str);

export const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

export const addClass = (className, target) => target.classList.add(className);

export const removeClass = (className, target) => target.classList.remove(className);

export const toggleClass = (className, target) => {
  if (target.classList.contains(className)) removeClass(className, target);
  else addClass(className, target);
};

export const getObjLength = obj => Object.keys(obj).length;

export const getLastIndex = num => num - 1;

export const getGradeClassName = grade => {
  const gradeClass = {
    1: CLASS_NAME.grade1,
    2: CLASS_NAME.grade2,
    3: CLASS_NAME.grade3,
    4: CLASS_NAME.grade4,
  };
  return gradeClass[grade] || null;
};

export const getGradeEmoji = grade => {
  const gradeEmoji = {
    1: "😀",
    2: "🙂",
    3: "😷",
    4: "😱",
  };
  return gradeEmoji[grade] || null;
};
