import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  ReminderFormData,
  ReminderItem,
  ReminderPreference,
  UseReminderHookResult,
  ReminderCardStyle,
} from "../../../../types";
import { toast } from "react-toastify";
import { useAuth } from "../../../redux/useReduxHook";
import { FaCreditCard, FaBolt, FaCar } from "react-icons/fa";
import { IoMdTrain } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { RiBillLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import React from "react";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ReminderFormData>({
    title: "",
    amount: "",
    dateStr: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
        `http://localhost:5000/api/reminder/get/${user.id}`,
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
      toast.error("Failed to fetch reminders");
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
      await axios.post("http://localhost:5000/api/reminder/create", {
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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.amount && formData.dateStr) {
      await addReminder(formData);
      setIsModalOpen(false);
      setFormData({ title: "", amount: "", dateStr: "" });
    }
  };

  const renderBars = (color: string) => {
    const bars = [
      { h: "25%", opacity: "opacity-40" },
      { h: "65%", opacity: "opacity-60" },
      { h: "85%", opacity: "opacity-80" },
      { h: "45%", opacity: "opacity-50" },
      { h: "35%", opacity: "opacity-45" },
      { h: "75%", opacity: "opacity-75" },
      { h: "80%", opacity: "opacity-85" },
      { h: "100%", opacity: "opacity-100" },
    ];

    return React.createElement(
      "div",
      { className: "flex items-end gap-[3px] h-[30px]" },
      bars.map((bar, i) =>
        React.createElement("div", {
          key: i,
          className: `w-[8px] ${color} ${bar.opacity} rounded-[2px]`,
          style: { height: bar.h },
        }),
      ),
    );
  };

  const getCardStyleAndIcon = (title: string): ReminderCardStyle => {
    const t = title.toLowerCase();

    let style: ReminderCardStyle = {
      cardBg: "bg-reminderCardDark",
      radius: "rounded-[4px]",
      border: "border-transparent",
      titleColor: "text-reminderTextGray",
      amountColor: "text-reminderTextMuted",
      subColor: "text-reminderSubtext",
      iconBg: "bg-white/10 text-reminderTextGray",
      barColor: "bg-reminderCardGreen",
      icon: React.createElement(RiBillLine, { className: "text-lg" }),
      checkMark: false,
    };

    if (t.includes("travel") || t.includes("salary")) {
      style = {
        ...style,
        cardBg: "bg-profileSubTierBg",
        border: "border border-reminderBorderRow3",
        titleColor: "text-clarioBlack",
        amountColor: "text-reminderTextMuted",
        subColor: "text-reminderSubtext",
        iconBg: "bg-clarioIconBg text-settingSearchText",
        barColor: "bg-settingSearchText",
        icon: t.includes("travel")
          ? React.createElement(IoMdTrain, { className: "text-lg" })
          : React.createElement(GiReceiveMoney, { className: "text-lg" }),
        checkMark: true,
      };
    } else if (
      t.includes("rent") ||
      t.includes("student") ||
      t.includes("studnet")
    ) {
      style = {
        ...style,
        cardBg: "bg-reminderCardGray",
        border: "border border-reminderBorderRow2",
        titleColor: "text-reminderTextMain",
        amountColor: "text-reminderTextRow2",
        subColor: "text-reminderSubRow2",
        iconBg: "bg-white/40 text-clarioBlack",
        barColor: "bg-clarioBlack",
        icon: t.includes("rent")
          ? React.createElement(RiBillLine, { className: "text-lg" })
          : React.createElement(PiStudent, { className: "text-lg" }),
        checkMark: false,
      };
    } else if (t.includes("electricity") || t.includes("elecrity")) {
      style = {
        ...style,
        cardBg: "bg-reminderCardDark",
        border: "border-none",
        titleColor: "text-clarioWhite",
        amountColor: "text-reminderTextGray",
        subColor: "text-reminderTextMuted",
        iconBg: "bg-white/10 text-white",
        barColor: "bg-primary",
        icon: React.createElement(FaBolt, { className: "text-lg" }),
        checkMark: false,
      };
    } else if (t.includes("car insurance")) {
      style = {
        ...style,
        cardBg: "bg-buttonBg",
        border: "border-none",
        titleColor: "text-clarioWhite",
        amountColor: "text-reminderTextGray",
        subColor: "text-reminderTextMuted",
        iconBg: "bg-white/10 text-white",
        barColor: "bg-primary",
        icon: React.createElement(FaCar, { className: "text-lg" }),
        checkMark: false,
      };
    } else if (t.includes("credit card")) {
      style = {
        ...style,
        cardBg: "bg-primary",
        border: "border-none",
        titleColor: "text-clarioBlack",
        amountColor: "text-black/70",
        subColor: "text-black/60",
        iconBg: "bg-black/10 text-clarioBlack",
        barColor: "bg-clarioBlack",
        icon: React.createElement(FaCreditCard, { className: "text-lg" }),
        checkMark: true,
      };
    }

    return style;
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
    isModalOpen,
    setIsModalOpen,
    formData,
    handleInputChange,
    handleSubmit,
    getCardStyleAndIcon,
    renderBars,
  };
};
