import addTabTouchEvent from "./components/tab";
import getCurrentLocation from "./components/gps";
import { getForecast } from "./components/fetch";

addTabTouchEvent();
getCurrentLocation();
getForecast();
