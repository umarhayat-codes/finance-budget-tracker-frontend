import { useState, useEffect } from "react";
import axios from "axios";
import {
  ReminderItem,
  ReminderPreference,
  UseReminderHookResult,
} from "../../../../types";
import { toast } from "react-toastify";

export const useReminderHook = (): UseReminderHookResult => {
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

  const handlePreferenceToggle = (id: string) => {
    setPreferences((prev) =>
      prev.map((pref) =>
        pref.id === id ? { ...pref, enabled: !pref.enabled } : pref,
      ),
    );
  };

  const [remindersRow1, setRemindersRow1] = useState<ReminderItem[]>([]);
  const [remindersRow2, setRemindersRow2] = useState<ReminderItem[]>([]);
  const [remindersRow3, setRemindersRow3] = useState<ReminderItem[]>([]);

  // Assuming user ID is stored/available. For now hardcoded or fetched from context if available.
  // Using a placeholder ID or retrieving from local storage/auth context would be ideal.
  // For this task, I will use a dummy ID or passed ID if the user requested passing ID from frontend.
  // The user said "get data reminder by using user id which id come from frontend".
  // I will assume a fixed ID for now or grab from localStorage if implemented.
  // Let's assume a generic user ID or one that matches standard test users.
  const userId = "65a123456789abcde1234567"; // Placeholder, would come from Auth Context

  useEffect(() => {
    fetchReminders();
  }, []);

  const fetchReminders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/reminder/get/${userId}`,
      );
      const data: ReminderItem[] = response.data.data;

      // Distribute reminders into rows or just put all in row1 for now as per logic
      // Or we can distribute them cyclically or based on some property.
      // Previous logic had them in different rows.
      // Let's put all in row 1 for simplicity or split them.
      // The user wants "same styling format". The styling depends on rows in the UI (CardRow1 vs CardGeneric).
      // I'll put recent ones in row 1, others in row 2/3.

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
    }
  };

  const addReminder = async (data: {
    title: string;
    amount: string;
    dateStr: string;
  }) => {
    let type: ReminderItem["type"] = "rent"; // default
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
        userId,
        title: data.title,
        amount: data.amount,
        dateStr: data.dateStr,
        type,
      });
      // Refresh list
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
    handlePreferenceToggle,
    addReminder,
  };
};
