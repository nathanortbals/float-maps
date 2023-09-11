import { Map } from "mapbox-gl";

export function addSourcesToMap(map: Map) {
  map.addSource("rivers", { type: "geojson", data: "./sources/rivers.json" });

  map.addSource("river-features", {
    type: "geojson",
    data: "./sources/river-features.json",
    cluster: true,
    clusterMaxZoom: 9,
    clusterRadius: 50,
  });
}
