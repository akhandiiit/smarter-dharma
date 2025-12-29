export type FacadeKey = "north" | "south" | "east" | "west" | "roof";

export interface FacadeInput {
  height: number;
  width: number;
  wwr: number;
}

export interface AnalyzeRequest {
  city: string;
  shgc: number;
  facades: Record<FacadeKey, FacadeInput>;
}

export interface FacadeResult {
  windowArea: number;
  btu: number;
  energy: number;
  cost: number;
}

export interface AnalyzeResponse {
  city: string;
  shgc: number;
  totalCost: number;
  breakdown: Record<FacadeKey, FacadeResult>;
}
