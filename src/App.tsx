import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/PortfolioPage";

/* The guestbook is rarely visited, so it loads in its own chunk. */
const GuestbookPage = lazy(() => import("./pages/GuestbookPage"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route
        path="/guestbook"
        element={
          <Suspense fallback={null}>
            <GuestbookPage />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
