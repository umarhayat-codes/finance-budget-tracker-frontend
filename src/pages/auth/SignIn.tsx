import React, { useState } from "react";
import { toast } from "react-toastify";
import { SignInFormData } from "../../../types";
import { useAuthHook } from "./useAuthHook";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/useReduxHook";
import { loginSuccess } from "../../redux/slice/AuthSlice";
import { fetchUserProfile } from "../../redux/slice/ProfileSlice";

import { useEffect } from "react";
import { useAuth } from "../../redux/useReduxHook";

const SignIn: React.FC = () => {
  const { authorized } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);

  const [formData, setFormData] = useState<SignInFormData>({
    email: "",
    password: "",
  });

  const { login, loading, error, success } = useAuthHook();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const message = await login(formData);
      if (message === "Login successful") {
        dispatch(loginSuccess());
        dispatch(fetchUserProfile());
        toast.success(message);
        navigate("/");
      } else {
        toast.error("Wrong email or password");
      }
    } catch (err) {
      console.error("Login failed", err);
    }
  };

  return (
    <div className="signup-container flex min-h-screen items-center justify-center p-4">
      <div className="signup-form-wrapper w-[600px] h-[580.58px] rounded-[20px] p-[25px] flex flex-col justify-center shadow-2xl">
        <h2 className="mb-8 text-3xl font-bold text-white">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="signup-label mb-2 font-medium text-[16px]">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="jane@framer.com"
              value={formData.email}
              onChange={handleChange}
              className="signup-input h-[50px] rounded-[10px] px-4 outline-none focus:ring-2 focus:ring-clarioGreen placeholder:font-normal placeholder:text-[14px]"
            />
          </div>

          <div className="flex flex-col">
            <label className="signup-label mb-2 font-medium text-[16px]">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Please specify"
              value={formData.password}
              onChange={handleChange}
              className="signup-input h-[50px] rounded-[10px] px-4 outline-none focus:ring-2 focus:ring-clarioGreen placeholder:font-normal placeholder:text-[14px]"
            />
          </div>

          <button
            type="submit"
            className="signup-button h-[50px] rounded-[10px] mt-4 font-semibold text-[15px] transition-all hover:bg-[#a3ff52]"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
