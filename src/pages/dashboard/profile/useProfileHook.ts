import { useState } from "react";
import axios, { AxiosError } from "axios";
import {
  ProfileFormData,
  ProfileApiResponse,
  ApiErrorResponse,
} from "../../../../types";
import { toast } from "react-toastify";

export const useProfileHook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveProfileData = async (userId: string, data: ProfileFormData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/profile/save",
        {
          userId,
          ...data,
        },
      );
      toast.success("Profile saved successfully");
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to save profile");
      setError(axiosError.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileData = async (
    userId: string,
  ): Promise<ProfileApiResponse | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/profile/get/${userId}`,
      );
      return response.data.data;
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      if (axiosError.response?.status === 404) {
        return null;
      }
      toast.error("Failed to fetch profile");
      setError(axiosError.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveProfileData,
    fetchProfileData,
    loading,
    error,
  };
};
