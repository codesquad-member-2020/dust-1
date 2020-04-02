export const _q = str => document.querySelector(str);

export const _qa = str => document.querySelectorAll(str);

export const pipe = (...fns) => value => fns.reduce((acc, fn) => fn(acc), value);

export const addClass = (className, target) => target.classList.add(className);

export const removeClass = (className, target) => target.classList.remove(className);

export const hasClass = (className, target) => target.classList.contains(className);

export const toggleClass = (className, target) => {
  if (hasClass(className, target)) removeClass(className, target);
  else addClass(className, target);
};

export const reverseClass = (className, addTarget, removeTarget) => {
  addClass(className, addTarget);
  removeClass(className, removeTarget);
};

export const clearClass = (classes, target) => target.classList.remove(...classes);

export const addMultipleEventListener = (target, callback, ...event) => event.forEach(eachEvent => target.addEventListener(eachEvent, e => callback(e)));
