export type FacadeKey = "north" | "south" | "east" | "west" | "roof";

export interface CityInfo {
  radiation: Record<FacadeKey, number>;
  rate: number;
}

export const CITY_DATA: Record<string, CityInfo> = {
  Bangalore: {
    radiation: { north: 150, south: 250, east: 200, west: 200, roof: 300 },
    rate: 6.5,
  },
  Mumbai: {
    radiation: { north: 180, south: 350, east: 280, west: 270, roof: 400 },
    rate: 9.0,
  },
  Kolkata: {
    radiation: { north: 200, south: 400, east: 300, west: 290, roof: 450 },
    rate: 7.5,
  },
  Delhi: {
    radiation: { north: 160, south: 270, east: 220, west: 220, roof: 320 },
    rate: 8.5,
  },
};
