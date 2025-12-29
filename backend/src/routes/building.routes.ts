import { Router } from "express";
import { analyzeBuilding } from "../controllers/building.controller";

const router = Router();

router.post("/analyze", analyzeBuilding);

export default router;
