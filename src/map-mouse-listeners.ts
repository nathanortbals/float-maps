import { Map, MapboxGeoJSONFeature } from "mapbox-gl";
import { LAYER_IDS, onDehover, onHover } from "./map-layers";
import { closePopup, openPopup } from "./map-popups";

export function addMouseListenersToMap(map: Map) {
  let currentlyHoveredFeature: MapboxGeoJSONFeature | undefined = undefined;

  map.on("mousemove", (e) => {
    const features = map.queryRenderedFeatures(e.point, {
      layers: [...LAYER_IDS],
    });

    const newlyHoveredFeature = features.length ? features[0] : undefined;

    map.getCanvas().style.cursor = newlyHoveredFeature ? "pointer" : "";

    if (
      currentlyHoveredFeature?.properties?.id !==
      newlyHoveredFeature?.properties?.id
    ) {
      if (currentlyHoveredFeature) {
        onDehover(currentlyHoveredFeature, map);
        closePopup(currentlyHoveredFeature);
      }

      if (newlyHoveredFeature) {
        onHover(newlyHoveredFeature, map);
        openPopup(map, newlyHoveredFeature, e.lngLat);
      }

      currentlyHoveredFeature = newlyHoveredFeature;
    }
  });
}
