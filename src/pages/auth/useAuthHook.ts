import { useState } from "react";
import axios from "axios";
import { SignUpFormData, SignInFormData } from "../../types";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signup = async (formData: SignUpFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/signup",
        formData
      );
      setSuccess(true);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (formData: SignInFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
        { withCredentials: true }
      );
      console.log("login response", response);
      setSuccess(true);
      return response.data.message;
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log("login error", err.response?.data?.message);
      return err.response?.data?.message;
      // throw err;
    } finally {
      setLoading(false);
    }
  };

  return { signup, login, loading, error, success };
};
