export interface OverpassResponse {
  version: number;
  generator: string;
  osm3s: {
    timestamp_osm_base: string;
    timestamp_areas_base: string;
    timestamp_max: string;
    areas: Record<string, unknown>;
  };
  elements: Element[];
}

export type Element = Way | Node;

export interface Way {
  type: "way";
  id: number;
  tags: Record<string, string>;
  nodes: number[];
}

export interface Node {
  type: "node";
  id: number;
  lat: number;
  lon: number;
}
