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

export const reverseClass = (className, addTarget, removeTarget) => {
  addClass(className, addTarget);
  removeClass(className, removeTarget);
};

export const clearClass = (target, classes) => target.classList.remove(...classes);

export const getRestGradeClassName = className => {
  const gradeClassList = [CLASS_NAME.grade1, CLASS_NAME.grade2, CLASS_NAME.grade3, CLASS_NAME.grade4];
  return gradeClassList.filter(gradeClass => gradeClass !== className);
};

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

export const getGradeText = grade => {
  const gradeText = {
    1: "좋음",
    2: "보통",
    3: "나쁨",
    4: "매우 나쁨",
  };
  return gradeText[grade] || null;
};
