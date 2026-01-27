import React from "react";
import danielleVideo from "../../assets/danielle_video.png";

const HearUserSection: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-black flex flex-col items-center">
      <div className="w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20 px-6 md:px-16 lg:px-20 xl:px-[200px] max-w-[1440px]">
        <div className="w-full max-w-[500px] lg:w-1/2 relative rounded-[30px] overflow-hidden group shadow-2xl">
          <img
            src={danielleVideo}
            alt="Danielle M."
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-16 h-16 bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center p-1 border border-white/20">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black ml-1">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 text-left">
            <h4 className="text-[20px] font-manrope font-medium text-white">
              Danielle M.
            </h4>
            <p className="text-[16px] font-manrope font-normal text-white opacity-80">
              Freelance UX Designer
            </p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="text-[16px] font-manrope font-medium text-primary mb-6">
            • Hear from our users
          </span>

          <h2 className="text-[28px] md:text-[34px] font-manrope font-medium text-textWhite leading-tight">
            “With Clario, I finally stopped <br className="hidden md:block" />
            stressing about my cash flow. I know where my money is going and I’m
            actually saving.”
          </h2>
        </div>
      </div>
    </section>
  );
};

export default HearUserSection;
