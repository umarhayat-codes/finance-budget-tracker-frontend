import React from "react";
import mainIcon from "../../assets/main_icon.png";

const WhyClarioSection: React.FC = () => {
  return (
    <section className="w-full py-20 flex flex-col items-center bg-black font-manrope">
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: "1000px",
        }}
      >
        <div className="mb-16">
          <span className="text-[16px] font-medium text-primary">
            • Why Clario?
          </span>
        </div>

        <div
          className="w-full flex flex-col lg:flex-row bg-buttonBg rounded-[40px] overflow-hidden"
          style={{ maxWidth: "900px" }}
        >
          <div className="flex-1 p-10 md:p-14 md:pr-10">
            <h3 className="text-[24px] font-medium text-textWhite mb-10">
              Other Tools
            </h3>
            <ul className="space-y-8">
              <li className="text-[16px] md:text-[18px] text-textGray font-normal">
                Messy spreadsheets, manual tracking
              </li>
              <li className="text-[16px] md:text-[18px] text-textGray font-normal">
                Complicated pricing, hidden fees
              </li>
              <li className="text-[16px] md:text-[18px] text-textGray font-normal">
                Limited automation, manual workflows
              </li>
              <li className="text-[16px] md:text-[18px] text-textGray font-normal">
                No team collaboration
              </li>
              <li className="text-[16px] md:text-[18px] text-textGray font-normal">
                Generic support, slow replies
              </li>
            </ul>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 border border-primary/20 rounded-[40px] pointer-events-none shadow-[0_0_50px_rgba(140,255,46,0.05)]"></div>

            <div className="relative h-full p-10 md:p-14 md:pl-10 bg-black/50 md:bg-transparent rounded-[40px]">
              <div className="flex items-center gap-2 mb-10">
                <img
                  src={mainIcon}
                  alt="Clario"
                  className="w-8 h-8 object-contain"
                />
                <h3 className="text-[24px] font-medium text-textWhite">
                  Clario
                </h3>
              </div>

              <ul className="space-y-8">
                <li className="text-[16px] md:text-[18px] text-clarioColor font-normal">
                  Smart dashboard, real-time updates
                </li>
                <li className="text-[16px] md:text-[18px] text-clarioColor font-normal">
                  Simple, transparent pricing
                </li>
                <li className="text-[16px] md:text-[18px] text-clarioColor font-normal">
                  Automated reports & smart alerts
                </li>
                <li className="text-[16px] md:text-[18px] text-clarioColor font-normal">
                  Team-friendly, sync accounts easily
                </li>
                <li className="text-[16px] md:text-[18px] text-clarioColor font-normal">
                  Priority support, fast response
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyClarioSection;
