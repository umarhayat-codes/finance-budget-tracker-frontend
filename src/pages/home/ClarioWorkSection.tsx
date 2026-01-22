import React from "react";
import FONTS from "../../constants/font";
import COLORS from "../../constants/color";

import debitCardImg from "../../assets/debit_card_image.png";
import balanceCardImg from "../../assets/balance_card_image.png";
import dailyLimitImg from "../../assets/daily_limit_card.png";

const ClarioWorkSection: React.FC = () => {
  const cards = [
    {
      step: "Step 1",
      title: "Connect your accounts",
      description:
        "Sync all your bank accounts, credit cards, and wallets — securely and instantly.",
      image: debitCardImg,
    },
    {
      step: "Step 2",
      title: "Track your money",
      description:
        "See where your money goes with real-time spending insights and clear breakdowns.",
      image: balanceCardImg,
    },
    {
      step: "Step 3",
      title: "Set goals & stay on track",
      description:
        "Plan your savings, set monthly budgets, and let Clario keep you in control.",
      image: dailyLimitImg,
    },
  ];

  return (
    <section
      className="w-full py-20 px-6 md:px-12 flex flex-col items-center"
      style={{ backgroundColor: COLORS.black, fontFamily: FONTS.family }}
    >
      <div className="max-w-[1240px] w-full">
        {/* Watch Video Link */}
        <div className="pt-[90px] mb-4 flex justify-center md:justify-start">
          <a
            href="#watch-video"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            style={{
              color: COLORS.primary,
              fontSize: "16px",
              fontWeight: FONTS.weight.medium,
            }}
          >
            Watch video
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
            </svg>
          </a>
        </div>

        {/* Section Heading */}
        <h2
          className="text-[32px] md:text-[48px] text-center md:text-left leading-tight mb-12"
          style={{ color: COLORS.textWhite, fontWeight: FONTS.weight.medium }}
        >
          How Clario works
        </h2>

        {/* Cards Grid */}
        <div className="flex flex-wrap md:flex-nowrap gap-[20px] pt-[40px] justify-center md:justify-start">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group flex flex-col p-[10px] rounded-[30px] transition-transform hover:scale-[1.02] w-full max-w-[320px] h-[513.19px]"
              style={{ backgroundColor: "#0D0D0D" }} // Slightly lighter than black to distinguish cards
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[300/250] overflow-hidden rounded-[20px] bg-black flex items-center justify-center p-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Card Content */}
              <div className="flex flex-col mt-6">
                {/* Step Button */}
                <div className="flex">
                  <span
                    className="px-4 py-1.5 rounded-full flex items-center gap-2"
                    style={{
                      backgroundColor: COLORS.buttonBg,
                      color: COLORS.primary,
                      fontSize: "16px",
                      fontWeight: FONTS.weight.medium,
                      boxShadow: `0 0 10px ${COLORS.shadow}`,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: COLORS.primary }}
                    ></span>
                    {card.step}
                  </span>
                </div>

                {/* Heading */}
                <h3
                  className="text-[20px] md:text-[24px] pt-[10px]"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.medium,
                  }}
                >
                  {card.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[14px] md:text-[16px] pt-[10px] opacity-70"
                  style={{
                    color: COLORS.textWhite,
                    fontWeight: FONTS.weight.regular,
                  }}
                >
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClarioWorkSection;
