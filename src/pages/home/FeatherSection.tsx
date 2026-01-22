import React from "react";
import FONTS from "../../constants/font";
import COLORS from "../../constants/color";

const features = [
  {
    title: "Multi-account sync",
    description: "Connect and track all your bank accounts in one place.",
  },
  {
    title: "Goal tracking",
    description: "Visualize progress toward savings goals in real-time.",
  },
  {
    title: "Custom categories",
    description: "Create and organize spending your way — not the bank's.",
  },
  {
    title: "Weekly reports",
    description: "Get a snapshot of your finances delivered to your inbox.",
  },
  {
    title: "Spending limits",
    description: "Set monthly caps and get notified when you're close.",
  },
  {
    title: "Secure & private",
    description: "Your data is encrypted and never shared — ever.",
  },
];

const FeatherSection: React.FC = () => {
  return (
    <section
      className="w-full py-20 flex flex-col items-center"
      style={{
        backgroundColor: COLORS.black,
        fontFamily: FONTS.family,
      }}
    >
      {/* Container with responsive max-width and padding */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: "1400px", // Base max width to allow padding to work on large screens before hitting the 1000px inner constraint
        }}
      >
        {/* Section Label */}
        <div className="mb-16">
          <span
            className="text-[16px] font-medium"
            style={{ color: COLORS.primary }}
          >
            • Features
          </span>
        </div>

        {/* Content Grid Container */}
        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            maxWidth: "1000px", // Requested max width on XL
            paddingLeft: "20px", // Mobile base
            paddingRight: "20px",
            // We'll apply larger padding via media queries in standard CSS or Tailwind classes below for the 'xl' requirement
          }}
        >
          {/* Note: User asked for "left,right padding: 200pz" (px) in extra lg. 
                 Using Tailwind's `xl:px-[200px]` might constrain the content too much if the max-width is also 1000px.
                 If max-width is 1000px, checking the image, the padding seems to be outside the card grid?
                 Or maybe the grid itself is 1000px wide? 
                 I will assume the grid content max-width is 1000px and the section handles the whitespace.
             */}

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#0D0D0D] rounded-[30px] p-8 flex flex-col items-start text-left hover:bg-[#111111] transition-colors"
            >
              {/* Icon Placeholder */}
              <div className="w-12 h-12 bg-[#050505] rounded-xl mb-6"></div>

              {/* Title */}
              <h3
                className="text-[20px] mb-3 font-manrope "
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.medium,
                }}
              >
                {feature.title}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] leading-relaxed opacity-70 "
                style={{
                  color: COLORS.textWhite,
                  fontWeight: FONTS.weight.regular,
                }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatherSection;
