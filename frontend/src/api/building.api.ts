import axios from "axios";
import { AnalyzeRequest, AnalyzeResponse } from "../types/building";

const API_URL = "http://localhost:5000/api/building";

export const analyzeBuilding = async (
  payload: AnalyzeRequest
): Promise<AnalyzeResponse> => {
  const res = await axios.post(`${API_URL}/analyze`, payload);
  return res.data;
};
