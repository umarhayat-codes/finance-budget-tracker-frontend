import { AddTransactionProps, TransactionFormData } from "../../../../types";
import { useAppDispatch } from "src/redux/useReduxHook";
import { saveTransaction } from "src/redux/slice/TransactionSlice";
import { IconType } from "react-icons";
import { useEffect, useState, useRef } from "react";
import { FiCalendar, FiDownload, FiPlus, FiX } from "react-icons/fi";
import Button from "src/components/Button";
import { useTransactionHook } from "./useTransactionHook";
import { toast } from "react-toastify";

const AddTransaction: React.FC<AddTransactionProps> = () => {
  const CalendarIcon = FiCalendar as IconType;
  const DownloadIcon = FiDownload as IconType;
  const PlusIcon = FiPlus as IconType;
  const CrossIcon = FiX as IconType;

  const {
    categories,
    incomeCategories,
    selectedMonth,
    handleMonthSelect,
    validateExpense,
  } = useTransactionHook();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [formData, setFormData] = useState<TransactionFormData>({
    category: "",
    date: "",
    time: "",
    amount: "",
    method: "",
    type: "expense",
  });

  // Set default date and time from system
  useEffect(() => {
    if (isModalOpen) {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");

      setFormData((prev) => ({
        ...prev,
        date: `${year}-${month}-${day}`,
        time: `${hours}:${minutes}`,
      }));
      setValidationError(null);
    }
  }, [isModalOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationError) setValidationError(null);
  };

  const dispatch = useAppDispatch();

  const getMonthName = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.type === "expense") {
      const monthName = getMonthName(formData.date);
      const validation = validateExpense({
        category: formData.category,
        month: monthName,
        amount: parseFloat(formData.amount),
      });

      if (!validation.isValid) {
        setValidationError(validation.errorMessage);
        return;
      }
    }

    dispatch(saveTransaction(formData));
    toast.success("Transaction added successfully");
    setIsModalOpen(false);
    // Reset form
    setFormData({
      category: "",
      date: "",
      time: "",
      amount: "",
      method: "",
      type: "expense",
    });
    setValidationError(null);
  };

  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const monthRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const months: string[] = [
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
            Transactions
          </h1>
          <p className="font-manrope text-[12px] font-medium text-transactionSub">
            View and manage all your income and expenses in one place
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Month Filter */}
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
                      handleMonthSelect(month as any);
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

          {/* Add Transaction Button */}
          <Button
            onClick={() => setIsModalOpen(true)}
            className="rounded-lg border-[0.86px] border-addBtnBorder bg-addBtnBg px-4 py-2 font-manrope text-[10px] font-medium text-addBtnText hover:bg-black/90 transition-all"
            leftIcon={<PlusIcon size={14} />}
          >
            <span>Add Transaction</span>
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-[500px] rounded-2xl bg-white p-6 shadow-2xl animate-fade-in relative">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 text-textGray hover:text-black transition-colors"
            >
              <CrossIcon size={20} />
            </button>

            <h2 className="mb-6 font-inter text-[20px] font-bold text-transactionTitle">
              Add Transaction
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Validation Error Message */}
              {validationError && (
                <div className="rounded-lg bg-red-50 p-3 text-[12px] font-medium text-red-600 border border-red-200">
                  {validationError}
                </div>
              )}

              {/* Transaction Type Toggle */}
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: "income" }))
                  }
                  className={`flex-1 py-2 rounded-md text-[14px] font-medium transition-all ${
                    formData.type === "income"
                      ? "bg-white text-transactionPositive shadow-sm"
                      : "text-textGray hover:text-black"
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, type: "expense" }))
                  }
                  className={`flex-1 py-2 rounded-md text-[14px] font-medium transition-all ${
                    formData.type === "expense"
                      ? "bg-white text-transactionNegative shadow-sm"
                      : "text-textGray hover:text-black"
                  }`}
                >
                  Expense
                </button>
              </div>

              {/* Category */}
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
                  {formData.type === "income"
                    ? incomeCategories.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))
                    : categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                </select>
              </div>

              {/* Date and Time */}
              <div className="flex gap-4">
                <div className="flex flex-1 flex-col gap-1">
                  <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                    required
                  />
                </div>
                <div className="flex flex-1 flex-col gap-1">
                  <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                    required
                  />
                </div>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Amount
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

              {/* Method */}
              <div className="flex flex-col gap-1">
                <label className="font-manrope text-[12px] font-semibold text-transactionTitle">
                  Payment Method
                </label>
                <select
                  name="method"
                  value={formData.method}
                  onChange={handleInputChange}
                  className="w-full rounded-lg border border-exportBorder bg-white px-4 py-3 font-manrope text-[14px] outline-none focus:border-transactionTitle"
                  required
                >
                  <option value="" disabled>
                    Select method
                  </option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="mt-2 w-full justify-center rounded-lg bg-black py-3 font-manrope text-[14px] font-bold text-white transition-opacity hover:opacity-90"
              >
                Add Transaction
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTransaction;
