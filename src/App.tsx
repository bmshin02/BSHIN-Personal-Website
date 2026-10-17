import { Routes, Route } from "react-router-dom";

import PortfolioPage from "./pages/PortfolioPage";
import GuestbookPage from "./pages/GuestbookPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />
      <Route path="/guestbook" element={<GuestbookPage />} />
    </Routes>
  );
}

export default App;
