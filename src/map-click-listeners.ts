import { Map } from "mapbox-gl";
import {
  RIVER_FEATURES_CLUSTER_COUNT_LAYER_ID,
  RIVER_FEATURES_CLUSTER_LAYER_ID,
  RIVER_FEATURES_LAYER_ID,
  RIVER_LAYER_ID,
} from "./map-layers";

// @ts-ignore TODO: Remove this ignore when turf fixes their types
import * as turf from "@turf/turf";

export function addClickListenersToMap(map: Map) {
  map.on(
    "click",
    [RIVER_FEATURES_CLUSTER_LAYER_ID, RIVER_FEATURES_CLUSTER_COUNT_LAYER_ID],
    (e) => {
      const feature = e!.features![0];
      const coordinates = (feature.geometry as any).coordinates;

      map.easeTo({
        center: coordinates,
        zoom: 10,
      });
    }
  );

  map.on("click", [RIVER_FEATURES_LAYER_ID], (e) => {
    const feature = e!.features![0];
    const coordinates = (feature.geometry as any).coordinates;

    map.easeTo({
      center: coordinates,
      zoom: 13,
    });
  });

  map.on("click", [RIVER_LAYER_ID], (e) => {
    const feature = e!.features![0];
    const geometry = feature.geometry as any;

    const bbox = turf.bbox(geometry);

    map.fitBounds(
      [
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ],
      {
        padding: 25,
      }
    );
  });
}
