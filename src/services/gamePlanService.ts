import type { GamePlan } from "../types/gamePlan";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getGamePlans(): Promise<GamePlan[]> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan`);
  if (!response.ok) {
    throw new Error("Failed to fetch game plans");
  }
  return await response.json();
}

export async function createGamePlan(name: string): Promise<GamePlan> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  if (!response.ok) {
    throw new Error("Failed to create game plan");
  }
  return await response.json();
}

export async function addPlayToGamePlan(
  gamePlanId: number,
  dto: { name: string; isPass: boolean }
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/GamePlan/${gamePlanId}/plays`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dto),
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add play (${response.status}): ${text}`);
  }
}

export async function deleteGamePlan(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete game plan");
  }
}
