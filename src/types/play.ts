import type { PlayResult } from "./playResult";

export type Play = {
  id: number;
  name: string;
  isPass: boolean;
  gamePlanId: number;
  results?: PlayResult[]; 
};
