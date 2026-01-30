import React from "react";

import smartDashboardImg from "../../assets/smart_dashboard_image.png";
import cashflowImg from "../../assets/balance_card_image.png";
import spendingImg from "../../assets/spending_breakdown_image.png";
import savingsImg from "../../assets/saving_goal_image.png";
import man1 from "../../assets/man_1.png";
import man2 from "../../assets/man_2.png";
import man3 from "../../assets/man_3.png";

const WatchCashSection: React.FC = () => {
  return (
    <section className="font-manrope pt-[60px] px-[20px] bg-black  w-full py-20 flex flex-col items-center">
      <div className="w-full max-w-[1240px] md:px-[100px]">
        <div className="mb-16">
          <h2 className="text-textWhite font-medium text-[32px] md:text-[48px] leading-tight mb-4">
            See your money in real time, clearly
          </h2>
          <p className="text-textWhite font-regular text-[16px] md:text-[18px] opacity-80 max-w-[600px]">
            Clario shows your income, spending, and savings in one place, so you
            always know where you stand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-[15px]">
            <div className="bg-cardBg rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
              <div
                className="w-full flex justify-center items-center bg-black rounded-[20px] overflow-hidden"
                style={{ height: "250px" }}
              >
                <img
                  src={smartDashboardImg}
                  alt="Smart Dashboard"
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-4 px-2 pb-4">
                <h3 className="text-textWhite font-medium text-[24px]">
                  Smart Dashboard
                </h3>
                <p className="text-textWhite font-regular text-[16px] mt-2 opacity-70">
                  See all your accounts in one view — balances, spending, and
                  goals.
                </p>
              </div>
            </div>

            <div className="bg-cardBg rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
              <div
                className="w-full flex justify-center items-center bg-black rounded-[20px] overflow-hidden"
                style={{ height: "250px" }}
              >
                <img
                  src={cashflowImg}
                  alt="Cashflow Overview"
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-4 px-2 pb-4">
                <h3 className="text-textWhite font-medium text-[24px]">
                  Cashflow Overview
                </h3>
                <p className="text-textWhite font-regular text-[16px] mt-2 opacity-70">
                  Track your daily income and expenses to understand your
                  financial flow.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-cardBg rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
            <div
              className="w-full flex justify-center items-center bg-black rounded-[20px] overflow-hidden"
              style={{ height: "250px" }}
            >
              <img
                src={spendingImg}
                alt="Spending Breakdown"
                className="h-full object-contain"
              />
            </div>
            <div className="mt-4 px-2 pb-4">
              <h3 className="text-textWhite font-medium text-[24px]">
                Spending Breakdown
              </h3>
              <p className="text-textWhite font-regular text-[16px] mt-2 opacity-70">
                See exactly how your money is split across categories.
              </p>
            </div>
          </div>

          <div className="bg-cardBg rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
            <div
              className="w-full flex justify-center items-center bg-black rounded-[20px] overflow-hidden"
              style={{ height: "250px" }}
            >
              <img
                src={savingsImg}
                alt="Savings Goal"
                className="h-full object-contain"
              />
            </div>
            <div className="mt-4 px-2 pb-4">
              <h3 className="text-textWhite font-medium text-[24px]">
                Savings Goal
              </h3>
              <p className="text-textWhite font-regular text-[16px] mt-2 opacity-70">
                Stay focused on your savings targets and follow your progress.
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-col gap-[15px] h-full md:col-span-2 lg:col-span-1">
            <div className="bg-cardBg rounded-[30px] p-[20px] flex flex-col justify-center flex-1 min-h-[180px]">
              <div className="flex -space-x-4 mb-4">
                <img
                  src={man1}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
                <img
                  src={man2}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
                <img
                  src={man3}
                  alt="User"
                  className="w-12 h-12 rounded-full border-2 border-black"
                />
              </div>
              <h3 className="text-textWhite font-medium text-[24px]">
                Trusted by 3k+ <br /> Freelancers
              </h3>
            </div>

            <div className="bg-cardBg rounded-[30px] p-[20px] flex flex-col justify-center flex-1 min-h-[180px]">
              <h3 className="text-textWhite font-medium text-[30px]  mb-2">
                $1.2M+ Saved
              </h3>
              <p className="text-textWhite font-regular text-[16px] opacity-70 mb-2">
                Clario helps users save more — and spend smarter.
              </p>
              <div className="text-primary font-medium cursor-pointer hover:underline">
                Get Started
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchCashSection;
