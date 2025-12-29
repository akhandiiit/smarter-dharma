const COP = 4;
const BTU_TO_KWH = 3412;
const HOURS = 8;

export const heatGainBTU = (
  windowArea: number,
  shgc: number,
  radiation: number
): number => {
  return windowArea * shgc * radiation * HOURS;
};

export const energyConsumed = (btu: number): number => {
  return (btu / BTU_TO_KWH) / COP;
};
