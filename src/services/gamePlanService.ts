import type { GamePlan } from "../types/gamePlan";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function getGamePlans(): Promise<GamePlan[]> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan`);
  if (!response.ok) throw new Error("Failed to fetch game plans");
  return await response.json();
}

export async function getGamePlanById(id: number): Promise<GamePlan> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan/${id}`);
  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to fetch game plan (${response.status}): ${text}`);
  }
  return await response.json();
}

export async function createGamePlan(name: string): Promise<GamePlan> {
  console.log("POST play dto:", name);
  const response = await fetch(`${API_BASE_URL}/api/GamePlan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    console.error("Failed to create GamePlan:", text);
    throw new Error(`Failed to create game plan (${response.status}): ${text}`);
  }

  return await response.json();
}

export async function addPlaysToGamePlan(
  gamePlanId: number,
  plays: { name: string; isPass: boolean }[]
): Promise<void> {
  const response = await fetch(
    `${API_BASE_URL}/api/GamePlan/${gamePlanId}/plays/batch`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plays),
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Failed to add plays (${response.status}): ${text}`);
  }
}

export async function deleteGamePlan(id: number): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/api/GamePlan/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete game plan");
}
