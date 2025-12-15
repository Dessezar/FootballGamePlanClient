import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import GamePlanDetailsPage from "./pages/GamePlanDetailsPage.tsx";
import GamePlanCreatePage from "./pages/GamePlanCreatePage.tsx";
import GamePlanStatisticsPage from "./pages/GamePlanStatisticsPage.tsx"; 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gameplans/new" element={<GamePlanCreatePage />} />
        <Route path="/gameplans/:id" element={<GamePlanDetailsPage />} />
        <Route path="/gameplans/:id/statistics" element={<GamePlanStatisticsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);