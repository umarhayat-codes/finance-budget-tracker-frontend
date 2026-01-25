import React from "react";
import Layout from "../../../components/Layout";
import DashboardHeader from "../../../components/DashboardHeader";
import { useGoalHook } from "./useGoalHook";
import tipsImage from "../../../assets/tips_goal_setting.png";
import { CreateGoalFormData } from "../../../../types";

const CreateGoal = () => {
  const { goalForm, handleGoalChange, handleCreateGoal, handleCancelGoal } =
    useGoalHook();

  return (
    <Layout>
      <div className="w-full h-full bg-[#FEFEFE]">
        <DashboardHeader />

        <div className="px-8 py-6 w-full max-w-[1200px] mx-auto flex gap-10">
          {/* Left Section Form */}
          <div className="flex-1">
            <h1 className="text-[20px] font-bold text-[#4C4C4B] font-inter mb-6">
              Create New Financial Goal
            </h1>

            <div className="space-y-4 mb-8">
              {/* Goal Name */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Goal Name"
                  value={goalForm.goalName}
                  onChange={(e) => handleGoalChange("goalName", e.target.value)}
                  className="w-full h-[50px] border border-[#8D8D8D] rounded-[5px] px-4 text-[#757474] font-bold text-[16px] font-inter outline-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8D8D8D]">
                  {/* Icon placeholder if needed, user didn't specify icon but image shows one. I'll stick to text styles for now */}
                </span>
              </div>
              {/* Target Amount */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Target Amount"
                  value={goalForm.targetAmount}
                  onChange={(e) =>
                    handleGoalChange("targetAmount", e.target.value)
                  }
                  className="w-full h-[50px] border border-[#8D8D8D] rounded-[5px] px-4 text-[#757474] font-bold text-[16px] font-inter outline-none"
                />
              </div>
              {/* Target Date */}
              <div className="relative">
                <input
                  type="date"
                  placeholder="Target Date" // Type date handles placeholder differently usually, but styling as requested
                  value={goalForm.targetDate}
                  onChange={(e) =>
                    handleGoalChange("targetDate", e.target.value)
                  }
                  className="w-full h-[50px] border border-[#8D8D8D] rounded-[5px] px-4 text-[#757474] font-bold text-[16px] font-inter outline-none"
                />
              </div>
            </div>

            {/* Goal Type Section */}
            <div className="mb-8">
              <h2 className="text-[#000000] text-[16px] font-bold font-inter mb-2">
                Goal Type
              </h2>
              {/* Line as requested: width 940px implies it might overflow or be very wide, I will set max-width to full or requested 940px if space permits, but container is flex-1. I will use w-full border-b-2. User asked for specific pixel width 940px, but that might be larger than the container. I'll apply it but maybe max-w-full. */}
              <div className="w-full max-w-[940px] border-b-2 border-[#8D8D8D] mb-4"></div>

              <div className="w-full">
                <div className="flex justify-between px-4 mb-2">
                  <span className="text-[#737272] text-[16px] font-bold font-inter">
                    Goal Type
                  </span>
                  <span className="text-[#737272] text-[16px] font-bold font-inter">
                    Status
                  </span>
                  <span className="text-[#737272] text-[16px] font-bold font-inter">
                    Amount
                  </span>
                </div>
                {/* Row */}
                <div className="w-full bg-[#F0F0F0] h-[50px] flex items-center justify-between px-4 rounded-[5px]">
                  <div
                    onClick={() => handleGoalChange("goalType", "Savings")}
                    className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded ${
                      goalForm.goalType === "Savings"
                        ? "bg-white shadow-sm"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        goalForm.goalType === "Savings"
                          ? "text-black"
                          : "text-[#ABAAAA]"
                      } text-[13px] font-bold font-inter`}
                    >
                      Savings
                    </span>
                  </div>
                  <div
                    onClick={() => handleGoalChange("goalType", "Debt Payoff")}
                    className={`flex items-center gap-2 cursor-pointer px-3 py-1 rounded ${
                      goalForm.goalType === "Debt Payoff"
                        ? "bg-white shadow-sm"
                        : ""
                    }`}
                  >
                    <span
                      className={`${
                        goalForm.goalType === "Debt Payoff"
                          ? "text-black"
                          : "text-[#ABAAAA]"
                      } text-[13px] font-bold font-inter`}
                    >
                      Debt Payoff
                    </span>
                  </div>
                  <span className="text-[#ABAAAA] text-[13px] font-bold font-inter">
                    10M
                  </span>
                </div>
              </div>
            </div>

            {/* Funding Source */}
            <div className="mb-8">
              <h2 className="text-[#000000] text-[15px] font-bold font-inter mb-4">
                Funding Source
              </h2>
              <div className="w-full h-[50px] border border-[#C4C4C4] rounded-[5px] flex items-center px-4 gap-8">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="funding"
                    value="Current Savings"
                    checked={goalForm.fundingSource === "Current Savings"}
                    onChange={(e) =>
                      handleGoalChange(
                        "fundingSource",
                        e.target.value as CreateGoalFormData["fundingSource"],
                      )
                    }
                    className="accent-black"
                  />
                  <span className="text-[#000000] text-[13px] font-bold font-inter">
                    Current Savings
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="funding"
                    value="New Account"
                    checked={goalForm.fundingSource === "New Account"}
                    onChange={(e) =>
                      handleGoalChange(
                        "fundingSource",
                        e.target.value as CreateGoalFormData["fundingSource"],
                      )
                    }
                    className="accent-black"
                  />
                  <span className="text-[#000000] text-[13px] font-bold font-inter">
                    New Account
                  </span>
                </label>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateGoal}
                className="w-[124px] h-[40px] bg-[#050505] rounded-[10px] text-[#FFFFFF] text-[13px] font-bold font-inter"
              >
                Create Goal
              </button>
              <button
                onClick={handleCancelGoal}
                className="w-[124px] h-[40px] bg-[#F0F0F0] rounded-[5px] text-[#484948] text-[13px] font-bold font-inter"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right Section Tips Card */}
          <div className="w-[300px] shrink-0">
            <img
              src={tipsImage}
              alt="Tips for goal setting"
              className="w-full rounded-[20px] object-cover"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGoal;
