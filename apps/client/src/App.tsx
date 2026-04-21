import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Landing from "./pages/landing/landing";
import Guilds from "./pages/guilds/guilds";
import AuthCallback from "./pages/auth/callback";
import { useEffect, useState, type ReactNode } from "react";
import AstraLoader from "./components/loader";
import { apiClient } from "./utils/api-client";
import { DISCORD_AUTH_URL, GET_ME_URL } from "./utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/userSlice";
import type { RootState } from "./store/store";
import LoginRedirect from "./pages/auth/login-redirect";
import Dashboard from "./pages/dashboard/dashboard";
import Welcome from "./pages/dashboard/components/welcome/welcome";
import DashboardIndex from "./pages/dashboard/components/index/dashboard-index";

function PrivateRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const isAuthenticated = !!user?.id;

  return isAuthenticated ? children : <Navigate to="/" />;
}

function AuthRoute({ children }: { children: ReactNode }) {
  const user = useSelector((state: RootState) => state.userReducer.user);
  const isAuthenticated = !!user?.id;

  return isAuthenticated ? <Navigate to="/" /> : children;
}

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
        <Route
          path="/login"
          element={
            <AuthRoute>
              <LoginRedirect />
            </AuthRoute>
          }
        />
        <Route path="/auth/callback" element={<AuthCallback />} />

        <Route
          path="/servers"
          element={
            <PrivateRoute>
              <Guilds />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/:guildId"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardIndex />} />
          <Route path="welcome" element={<Welcome />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
