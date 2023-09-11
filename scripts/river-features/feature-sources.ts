export interface FeatureSource {
  riverId: string;
  csvPath: string;
}

export const featureSources: FeatureSource[] = [
  {
    riverId: "meramec-river",
    csvPath: "./scripts/river-features/sources/meramec-river.csv",
  },
  {
    riverId: "courtois-creek",
    csvPath: "./scripts/river-features/sources/courtois-creek.csv",
  },
  {
    riverId: "huzzah-creek",
    csvPath: "./scripts/river-features/sources/huzzah-creek.csv",
  },
  {
    riverId: "current-river",
    csvPath: "./scripts/river-features/sources/current-river.csv",
  },
  {
    riverId: "jacks-fork",
    csvPath: "./scripts/river-features/sources/jacks-fork.csv",
  },
  {
    riverId: "big-river",
    csvPath: "./scripts/river-features/sources/big-river.csv",
  },
  {
    riverId: "mineral-creek",
    csvPath: "./scripts/river-features/sources/mineral-creek.csv",
  },
];
