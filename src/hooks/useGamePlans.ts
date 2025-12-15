// import { useEffect, useState } from "react";
// import type { GamePlan } from "../types/gamePlan";
// import { getGamePlans, createGamePlan, deleteGamePlan } from "../services/gamePlanService";

// export function useGamePlans() {
//   const [gamePlans, setGamePlans] = useState<GamePlan[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//     useEffect(() => {
//         getGamePlans()
//             .then((data) => setGamePlans(data))
//             .catch((error) => console.error("Error fetching game plans:", error))
//             .finally(() => setLoading(false));
//     }, []);

//     async function addGamePlan(name: string) {
//         const created = await createGamePlan(name);
//         setGamePlans((prev) => [created, ...prev]);
//     }

//     async function removeGamePlan(id: number) {
//         await deleteGamePlan(id);
//         setGamePlans((prev) => prev.filter((gp) => gp.id !== id));
//     }

//     return { gamePlans, loading, addGamePlan, removeGamePlan };

// }