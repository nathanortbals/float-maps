import { Map } from "mapbox-gl";
import { addClickListenersToMap } from "./map-click-listeners";
import { addImagesToMap } from "./map-images";
import { addLayerSelectorToMap } from "./map-layer-selector";
import { addLayersToMap } from "./map-layers";
import { addMouseListenersToMap } from "./map-mouse-listeners";
import { addSourcesToMap } from "./map-sources";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoibW8tZmxvYXQiLCJhIjoiY2wzN2h4OG9zMjFubTNkcGZoMW5oZzE5ZyJ9.SIgzYcFXiido3eG29zdkrg";

const mapContainer = document.getElementById("map")!;

const map = new Map({
  container: mapContainer,
  accessToken: MAPBOX_ACCESS_TOKEN,
  style: "mapbox://styles/mapbox/light-v11",
  center: [-90.8, 37.5],
  zoom: 7.5,
  minZoom: 6.5,
  maxZoom: 15,
  dragRotate: false,
  pitchWithRotate: false,
});

map.on("load", () => {
  addMouseListenersToMap(map);
  addClickListenersToMap(map);
  addLayerSelectorToMap(map);
});

map.on("style.load", () => {
  addImagesToMap(map);
  addSourcesToMap(map);
  addLayersToMap(map);
});
