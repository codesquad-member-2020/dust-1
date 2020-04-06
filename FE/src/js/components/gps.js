const gps = navigator.geolocation;

export default () => new Promise((resolve, reject) => gps.getCurrentPosition(resolve, reject));
