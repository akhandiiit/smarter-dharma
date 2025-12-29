import { Request, Response } from "express";
import { CITY_DATA, FacadeKey } from "../constants/cityData";
import { heatGainBTU, energyConsumed } from "../services/calculation.service";

interface FacadeInput {
  height: number;
  width: number;
  wwr: number;
}

interface AnalyzeRequest {
  city: string;
  shgc: number;
  facades: Record<FacadeKey, FacadeInput>;
}

export const analyzeBuilding = (
  req: Request<{}, {}, AnalyzeRequest>,
  res: Response
) => {
  const { city, shgc, facades } = req.body;

  const cityInfo = CITY_DATA[city];
  if (!cityInfo) {
    return res.status(400).json({ message: "Invalid city" });
  }

  let totalCost = 0;

  const breakdown: Record<
    FacadeKey,
    {
      windowArea: number;
      btu: number;
      energy: number;
      cost: number;
    }
  > = {} as any;

  (Object.keys(facades) as FacadeKey[]).forEach((face) => {
    const f = facades[face];
    const windowArea = f.height * f.width * f.wwr;

    const btu = heatGainBTU(
      windowArea,
      shgc,
      cityInfo.radiation[face]
    );

    const energy = energyConsumed(btu);
    const cost = energy * cityInfo.rate;

    breakdown[face] = {
      windowArea,
      btu,
      energy,
      cost,
    };

    totalCost += cost;
  });

  res.json({
    city,
    shgc,
    breakdown,
    totalCost,
  });
};
