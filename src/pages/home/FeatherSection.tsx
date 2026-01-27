import React from "react";

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
    <section className="font-manrope bg-black w-full py-20 flex flex-col items-center">
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: "1400px",
        }}
      >
        <div className="mb-16">
          <span className="text-primary text-[16px] font-medium">
            • Features
          </span>
        </div>

        <div
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{
            maxWidth: "1000px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-cardBg rounded-[30px] p-8 flex flex-col items-start text-left hover:bg-[#111111] transition-colors"
            >
              <div className="w-12 h-12 bg-buttonBg rounded-xl mb-6"></div>

              <h3 className="text-textWhite font-medium text-[20px] mb-3 font-manrope ">
                {feature.title}
              </h3>

              <p className="text-textWhite font-regular text-[15px] leading-relaxed opacity-70 ">
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
