import React from "react";
import FONTS from "../../constants/font";
import COLORS from "../../constants/color";

import smartDashboardImg from "../../assets/smart_dashboard_image.png";
import cashflowImg from "../../assets/balance_card_image.png"; // Using balance card as placeholder for cashflow if exact match not found, or dashboard.png
import spendingImg from "../../assets/spending_breakdown_image.png";
import savingsImg from "../../assets/saving_goal_image.png";
import man1 from "../../assets/man_1.png";
import man2 from "../../assets/man_2.png";
import man3 from "../../assets/man_3.png";

const WatchCashSection: React.FC = () => {
  return (
    <section
      className="w-full py-20 flex flex-col items-center"
      style={{
        backgroundColor: COLORS.black,
        fontFamily: FONTS.family,
        paddingTop: "60px",
        paddingLeft: "20px", // Reduced for mobile, will override for desktop
        paddingRight: "20px",
      }}
    >
      <div className="w-full max-w-[1440px] md:px-[100px]">
        {/* Section Heading */}
        <div className="mb-16">
          <h2
            className="text-[32px] md:text-[48px] leading-tight mb-4"
            style={{ color: COLORS.textWhite, fontWeight: FONTS.weight.medium }}
          >
            See your money in real time, clearly
          </h2>
          <p
            className="text-[16px] md:text-[18px] opacity-80 max-w-[600px]"
            style={{
              color: COLORS.textWhite,
              fontWeight: FONTS.weight.regular,
            }}
          >
            Clario shows your income, spending, and savings in one place, so you
            always know where you stand.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {/* Top Row - spanning 3 columns conceptually, but we can do 2 large cards */}
          {/* Actually grid-cols-3 might make the top row tricky if they are 50/50. 
              Let's use a nested flex or specific col-spans. 
              Top row: 2 cards. Bottom row: 3 cards (or 2 cards + 1 column of stacked cards).
              Let's make it a 6 column grid for flexibility? Or simply use Flexbox for rows.
          */}

          {/* Row 1 Wrapper */}
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-[15px]">
            {/* Smart Dashboard */}
            <div className="bg-[#0D0D0D] rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
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
                <h3
                  className="text-[24px]"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.medium,
                  }}
                >
                  Smart Dashboard
                </h3>
                <p
                  className="text-[16px] mt-2 opacity-70"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.regular,
                  }}
                >
                  See all your accounts in one view — balances, spending, and
                  goals.
                </p>
              </div>
            </div>

            {/* Cashflow Overview */}
            <div className="bg-[#0D0D0D] rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
              <div
                className="w-full flex justify-center items-center bg-black rounded-[20px] overflow-hidden"
                style={{ height: "250px" }}
              >
                {/* Using dashboard.png or similar if balance_card isn't perfect, but let's try cashflowImg */}
                <img
                  src={cashflowImg}
                  alt="Cashflow Overview"
                  className="h-full object-contain"
                />
              </div>
              <div className="mt-4 px-2 pb-4">
                <h3
                  className="text-[24px]"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.medium,
                  }}
                >
                  Cashflow Overview
                </h3>
                <p
                  className="text-[16px] mt-2 opacity-70"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.regular,
                  }}
                >
                  Track your daily income and expenses to understand your
                  financial flow.
                </p>
              </div>
            </div>
          </div>

          {/* Row 2 - 3 Columns */}
          {/* Spending Breakdown */}
          <div className="bg-[#0D0D0D] rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
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
              <h3
                className="text-[24px]"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.medium,
                }}
              >
                Spending Breakdown
              </h3>
              <p
                className="text-[16px] mt-2 opacity-70"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.regular,
                }}
              >
                See exactly how your money is split across categories.
              </p>
            </div>
          </div>

          {/* Savings Goal */}
          <div className="bg-[#0D0D0D] rounded-[30px] p-[10px] pt-[20px] flex flex-col h-full">
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
              <h3
                className="text-[24px]"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.medium,
                }}
              >
                Savings Goal
              </h3>
              <p
                className="text-[16px] mt-2 opacity-70"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.regular,
                }}
              >
                Stay focused on your savings targets and follow your progress.
              </p>
            </div>
          </div>

          {/* Stacked Cards Column */}
          <div className="flex flex-col md:flex-row lg:flex-col gap-[15px] h-full md:col-span-2 lg:col-span-1">
            {/* Trusted By */}
            <div className="bg-[#0D0D0D] rounded-[30px] p-[20px] flex flex-col justify-center flex-1 min-h-[180px]">
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
              <h3
                className="text-[24px]"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.medium,
                }}
              >
                Trusted by 3k+ <br /> Freelancers
              </h3>
            </div>

            {/* Saved */}
            <div className="bg-[#0D0D0D] rounded-[30px] p-[20px] flex flex-col justify-center flex-1 min-h-[180px]">
              <h3
                className="text-[40px] md:text-[48px] mb-2"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.medium,
                }}
              >
                $1.2M+ Saved
              </h3>
              <p
                className="text-[16px] opacity-70 mb-4"
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.regular,
                }}
              >
                Clario helps users save more — and spend smarter.
              </p>
              <div className="text-[#8CFF2E] font-medium cursor-pointer hover:underline">
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
