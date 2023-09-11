export interface RiverQuery {
  name: string;
  id: string;
  overpassQuery: string;
}

export const riverQueries: RiverQuery[] = [
  {
    name: "Big River",
    id: "big-river",
    overpassQuery: `
      [out:json][bbox:37.66208079655377,-91.02035522460938,38.49981784551419,-90.42572021484374];
      (
        way["name"="Big River"]["waterway"~"^(river|stream)"];
        >;
      );
      out skel;`,
  },
  {
    name: "Courtois Creek",
    id: "courtois-creek",
    overpassQuery: `
      [out:json][bbox:37.87512439608706,-91.219482421875,38.03538283255134,-91.05537414550781];
      (
        way["name"="Courtois Creek"]["waterway"~"^(river|stream)"];
        >;
      );
      out skel;`,
  },
  {
    name: "Current River",
    id: "current-river",
    overpassQuery: `
      [out:json][bbox:36.21103919432822,-91.77154541015625,37.53586597792038,-90.65917968749999];
      (
        way["name"="Current River"]["waterway"="river"];
        >;
      );
      out skel;`,
  },
  {
    name: "Huzzah Creek",
    id: "huzzah-creek",
    overpassQuery: `
      [out:json][bbox:37.779398571318765,-91.26411437988281,38.0470096014159,-91.12335205078125];
      (
        way["name"="Huzzah Creek"]["waterway"~"^(stream|river)"];
        >;
      );
      out skel;`,
  },
  {
    name: "Jacks Fork",
    id: "jacks-fork",
    overpassQuery: `
      [out:json][bbox:37.02448395075965,-91.8841552734375,37.21611248733611,-91.25244140624999];
      (
        way["name"="Jacks Fork"]["waterway"="river"];
        >;
      );
      out skel;`,
  },
  {
    name: "Mineral Creek",
    id: "mineral-creek",
    overpassQuery: `
      [out:json][bbox:38.024295124443995,-90.86380004882812,38.10943808221481,-90.67359924316406];
      (
        way["name"="Mineral Fork"]["waterway"="river"];
        >;
      );
      out skel;`,
  },
  {
    name: "Meramec River",
    id: "meramec-river",
    overpassQuery: `
      [out:json][bbox:37.477037796698056,-91.60675048828125,38.586820096127674,-90.28564453124999];
      (
        way["name"="Meramec River"]["waterway"="river"];
        >;
      );
      out skel;`,
  },
];
