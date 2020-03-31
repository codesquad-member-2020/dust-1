export const _q = str => document.querySelector(str);

export const _qa = str => document.querySelectorAll(str);

export const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

export const addClass = (target, className) => target.classList.add(className);

export const removeClass = (target, className) => target.classList.remove(className);

export const toggleClass = (target = null, addClassName, removeClassName) => {
  if (!target || target.classList.contains(addClassName)) return;
  addClass(target, addClassName);
  removeClass(target, removeClassName);
};
