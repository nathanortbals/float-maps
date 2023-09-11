import { Map } from "mapbox-gl";

export function addImagesToMap(map: Map) {
  map.loadImage("./images/public-access-pin.png", (error, result) => {
    if (error) throw error;

    map.addImage("public-access-pin", result!);
  });

  map.loadImage("./images/private-access-pin.png", (error, result) => {
    if (error) throw error;

    map.addImage("private-access-pin", result!);
  });

  map.loadImage("./images/landmark-pin.png", (error, result) => {
    if (error) throw error;

    map.addImage("landmark-pin", result!);
  });

  map.loadImage("./images/cluster.png", (error, result) => {
    if (error) throw error;

    map.addImage("cluster", result!);
  });
}
