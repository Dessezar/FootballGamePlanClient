export type Coverage = 0 | 1 | 2 | 3;
export type PassFailReason = 0 | 1 | 2;
export type PlayResult = {
  id: number;
  gamePlanId: number;
  playId: number;
  coverage: Coverage;
  isPass: boolean;
  passFailReason: PassFailReason;
  yardsGained: number;
  isSuccessful: boolean;
};