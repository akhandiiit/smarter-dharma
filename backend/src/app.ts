import express from "express";
import cors from "cors";
import buildingRoutes from "./routes/building.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/building", buildingRoutes);

export default app;
