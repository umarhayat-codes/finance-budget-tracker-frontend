import React, { useState } from "react";
import { SignUpFormData } from "../../types";

import { useAuthHook } from "./useAuthHook";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../../redux/useReduxHook";

const SignUp: React.FC = () => {
  const { authorized } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authorized) {
      navigate("/");
    }
  }, [authorized, navigate]);
  const [formData, setFormData] = useState<SignUpFormData>({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, loading, error, success } = useAuthHook();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // navigate defined above
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signup(formData);
      alert("Signup successful!");
      navigate("/auth/signin");
      // You can redirect here if needed
    } catch (err) {
      console.error("Signup failed", err);
    }
  };

  return (
    <div className="signup-container flex min-h-screen items-center justify-center p-4">
      <div className="signup-form-wrapper w-[600px] h-[580.58px] rounded-[20px] p-[25px] flex flex-col justify-center shadow-2xl">
        <h2 className="mb-8 text-3xl font-bold text-white">Register</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="signup-label mb-2 font-medium text-[16px]">
              Full name
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Jane"
              value={formData.fullName}
              onChange={handleChange}
              className="signup-input h-[50px] rounded-[10px] px-4 outline-none focus:ring-2 focus:ring-[#8CFF2E] placeholder:font-normal placeholder:text-[14px]"
            />
          </div>

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
              className="signup-input h-[50px] rounded-[10px] px-4 outline-none focus:ring-2 focus:ring-[#8CFF2E] placeholder:font-normal placeholder:text-[14px]"
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
              className="signup-input h-[50px] rounded-[10px] px-4 outline-none focus:ring-2 focus:ring-[#8CFF2E] placeholder:font-normal placeholder:text-[14px]"
            />
          </div>

          <button
            type="submit"
            className="signup-button h-[50px] rounded-[10px] mt-4 font-semibold text-[15px] transition-all hover:bg-[#a3ff52]"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
