import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Guilds from "./pages/guilds/guilds";
import AuthCallback from "./pages/auth/callback";
import { useEffect, useState } from "react";
import AstraLoader from "./components/loader";
import { apiClient } from "./utils/api-client";
import { GET_ME_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import { setUser } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [loading, setloading] = useState(true);

  const getMe = async () => {
    try {
      const res = await apiClient.get(GET_ME_URL);
      console.log(res.data);
      dispatch(setUser(res.data));
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };
  useEffect(() => {
    getMe();
  }, []);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <AstraLoader size={24} />
      </div>
    );
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
