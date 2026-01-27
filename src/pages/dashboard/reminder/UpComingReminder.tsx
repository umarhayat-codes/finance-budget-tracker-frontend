import React from "react";
import Layout from "../../../components/Layout";
import DashboardHeader from "../../../components/DashboardHeader";
import { useReminderHook } from "./useReminderHook";
import { ReminderItem, ReminderFormData } from "../../../../types";
import {
  FaCreditCard,
  FaBolt,
  FaCar,
  FaCheckCircle,
  FaEllipsisV,
} from "react-icons/fa";
import {
  MdOutlineEmail,
  MdNotificationsNone,
  MdAccessTime,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { IoMdTrain } from "react-icons/io";
import { GiReceiveMoney } from "react-icons/gi";
import { RiBillLine } from "react-icons/ri";
import { PiStudent } from "react-icons/pi";
import { BsToggleOn, BsToggleOff } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
const UpComingReminder = () => {
  const {
    remindersRow1,
    remindersRow2,
    remindersRow3,
    preferences,
    completionRate,
    loading,
    handlePreferenceToggle,
    addReminder,
  } = useReminderHook();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [formData, setFormData] = React.useState<ReminderFormData>({
    title: "",
    amount: "",
    dateStr: "",
  });

  if (loading) {
    return (
      <Layout>
        <div className="bg-white min-h-screen">
          <div className="p-6">
            <DashboardHeader />
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-buttonBg border-t-transparent rounded-full animate-spin"></div>
                <p className="text-[14px] font-bold text-reminderTitle font-inter">
                  Loading reminders...
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.amount && formData.dateStr) {
      addReminder({
        title: formData.title,
        amount: formData.amount,
        dateStr: formData.dateStr,
      });
      setIsModalOpen(false);
      setFormData({ title: "", amount: "", dateStr: "" });
    }
  };

  const renderBars = (color: string) => (
    <div className="flex items-end gap-[2px] h-[20px]">
      <div className={`w-[3px] h-[40%] ${color} rounded-sm`}></div>
      <div className={`w-[3px] h-[60%] ${color} rounded-sm`}></div>
      <div className={`w-[3px] h-[100%] ${color} rounded-sm`}></div>
      <div className={`w-[3px] h-[50%] ${color} rounded-sm`}></div>
      <div className={`w-[3px] h-[80%] ${color} rounded-sm`}></div>
    </div>
  );

  const getCardStyleAndIcon = (title: string) => {
    const t = title.toLowerCase();

    let style = {
      cardBg: "bg-reminderCardDark",
      radius: "rounded-[4px]",
      border: "border-transparent",
      titleColor: "text-reminderTextGray",
      amountColor: "text-reminderTextMuted",
      subColor: "text-reminderSubtext",
      iconBg: "bg-white/10 text-reminderTextGray",
      barColor: "bg-reminderCardGreen",
      icon: <RiBillLine className="text-lg" />,
      checkMark: false,
    };

    if (t.includes("travel") || t.includes("salary")) {
      style = {
        cardBg: "bg-profileSubTierBg",
        radius: "rounded-[1px]", // Matches radius:1 request
        border: "border border-reminderBorderRow3",
        titleColor: "text-black",
        amountColor: "text-gray-500",
        subColor: "text-gray-400",
        iconBg: "bg-gray-100 text-settingSearchText",
        barColor: "bg-settingSearchText",
        icon: t.includes("travel") ? (
          <IoMdTrain className="text-lg" />
        ) : (
          <GiReceiveMoney className="text-lg" />
        ),
        checkMark: true,
      };
    } else if (
      t.includes("rent") ||
      t.includes("student") ||
      t.includes("studnet")
    ) {
      style = {
        cardBg: "bg-reminderCardGray",
        radius: "rounded-[1px]",
        border: "border border-reminderBorderRow2",
        titleColor: "text-black",
        amountColor: "text-gray-600",
        subColor: "text-gray-500",
        iconBg: "bg-white/40 text-black",
        barColor: "bg-black",
        icon: t.includes("rent") ? (
          <RiBillLine className="text-lg" />
        ) : (
          <PiStudent className="text-lg" />
        ),
        checkMark: false,
      };
    } else if (t.includes("electricity") || t.includes("elecrity")) {
      style = {
        cardBg: "bg-reminderCardDark",
        radius: "rounded-[20px]",
        border: "border-none",
        titleColor: "text-white",
        amountColor: "text-gray-300",
        subColor: "text-gray-400",
        iconBg: "bg-white/10 text-white",
        barColor: "bg-primary",
        icon: <FaBolt className="text-lg" />,
        checkMark: false,
      };
    } else if (t.includes("car insurance")) {
      style = {
        cardBg: "bg-buttonBg",
        radius: "rounded-[20px]",
        border: "border-none",
        titleColor: "text-white",
        amountColor: "text-gray-300",
        subColor: "text-gray-400",
        iconBg: "bg-white/10 text-white",
        barColor: "bg-primary",
        icon: <FaCar className="text-lg" />,
        checkMark: false,
      };
    } else if (t.includes("credit card")) {
      style = {
        cardBg: "bg-primary",
        radius: "rounded-[20px]",
        border: "border-none",
        titleColor: "text-black",
        amountColor: "text-black/70",
        subColor: "text-black/60",
        iconBg: "bg-black/10 text-black",
        barColor: "bg-black",
        icon: <FaCreditCard className="text-lg" />,
        checkMark: true,
      };
    }

    return style;
  };

  const CardRow1 = ({ item }: { item: ReminderItem }) => {
    const style = getCardStyleAndIcon(item.title);

    return (
      <div
        className={`${style.cardBg} ${style.border} ${style.radius} p-4 flex flex-col justify-between h-[140px] relative font-inter transition-all hover:shadow-lg`}
      >
        <div className="flex justify-between items-start">
          <div className={`p-2 rounded-full ${style.iconBg}`}>{style.icon}</div>
          <span className={`${style.subColor} text-[10px] font-bold`}>
            {item.dateStr || "Today"}
          </span>
        </div>
        <div>
          <h3 className={`${style.titleColor} text-[15px] font-bold mt-2`}>
            {item.title}
          </h3>
          <div className="flex justify-between items-end mt-1">
            <div>
              <p className={`${style.subColor} text-[10px] font-bold mb-1`}>
                {item.subtitle}
              </p>
              <p className={`${style.amountColor} text-[12px] font-bold`}>
                {item.amount}
              </p>
            </div>
            {style.checkMark ? (
              <FaCheckCircle
                className={`${style.cardBg.includes("8CFF2E") ? "text-black" : style.cardBg.includes("FCFDFD") ? "text-black" : "text-white"} text-xl`}
              />
            ) : (
              renderBars(style.barColor)
            )}
          </div>
        </div>
      </div>
    );
  };

  interface CardGenericProps {
    item: ReminderItem;
    bg: string;
    border: string;
    textColor: string;
    amountColor: string;
    subColor: string;
  }

  const CardGeneric = ({
    item,
    bg,
    border,
    textColor,
    amountColor,
    subColor,
  }: CardGenericProps) => {
    return (
      <div
        className={`${bg} border ${border} rounded-[1px] p-4 flex flex-col justify-between h-[140px] font-inter`}
      >
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-full bg-gray-200/50">
            {getCardStyleAndIcon(item.title).icon}
          </div>
          <span className={`${subColor} text-[10px] font-bold`}>
            {item.subtitle || "Reminder"}
          </span>
        </div>
        <div>
          <h3 className={`${textColor} text-[15px] font-bold mt-2`}>
            {item.title}
          </h3>
          <div className="flex justify-between items-end mt-1">
            <div>
              <p className={`${subColor} text-[10px] font-bold mb-1`}>
                {item.subtitle}
              </p>
              <p className={`${amountColor} text-[12px] font-bold`}>
                {item.amount}
              </p>
            </div>
            {renderBars(
              bg.includes("reminderCardGray")
                ? "bg-reminderCardGreen"
                : "bg-reminderCardGreen",
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="bg-white min-h-screen">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <DashboardHeader />
          </div>

          <div className="flex flex-col xlg:flex-row gap-8">
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-reminderTitle text-[25px] font-inter font-bold mb-6">
                  Upcoming Reminders
                </h2>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-2 rounded-[10px] bg-buttonBg px-4 py-3 font-inter text-[12px] font-bold text-textWhite hover:bg-black/90 transition-all shadow-md"
                >
                  <FiPlus className="text-lg" />
                  New Reminder
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {remindersRow1.map((item, index) => (
                  <CardRow1 key={item.id} item={item} />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {remindersRow2.map((item) => (
                  <CardGeneric
                    key={item.id}
                    item={item}
                    bg="bg-reminderCardGray"
                    border="border-reminderBorderRow2"
                    textColor="text-reminderTextRow2"
                    amountColor="text-reminderAmountRow2"
                    subColor="text-reminderSubRow2"
                  />
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {remindersRow3.map((item) => (
                  <CardGeneric
                    key={item.id}
                    item={item}
                    bg="bg-reminderCardWhite"
                    border="border-reminderBorderRow3"
                    textColor="text-reminderTextRow3"
                    amountColor="text-reminderAmountRow2"
                    subColor="text-reminderSubRow2"
                  />
                ))}
              </div>
            </div>

            <div className="w-full xlg:w-[320px] flex flex-col gap-6 font-inter">
              <div className="bg-reminderPreferencesBg border border-reminderPreferencesBorder rounded-xl p-6 relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-reminderPrefTitle text-[17px] font-bold">
                    Reminder Preferences
                  </h3>
                  <FaEllipsisV className="text-gray-400 cursor-pointer" />
                </div>

                <div className="flex flex-col gap-6">
                  {preferences.map((pref, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center"
                    >
                      <span className="text-reminderPrefLabel text-[14px] font-bold">
                        {pref.label}
                      </span>
                      <button
                        onClick={() => handlePreferenceToggle(pref.id)}
                        className="text-3xl transition-colors duration-200"
                      >
                        {pref.enabled ? (
                          <BsToggleOn className="text-reminderCardDark/80" />
                        ) : (
                          <BsToggleOff className="text-gray-300" />
                        )}
                      </button>
                    </div>
                  ))}

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-reminderPrefLabel text-[14px] font-bold">
                      Default Reminder Time
                    </span>
                    <BsToggleOn className="text-reminderCardDark/80 text-3xl" />
                  </div>
                  <div className="flex justify-between items-center mt-2 p-2 rounded hover:bg-gray-50 cursor-pointer">
                    <span className="text-reminderPrefLabel text-[14px] font-bold">
                      Default Reminder Time
                    </span>
                    <MdKeyboardArrowDown className="text-gray-400 text-xl" />
                  </div>
                </div>
              </div>

              <div className="bg-reminderCompletionBg border border-reminderCompletionBorder rounded-[10px] p-6 h-[300px] flex flex-col items-center justify-center">
                <h3 className="text-reminderCompletionText text-[17px] font-bold mb-6 self-start w-full text-center">
                  Completion Rate
                </h3>
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#333C2F"
                      strokeWidth="4"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#8CFF2E"
                      strokeWidth="4"
                      strokeDasharray={`${completionRate}, 100`}
                      className="animate-spin-slow"
                    />
                  </svg>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-reminderCompletionText text-2xl font-bold">
                    {completionRate}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 w-[400px] shadow-2xl relative font-inter">
              <h3 className="text-[20px] font-bold mb-6 text-gray-800">
                New Reminder
              </h3>
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Credit Card, Electricity Bill"
                    className="w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-2">
                    Price
                  </label>
                  <input
                    type="text"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="e.g. $200"
                    className="w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-600 mb-2">
                    Date
                  </label>
                  <input
                    type="text"
                    name="dateStr"
                    value={formData.dateStr}
                    onChange={handleInputChange}
                    placeholder="e.g. Tomorrow, Jan 20"
                    className="w-full border border-gray-300 rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
                    required
                  />
                </div>
                <div className="flex gap-4 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 text-[14px] font-bold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 text-[14px] font-bold text-white bg-black rounded-lg hover:bg-gray-800 transition-colors"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UpComingReminder;
