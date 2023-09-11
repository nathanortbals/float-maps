import { Map, MapboxGeoJSONFeature } from "mapbox-gl";

export const RIVER_FEATURES_LAYER_ID = "river-feature-pins";
export const RIVER_FEATURES_CLUSTER_LAYER_ID = "river-feature-clusters";
export const RIVER_FEATURES_CLUSTER_COUNT_LAYER_ID =
  "river-feature-clusters-count";
export const RIVER_LAYER_ID = "rivers";

export const LAYER_IDS = [
  RIVER_LAYER_ID,
  RIVER_FEATURES_CLUSTER_LAYER_ID,
  RIVER_FEATURES_CLUSTER_COUNT_LAYER_ID,
  RIVER_FEATURES_LAYER_ID,
];

export function addLayersToMap(map: Map) {
  map.addLayer({
    id: RIVER_LAYER_ID,
    type: "line",
    source: "rivers",
    paint: {
      "line-color": "#83C9DC",
      "line-width": 3,
    },
  });

  map.addLayer({
    id: RIVER_FEATURES_LAYER_ID,
    type: "symbol",
    source: "river-features",
    filter: ["!", ["has", "point_count"]],
    layout: {
      "icon-image": [
        "case",
        ["==", ["get", "type"], "private-access"],
        "private-access-pin",
        ["==", ["get", "type"], "public-access"],
        "public-access-pin",
        "landmark-pin",
      ],
      "icon-size": 0.9,
      "icon-anchor": "bottom",
      "icon-allow-overlap": true,
    },
  });

  map.addLayer({
    id: RIVER_FEATURES_CLUSTER_LAYER_ID,
    type: "symbol",
    source: "river-features",
    filter: ["has", "point_count"],
    paint: {},
    layout: {
      "icon-image": "cluster",
      "icon-size": 0.6,
      "icon-allow-overlap": true,
    },
  });

  map.addLayer({
    id: RIVER_FEATURES_CLUSTER_COUNT_LAYER_ID,
    type: "symbol",
    source: "river-features",
    filter: ["has", "point_count"],
    paint: {
      "text-color": "#fff",
    },
    layout: {
      "text-field": ["get", "point_count_abbreviated"],
      "text-font": ["DIN Pro Medium"],
      "text-size": 12,
    },
  });
}

export function onHover(feature: MapboxGeoJSONFeature, map: Map) {
  switch (feature.layer.id) {
    case RIVER_FEATURES_LAYER_ID:
      map.setLayoutProperty(RIVER_FEATURES_LAYER_ID, "icon-size", [
        "match",
        ["get", "id"],
        feature.properties?.id,
        1,
        0.9,
      ]);
      break;
    case RIVER_LAYER_ID:
      map.setPaintProperty(RIVER_LAYER_ID, "line-color", [
        "match",
        ["get", "id"],
        feature.properties?.id,
        "#FFFF00",
        "#83C9DC",
      ]);

      map.setPaintProperty(RIVER_LAYER_ID, "line-width", [
        "match",
        ["get", "id"],
        feature.properties?.id,
        6,
        3,
      ]);
      break;
  }
}

export function onDehover(feature: MapboxGeoJSONFeature, map: Map) {
  switch (feature.layer.id) {
    case RIVER_FEATURES_LAYER_ID:
      map.setLayoutProperty(RIVER_FEATURES_LAYER_ID, "icon-size", 0.9);
      break;
    case RIVER_LAYER_ID:
      map.setPaintProperty(RIVER_LAYER_ID, "line-color", "#83C9DC");
      map.setPaintProperty(RIVER_LAYER_ID, "line-width", 3);
      break;
  }
}
