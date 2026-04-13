import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Guilds from "./pages/guilds/guilds";
import AuthCallback from "./pages/auth/callback";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/servers" element={<Guilds />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
