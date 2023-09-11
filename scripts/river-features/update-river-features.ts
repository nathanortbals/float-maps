// @ts-ignore TODO: Remove this ignore when turf fixes their types
import * as turf from "@turf/turf";
import * as crypto from "crypto";
import { parse } from "csv-parse/sync";
import { promises as fs } from "fs";
import { featureSources, type FeatureSource } from "./feature-sources";

updateRiverFeatures();

export async function updateRiverFeatures() {
  const promises = featureSources.map((featureSource) =>
    loadRiverFeatures(featureSource)
  );

  const riverFeatures = (await Promise.all(promises)).flat();
  const riverFeatureCollection = turf.featureCollection(riverFeatures);

  await writeToJson(riverFeatureCollection);

  console.log("All river features updated! 🚀");
}

async function loadRiverFeatures(
  featureSource: FeatureSource
): Promise<turf.Feature<turf.Point>[]> {
  console.log(
    `Loading river features from csv file for ${featureSource.riverId}...`
  );

  const fileContent = await fs.readFile(featureSource.csvPath);
  const rows = parse(fileContent);

  const features = rows.map((row: any) => {
    const id = crypto.randomUUID();
    const riverId = featureSource.riverId;
    const mile = Number(row[0]);
    const type = row[3];
    const description = row[4];
    const hasRamp = row[5] === "Yes";
    const campingAllowed = row[6] === "Yes";
    const geojson = turf.point([Number(row[2]), Number(row[1])], {
      id,
      riverId,
      type,
      mile,
      description,
      hasRamp,
      campingAllowed,
    });

    return geojson;
  });

  console.log(`Found ${features.length} river features in csv file`);
  return features;
}

async function writeToJson(riverCollection: turf.FeatureCollection) {
  console.log(
    "Writing river feature collection to ./public/sources/river-fatures.json..."
  );
  const json = JSON.stringify(riverCollection);

  await fs.writeFile("./public/sources/river-fatures.json", json);
}
