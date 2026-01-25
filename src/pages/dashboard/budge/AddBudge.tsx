import React from "react";
import { IconType } from "react-icons";
import { FiCalendar, FiDownload, FiPlus, FiX } from "react-icons/fi";
import Button from "src/components/Button";
import { useBudgeHook } from "./useBudgeHook";
import { AddBudgeProps, Month } from "../../../../types";

const AddBudge: React.FC<AddBudgeProps> = () => {
  const CalendarIcon = FiCalendar as IconType;
  const DownloadIcon = FiDownload as IconType;
  const PlusIcon = FiPlus as IconType;
  const CrossIcon = FiX as IconType;

  const {
    isModalOpen,
    formData,
    categories,
    handleInputChange,
    openModal,
    closeModal,
    handleSubmit,
    selectedMonth,
    handleMonthSelect,
  } = useBudgeHook();

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = React.useState(false);
  const monthRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        monthRef.current &&
        !monthRef.current.contains(event.target as Node)
      ) {
        setIsMonthDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const months: Month[] = [
    "All",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      <div className="flex w-full flex-col justify-between gap-4 py-6 md:flex-row md:items-center">
        {/* Header Text */}
        <div className="flex flex-col gap-1">
          <h1 className="font-inter text-[20px] font-bold text-transactionTitle">
            Budge
          </h1>
          <p className="font-manrope text-[12px] font-medium text-transactionSub">
            Track and optimize your spending
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Month/Year Filter */}
          <div className="relative" ref={monthRef}>
            <Button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className="rounded-lg border-[0.86px] border-exportBorder bg-exportBg px-4 py-2 font-manrope text-[10px] font-medium text-transactionTitle hover:bg-gray-100"
              leftIcon={<CalendarIcon size={14} />}
              rightIcon={
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`ml-1 transition-transform ${
                    isMonthDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              }
            >
              <span>
                {selectedMonth === "All" ? "All Months" : selectedMonth}
              </span>
            </Button>

            {/* Dropdown Menu */}
            {isMonthDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white shadow-lg z-50 max-h-60 overflow-y-auto">
                {months.map((month) => (
                  <div
                    key={month}
                    onClick={() => {
                      handleMonthSelect(month);
                      setIsMonthDropdownOpen(false);
                    }}
                    className={`cursor-pointer px-4 py-2 text-[12px] font-manrope hover:bg-gray-50 ${
                      selectedMonth === month
                        ? "bg-gray-100 font-bold"
                        : "text-gray-600"
                    }`}
                  >
                    {month === "All" ? "All Months" : month}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Button */}
          <Button
            className="rounded-lg border-[0.86px] border-exportBorder bg-exportBg px-4 py-2 font-manrope text-[10px] font-medium text-transactionTitle hover:bg-gray-100"
            leftIcon={<DownloadIcon size={14} />}
          >
            <span>Export</span>
          </Button>

          {/* Set New Budget Button */}
          <Button
            onClick={openModal}
            className="rounded-lg border-[0.86px] border-addBtnBorder bg-addBtnBg px-4 py-2 font-manrope text-[10px] font-medium text-addBtnText hover:bg-black/90 transition-all"
            leftIcon={<PlusIcon size={14} />}
          >
            <span>Set New Budge</span>
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl animate-fade-in relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute right-4 top-4 text-textGray hover:text-black transition-colors"
            >
              <CrossIcon size={20} />
            </button>

            <h2 className="mb-6 font-inter text-[20px] font-bold text-transactionTitle">
              Set New Budge
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Month Selection */}
              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Select Month
                </label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                  required
                >
                  <option value="" disabled>
                    Select month
                  </option>
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Selection */}
              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Select Year
                </label>
                <input
                  type="number"
                  name="year"
                  placeholder="2024"
                  value={formData.year}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                  required
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Budget Amount */}
              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Budget Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-textGray">
                    $
                  </span>
                  <input
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-exportBorder bg-white pl-8 pr-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 w-full justify-center rounded-lg bg-black py-3 font-manrope text-[14px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Set New Budge
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBudge;
