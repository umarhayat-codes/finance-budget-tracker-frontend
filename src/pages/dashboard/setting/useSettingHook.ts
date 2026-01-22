import { useState } from "react";
import axios from "axios";
import { useAuth } from "../../../redux/useReduxHook";
import { UseSettingHookResult } from "../../../../types";

const useSettingHook = (): UseSettingHookResult => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(true);
  const [defaultCurrency, setDefaultCurrency] = useState<string>("USD");
  const [twoFactorAuth, setTwoFactorAuth] = useState<boolean>(false);

  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { user } = useAuth();

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const toggleEmailNotifications = () => setEmailNotifications((prev) => !prev);
  const togglePushNotifications = () => setPushNotifications((prev) => !prev);
  const toggleTwoFactorAuth = () => setTwoFactorAuth((prev) => !prev);

  const handlePasswordChange = async () => {
    if (!newPassword || !confirmPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!user?.email) {
      alert("User email not found. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/change-password",
        {
          email: user.email,
          newPassword,
          confirmPassword,
        },
      );

      alert(response.data.message);
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return {
    darkMode,
    toggleDarkMode,
    emailNotifications,
    toggleEmailNotifications,
    pushNotifications,
    togglePushNotifications,
    defaultCurrency,
    setDefaultCurrency,
    twoFactorAuth,
    toggleTwoFactorAuth,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handlePasswordChange,
  };
};

export default useSettingHook;
