import { Router } from "express";
import { analyzeBuilding } from "../controllers/building.controller";
import { validateAnalyzeRequest } from "../middlewares/validateAnalyzeRequest";

const router = Router();

router.post("/analyze", validateAnalyzeRequest, analyzeBuilding);

export default router;
