import React from "react";
import mainIcon from "../assets/main_icon.png";

const Footer: React.FC = () => {
  const quickMenu = [
    "How it works",
    "Features",
    "Testimonials",
    "Pricing",
    "Waitlist",
  ];
  const information = [
    "Contact",
    "Privacy Policy",
    "Terms",
    "Blog",
    "Remix Template",
  ];

  return (
    <footer className="bg-cardBg py-16 px-6 md:px-12 lg:px-20 border-t border-cardBorder">
      <div className="max-w-[1440px] mx-auto xlg:px-[80px] flex flex-col md:flex-row justify-between gap-12 md:gap-8">
        <div className="flex flex-col max-w-[320px]">
          <div className="flex items-center gap-2 mb-6">
            <img
              src={mainIcon}
              alt="Clario Logo"
              className="w-[32px] h-[32px]"
            />
            <span className="text-white font-manrope font-semibold text-[20px]">
              Clario
            </span>
          </div>
          <p className="text-white font-manrope font-normal text-[14px] leading-relaxed mb-10 opacity-80">
            Your all-in-one money management tool. Track your income, set goals,
            and stay on top of your finances — effortlessly.
          </p>
          <p className="text-white font-manrope font-normal text-[16px] hidden md:block">
            Designed by{" "}
            <span className="text-primary font-medium">Kadirov</span> ©2025
          </p>
        </div>

        <div className="flex gap-16 md:gap-24 lg:gap-32">
          <div>
            <h4 className="text-white font-manrope font-medium text-[16px] mb-6">
              Quick Menu
            </h4>
            <ul className="flex flex-col gap-4">
              {quickMenu.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white font-manrope font-normal text-[14px] opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-manrope font-medium text-[16px] mb-6">
              Information
            </h4>
            <ul className="flex flex-col gap-4">
              {information.map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                    className="text-white font-manrope font-normal text-[14px] opacity-60 hover:opacity-100 transition-opacity"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="text-white font-manrope font-normal text-[16px] md:hidden mt-8 text-center border-t border-cardBorder pt-8 opacity-60">
          Designed by <span className="text-primary font-medium">Kadirov</span>{" "}
          ©2025
        </p>
      </div>
    </footer>
  );
};

export default Footer;
