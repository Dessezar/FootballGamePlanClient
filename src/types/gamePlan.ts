import type { Play } from "./play";

export type GamePlan = {
  id: number;
  name: string;
  plays: Play[];
};