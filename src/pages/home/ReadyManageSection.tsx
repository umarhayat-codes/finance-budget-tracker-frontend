import React from "react";
import freeTierImg from "../../assets/free_tier_image.png";

const ReadyManageSection: React.FC = () => {
  return (
    <section className="bg-black py-20 px-4 md:px-10">
      <div className="w-full mx-auto xlg:px-[200px] max-w-[1440px]">
        <div className="bg-cardBg rounded-[40px] overflow-hidden flex flex-col md:flex-row items-center md:justify-between px-6 py-12 md:px-12 md:py-0 border border-cardBorder relative min-h-[400px]">
          <div className="w-full md:w-3/5 z-10 flex flex-col items-center md:items-start text-center md:text-left py-10 md:py-16 lg:py-20">
            <h2 className="text-white font-manrope font-medium text-[32px] md:text-[40px] lg:text-[48px] leading-tight mb-4">
              Ready to manage <br className="hidden lg:block" />
              your money smarter?
            </h2>
            <p className="text-white font-manrope font-normal text-sm md:text-base lg:text-[16px] leading-relaxed mb-8 md:max-w-[440px] opacity-90">
              Start your journey to smarter spending and better{" "}
              <br className="hidden md:block" />
              saving — it only takes 2 minutes.
            </p>
            <button className="bg-primary text-buttonText font-manrope font-semibold text-[15px] py-[14px] px-[28px] rounded-[23px] hover:scale-105 transition-all shadow-[0_4px_20px_rgba(140,255,46,0.3)]">
              Get 14 Days Free Trial
            </button>
          </div>

          <div className="w-full md:w-[350px] lg:w-[450px] flex items-end justify-center md:justify-end mt-10 md:mt-0 md:absolute md:right-0 md:bottom-0 h-full overflow-hidden">
            <img
              src={freeTierImg}
              alt="Ready to manage"
              className="w-[240px] md:w-[280px] lg:w-[320px] h-auto object-contain translate-y-[20px] md:translate-y-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReadyManageSection;
