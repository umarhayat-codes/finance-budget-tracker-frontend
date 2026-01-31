import React from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import { useReminderHook } from "./useReminderHook";
import {
  ReminderItem,
  ReminderFormData,
  CardGenericProps,
} from "../../../../types";
import {
  FaCreditCard,
  FaBolt,
  FaCar,
  FaCheckCircle,
  FaEllipsisV,
} from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
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
    isModalOpen,
    setIsModalOpen,
    formData,
    handleInputChange,
    handleSubmit,
    getCardStyleAndIcon,
    renderBars,
  } = useReminderHook();

  const CardRow1 = ({ item }: { item: ReminderItem }) => {
    const style = getCardStyleAndIcon(item.title);

    return (
      <div
        className={`${style.cardBg} ${style.border} ${style.radius} p-4 flex flex-col justify-between  h-[160px] relative font-inter transition-all hover:shadow-lg`}
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
            {renderBars(style.barColor)}
          </div>
        </div>
      </div>
    );
  };

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
        className={`${bg} border ${border} rounded-[1px] p-4 flex flex-col justify-between h-[160px] font-inter transition-all hover:shadow-lg`}
      >
        <div className="flex justify-between items-start">
          <div className="p-2 rounded-full bg-clarioIconBg">
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
    <>
      <div className="min-h-screen">
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 ">
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
                  <FaEllipsisV className="text-reminderTextGray cursor-pointer" />
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
                          <BsToggleOff className="text-reminderTextGray" />
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
                  <div className="flex justify-between items-center mt-2 p-2 rounded hover:bg-bgColor cursor-pointer">
                    <span className="text-reminderPrefLabel text-[14px] font-bold">
                      Default Reminder Time
                    </span>
                    <MdKeyboardArrowDown className="text-reminderTextGray text-xl" />
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
                      className="stroke-reminderCardDark"
                      strokeWidth="4"
                      strokeDasharray="100, 100"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      className="stroke-reminderCardGreen"
                      strokeWidth="4"
                      strokeDasharray={`${completionRate}, 100`}
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
                    className="w-full border border-createGoalBorder rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
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
                    className="w-full border border-createGoalBorder rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
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
                    className="w-full border border-createGoalBorder rounded-lg p-3 text-[14px] focus:outline-none focus:border-black"
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
    </>
  );
};

export default UpComingReminder;
