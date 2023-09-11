import { LngLat, Map, MapboxGeoJSONFeature, Popup } from "mapbox-gl";
import { RIVER_FEATURES_LAYER_ID, RIVER_LAYER_ID } from "./map-layers";

const riverPopup = new Popup({
  closeButton: false,
  closeOnClick: false,
  offset: {
    bottom: [0, 70],
  },
});

const riverFeaturePopup = new Popup({
  closeButton: false,
  closeOnClick: false,
  offset: {
    top: [0, 5],
    right: [-18, -20],
    left: [18, -20],
    bottom: [0, -45],
  },
});

export function openPopup(
  map: Map,
  feature: MapboxGeoJSONFeature,
  lngLat: LngLat
) {
  switch (feature.layer.id) {
    case RIVER_LAYER_ID:
      openRiverPopup(map, feature, lngLat);
      break;
    case RIVER_FEATURES_LAYER_ID:
      openRiverFeaturePopup(map, feature);
      break;
  }
}

export function closePopup(feature: MapboxGeoJSONFeature) {
  switch (feature.layer.id) {
    case RIVER_LAYER_ID:
      riverPopup.remove();
      break;
    case RIVER_FEATURES_LAYER_ID:
      riverFeaturePopup.remove();
      break;
  }
}

function openRiverPopup(
  map: Map,
  feature: MapboxGeoJSONFeature,
  lngLat: LngLat
) {
  const name = feature.properties!.name;

  riverPopup.setLngLat(lngLat).setText(name).trackPointer().addTo(map);
}

function openRiverFeaturePopup(map: Map, feature: MapboxGeoJSONFeature) {
  const coordinates = (feature.geometry as any).coordinates;

  const mile = feature.properties!.mile;
  const type = feature.properties!.type;
  const description = feature.properties!.description;

  let typeText = "";
  switch (type) {
    case "private-access":
      typeText = "Private Access";
      break;
    case "public-access":
      typeText = "Public Access";
      break;
    case "landmark":
      typeText = "Landmark";
      break;
  }

  const html = /* html */ `
    <div class="header">
      <h3 class="type ${type}">${typeText}</h3>
      <h3 class="mile">mi ${mile}</h3>
    </div>
    <p class="description">${description}</p>
  `;

  riverFeaturePopup
    .setLngLat(coordinates)
    .setHTML(html)
    .addTo(map)
    .addClassName("river-feature-popup");
}
