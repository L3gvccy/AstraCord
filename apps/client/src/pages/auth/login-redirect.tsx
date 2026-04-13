import { DISCORD_AUTH_URL } from "@/utils/constants";
import React, { useEffect } from "react";

const LoginRedirect = () => {
  useEffect(() => {
    window.location.href = DISCORD_AUTH_URL;
  }, []);
  return <div className="p-4">Redirecting to Discord...</div>;
};

export default LoginRedirect;
