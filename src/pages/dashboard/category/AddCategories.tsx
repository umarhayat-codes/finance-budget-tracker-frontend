import React from "react";
import { BarChart, Bar, ResponsiveContainer, Cell } from "recharts";
import { useCategoryHook } from "./useCategoryHook";
import { FiX } from "react-icons/fi";

const AddCategories: React.FC = () => {
  const {
    categories,
    loading,
    error,
    isModalOpen,
    formData,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleTypeChange,
    handleCreateCategory,
    PlusIcon,
    savings,
    isSavingModalOpen,
    savingFormData,
    handleOpenSavingModal,
    handleCloseSavingModal,
    handleSavingInputChange,
    handleCreateSaving,
    SavingIcon,
  } = useCategoryHook();

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-inter">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="rounded-[10px] bg-buttonBg px-4 py-2 font-inter text-sm font-bold text-textWhite"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full relative">
      <div className="flex items-center justify-between">
        <h2 className="font-inter font-bold text-[22px] text-categoryTextMain">
          Manage Categories
        </h2>
        <div className="flex items-center gap-3">
          <button
            onClick={handleOpenSavingModal}
            className="flex items-center gap-2 rounded-[10px] bg-buttonBg px-4 py-3 font-inter text-[12px] font-bold text-textWhite hover:bg-black/90 transition-all shadow-md"
          >
            <SavingIcon className="text-lg" />
            Saving
          </button>
          <button
            onClick={handleOpenModal}
            className="flex items-center gap-2 rounded-[10px] bg-buttonBg px-4 py-3 font-inter text-[12px] font-bold text-textWhite hover:bg-black/90 transition-all shadow-md"
          >
            <PlusIcon className="text-lg" />
            New Category
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {savings.map((save) => {
          const Icon = save.icon;
          return (
            <div
              key={save.id}
              className="flex flex-col justify-between rounded-[10px] border border-categoryCardBorder bg-categoryCardBg p-5 h-[200px] shadow-sm transition-hover hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-gray-100">
                  <Icon className="text-gray-800 text-lg" />
                </div>
                <span className="font-inter font-normal text-[9px] text-categoryTextMuted">
                  {save.subtitle}
                </span>
              </div>

              <div className="mt-2">
                <h3 className="font-inter font-bold text-[14px] text-categoryTextSecondary">
                  {save.title}
                </h3>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col gap-1">
                  <span className="font-inter font-normal text-[8px] text-categoryTextLabel">
                    {save.priceDetails}
                  </span>
                  <span className="font-inter font-normal text-[12px] text-categoryTextPrice">
                    {save.priceValue}
                  </span>
                </div>

                <div className="w-[80px] h-[30px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={save.chartData}>
                      <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {save.chartData.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? "#8FAB33" : "#ABC656"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}

        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              className="flex flex-col justify-between rounded-[10px] border border-categoryCardBorder bg-categoryCardBg p-5 h-[200px] shadow-sm transition-hover hover:shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center justify-center w-[32px] h-[32px] rounded-full bg-gray-100">
                  <Icon className="text-gray-800 text-lg" />
                </div>
                <span className="font-inter font-normal text-[9px] text-categoryTextMuted">
                  {cat.subtitle}
                </span>
              </div>

              <div className="mt-2">
                <h3 className="font-inter font-bold text-[14px] text-categoryTextSecondary">
                  {cat.title}
                </h3>
              </div>

              <div className="flex items-end justify-between mt-auto">
                <div className="flex flex-col gap-1">
                  <span className="font-inter font-normal text-[8px] text-categoryTextLabel">
                    {cat.priceDetails}
                  </span>
                  <span className="font-inter font-normal text-[12px] text-categoryTextPrice">
                    {cat.priceValue}
                  </span>
                </div>

                <div className="w-[80px] h-[30px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cat.chartData}>
                      <Bar dataKey="value" radius={[2, 2, 0, 0]}>
                        {cat.chartData.map((_entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? "#8FAB33" : "#ABC656"}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {isSavingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md transform rounded-[20px] bg-white p-6 shadow-xl transition-all">
            <button
              onClick={handleCloseSavingModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="mb-6 text-xl font-bold font-inter text-categoryTextMain">
              Create New Saving
            </h3>

            <form onSubmit={handleCreateSaving} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="title"
                  className="text-sm font-medium font-inter text-categoryTextSecondary"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={savingFormData.title}
                  onChange={handleSavingInputChange}
                  placeholder="e.g. Dream House"
                  required
                  className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-inter"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium font-inter text-categoryTextSecondary"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={savingFormData.amount}
                  onChange={handleSavingInputChange}
                  placeholder="e.g. $1000"
                  required
                  className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-inter"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-sm font-medium font-inter text-categoryTextSecondary"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={savingFormData.date}
                  onChange={handleSavingInputChange}
                  required
                  className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-inter"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-[10px] bg-buttonBg py-3 text-sm font-bold text-textWhite hover:bg-black/90 transition-all shadow-md font-inter"
              >
                Create Saving
              </button>
            </form>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md transform rounded-[20px] bg-white p-6 shadow-xl transition-all">
            <button
              onClick={handleCloseModal}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <FiX className="text-xl" />
            </button>

            <h3 className="mb-6 text-xl font-bold font-inter text-categoryTextMain">
              Create New Category
            </h3>

            <form
              onSubmit={handleCreateCategory}
              className="flex flex-col gap-4"
            >
              <div className="flex p-1 bg-gray-100 rounded-lg">
                <button
                  type="button"
                  onClick={() => handleTypeChange("income")}
                  className={`flex-1 py-2 rounded-md text-[14px] font-medium transition-all ${
                    formData.type === "income"
                      ? "bg-white text-green-600 shadow-sm"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange("expense")}
                  className={`flex-1 py-2 rounded-md text-[14px] font-medium transition-all ${
                    formData.type === "expense"
                      ? "bg-white text-red-600 shadow-sm"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  Expense
                </button>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="categoryName"
                  className="text-sm font-medium font-inter text-categoryTextSecondary"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  placeholder="e.g. Food & Dining"
                  required
                  className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-inter"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-medium font-inter text-categoryTextSecondary"
                >
                  Amount
                </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="e.g. $500"
                  required
                  className="rounded-[10px] border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary font-inter"
                />
              </div>

              <button
                type="submit"
                className="mt-4 rounded-[10px] bg-buttonBg py-3 text-sm font-bold text-textWhite hover:bg-black/90 transition-all shadow-md font-inter"
              >
                Create Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCategories;
