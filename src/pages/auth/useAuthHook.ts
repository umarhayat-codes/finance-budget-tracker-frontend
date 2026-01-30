import { useState } from "react";
import axios from "axios";
import { SignUpFormData, SignInFormData } from "../../../types";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export const useAuthHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const signup = async (formData: SignUpFormData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, formData);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError("Something went wrong");
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
      const response = await axios.post(`${API_URL}/auth/login`, formData, {
        withCredentials: true,
      });
      setSuccess(true);
      return response.data.message;
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return { signup, login, loading, error, success };
};
