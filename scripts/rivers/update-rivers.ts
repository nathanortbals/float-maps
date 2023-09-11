// @ts-ignore TODO: Remove this ignore when turf fixes their types
import * as turf from "@turf/turf";
import * as fs from "fs/promises";
import { riverQueries, type RiverQuery } from "./overpass-queries";
import type { Node, OverpassResponse, Way } from "./overpass-response";

updateRivers();

export async function updateRivers() {
  const rivers: turf.Feature<turf.MultiLineString>[] = [];

  // Build rivers sequentially to avoid Overpass Api rate limits
  for (const riverQuery of riverQueries) {
    rivers.push(await getRiver(riverQuery));
  }

  const riverCollection = turf.featureCollection(rivers);
  await writeToJson(riverCollection);

  console.log("Rivers Updated! 🚀");
}

async function getRiver(riverQuery: RiverQuery) {
  const overpassData = await getOverpassData(riverQuery);
  const geojson = convertToGeojson(overpassData, riverQuery);

  return geojson;
}

async function getOverpassData(
  riverQuery: RiverQuery
): Promise<OverpassResponse> {
  console.log(`Fetching Overpass data for ${riverQuery.name}...`);
  const overpassUrl = "https://overpass-api.de/api/interpreter";

  const response = await fetch(overpassUrl, {
    method: "POST",
    body: riverQuery.overpassQuery,
  });

  if (!response.ok) {
    throw new Error(`Error fetching Overpass data: ${response.statusText}`);
  }

  let json = (await response.json()) as OverpassResponse;

  console.log(`Retrieved ${json.elements.length} elements`);
  return json;
}

function convertToGeojson(
  overpassResponse: OverpassResponse,
  riverQuery: RiverQuery
): turf.helpers.Feature<turf.helpers.MultiLineString> {
  console.log(`Converting overpass response to geojson for ${riverQuery.name}`);

  const ways = overpassResponse.elements.filter(
    (element) => element.type === "way"
  ) as Way[];

  const lines = ways.map((way) =>
    way.nodes.map((nodeId) => {
      const node = overpassResponse.elements.find(
        (element) => element.id === nodeId
      ) as Node;

      return [node.lon, node.lat];
    })
  );

  const geojson = turf.multiLineString(lines, {
    id: riverQuery.id,
    name: riverQuery.name,
  });

  console.log(`Converted to geojson with ${lines.length} lines`);
  return geojson;
}

async function writeToJson(riverCollection: turf.FeatureCollection) {
  console.log("Writing river collection to ./public/sources/rivers.json...");
  const json = JSON.stringify(riverCollection);

  await fs.writeFile("./public/sources/rivers.json", json);
}
