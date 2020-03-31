import { graphsElement, renderGraph, getScrollTopGraphData } from "./components/graph";

renderGraph();

graphsElement.addEventListener("scroll", event => getScrollTopGraphData(event));
