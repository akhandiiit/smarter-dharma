import { Request, Response, NextFunction } from "express";
import { FacadeKey } from "../constants/cityData";

const FACADES: FacadeKey[] = ["north", "south", "east", "west", "roof"];

export function validateAnalyzeRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { city, shgc, facades } = req.body;

  // City validation
  if (!city || typeof city !== "string") {
    return res.status(400).json({ message: "city must be a string" });
  }

  // SHGC validation
  if (
    typeof shgc !== "number" ||
    Number.isNaN(shgc) ||
    shgc < 0 ||
    shgc > 1
  ) {
    return res
      .status(400)
      .json({ message: "shgc must be a number between 0 and 1" });
  }

  // Facades validation
  if (!facades || typeof facades !== "object") {
    return res
      .status(400)
      .json({ message: "facades object is required" });
  }

  for (const facade of FACADES) {
    const f = facades[facade];

    if (!f) {
      return res
        .status(400)
        .json({ message: `Missing facade: ${facade}` });
    }

    const { height, width, wwr } = f;

    if (
      typeof height !== "number" ||
      typeof width !== "number" ||
      Number.isNaN(height) ||
      Number.isNaN(width) ||
      height <= 0 ||
      width <= 0
    ) {
      return res.status(400).json({
        message: `${facade}: height and width must be positive numbers`,
      });
    }

    if (
      typeof wwr !== "number" ||
      Number.isNaN(wwr) ||
      wwr < 0 ||
      wwr > 1
    ) {
      return res.status(400).json({
        message: `${facade}: wwr must be between 0 and 1`,
      });
    }
  }

  next(); // ✅ all validations passed
}
