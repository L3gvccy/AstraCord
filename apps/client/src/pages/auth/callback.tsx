import { setUser } from "@/store/userSlice";
import { apiClient } from "@/utils/api-client";
import { GET_ME_URL } from "@/utils/constants";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

const AuthCallback = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const getMe = async () => {
    try {
      const res = await apiClient.get(GET_ME_URL);
      console.log(res.data);
      dispatch(setUser(res.data));
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Error while logging in");
      console.error(error);
    } finally {
      navigate("/");
    }
  };

  useEffect(() => {
    const token = searchParams.get("token");
    if (!token) return;
    localStorage.setItem("jwt", token);
    getMe();
  }, []);

  return <div>Callback</div>;
};

export default AuthCallback;
