import { Map } from "mapbox-gl";

let selectedLayer: "simple" | "satellite" = "simple";

export function addLayerSelectorToMap(map: Map) {
  document.getElementById("simple-layer-selector")!.onclick = () => {
    selectLayer("simple", map);
  };

  document.getElementById("satellite-layer-selector")!.onclick = () => {
    selectLayer("satellite", map);
  };

  selectLayer("simple", map);
}

function selectLayer(layer: "simple" | "satellite", map: Map) {
  if (selectedLayer === layer) return;

  selectedLayer = layer;

  document
    .getElementById("simple-layer-selector")!
    .classList.remove("selected");
  document
    .getElementById("satellite-layer-selector")!
    .classList.remove("selected");

  if (layer === "simple") {
    document.getElementById("simple-layer-selector")!.classList.add("selected");
    map.setStyle("mapbox://styles/mapbox/light-v11");
  }

  if (layer === "satellite") {
    document
      .getElementById("satellite-layer-selector")!
      .classList.add("selected");
    map.setStyle("mapbox://styles/mapbox/satellite-v9");
  }
}
