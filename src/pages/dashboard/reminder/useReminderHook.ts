import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ReminderFormData,
  ReminderItem,
  ReminderPreference,
  UseReminderHookResult,
} from "../../../../types";
import { toast } from "react-toastify";
import { useAuth } from "../../../redux/useReduxHook";

export const useReminderHook = (): UseReminderHookResult => {
  const { user } = useAuth();
  const [preferences, setPreferences] = useState<ReminderPreference[]>([
    {
      id: "1",
      label: "Email Notifications",
      enabled: true,
      type: "toggle",
    },
    {
      id: "2",
      label: "Email Notifications",
      enabled: true,
      type: "toggle",
    },
    {
      id: "3",
      label: "Push Notifications",
      enabled: true,
      type: "toggle",
    },
    {
      id: "4",
      label: "Default Reminder Time",
      enabled: true,
      type: "toggle",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(true);

  const [remindersRow1, setRemindersRow1] = useState<ReminderItem[]>([]);
  const [remindersRow2, setRemindersRow2] = useState<ReminderItem[]>([]);
  const [remindersRow3, setRemindersRow3] = useState<ReminderItem[]>([]);

  const handlePreferenceToggle = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  const fetchReminders = useCallback(async () => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reminder/get/${user.id}`,
      );
      const data: ReminderItem[] = response.data.data;

      const r1: ReminderItem[] = [];
      const r2: ReminderItem[] = [];
      const r3: ReminderItem[] = [];

      data.forEach((item, index) => {
        if (index < 3) r1.push(item);
        else if (index < 6) r2.push(item);
        else r3.push(item);
      });

      setRemindersRow1(r1);
      setRemindersRow2(r2);
      setRemindersRow3(r3);
    } catch (error) {
      console.error("Failed to fetch reminders", error);
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchReminders();
    }
  }, [user?.id, fetchReminders]);

  const addReminder = async (data: ReminderFormData) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    let type = "rent";
    const lowerTitle = data.title.toLowerCase();

    if (lowerTitle.includes("credit card")) {
      type = "creditCard";
    } else if (lowerTitle.includes("electricity bill")) {
      type = "electricity";
    } else if (lowerTitle.includes("car insuranc")) {
      type = "carInsurance";
    } else if (lowerTitle.includes("loan")) {
      type = "loan";
    } else if (
      lowerTitle.includes("salari") ||
      lowerTitle.includes("travel fund")
    ) {
      type = "salary";
    }

    try {
      await axios.post("http://localhost:3000/api/reminder/create", {
        userId: user.id,
        title: data.title,
        amount: data.amount,
        dateStr: data.dateStr,
        type,
      });
      toast.success("Reminder created successfully");
      fetchReminders();
    } catch (error) {
      toast.error("Failed to create reminder");
      console.error("Failed to create reminder", error);
    }
  };

  return {
    remindersRow1,
    remindersRow2,
    remindersRow3,
    preferences,
    completionRate: 85,
    loading,
    handlePreferenceToggle,
    addReminder,
  };
};
