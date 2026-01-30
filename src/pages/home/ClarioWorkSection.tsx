import React from "react";
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
    <section className="w-full py-10 px-6 md:px-12 flex flex-col items-center font-manrope bg-black">
      <div className="max-w-[1040px] w-full">
        <div className="pt-[90px] mb-4 flex justify-start ">
          <a
            href="#watch-video"
            className="text-[16px] font-medium font-manrope text-primary flex  gap-2 transition-opacity hover:opacity-80"
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

        <h2 className="font-manrope font-medium text-textWhite text-[32px] md:text-[48px]   leading-tight mb-12">
          How Clario works
        </h2>
        <div className="flex flex-wrap gap-[20px] pt-[40px] justify-center mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-cardBg flex flex-col p-[10px] rounded-[30px] transition-transform hover:scale-[1.02] w-full max-w-[320px] "
            >
              <div className="relative w-full aspect-[300/250] overflow-hidden rounded-[20px] bg-black flex items-center justify-center p-4">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="flex flex-col mt-6">
                <div className="flex">
                  <span
                    className="text-[16px] bg-buttonBg text-primary font-medium font-manrope px-4 py-1.5 rounded-full flex items-center gap-2"
                    style={{
                      boxShadow: `0 0 10px #8CFF2F03`,
                    }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                    {card.step}
                  </span>
                </div>

                <h3 className="text-textWhite font-medium text-[20px] md:text-[24px] pt-[10px]">
                  {card.title}
                </h3>

                <p className="text-textWhite font-regular text-[14px] md:text-[16px] pt-[10px] opacity-70">
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
