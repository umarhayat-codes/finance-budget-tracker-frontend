import React from "react";
import { useNavigate } from "react-router-dom";
import dashboardImg from "../../assets/dashboard.png";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center text-center pt-[60px] px-6">
      <div className="flex justify-center mb-8">
        <span className="hero-badge px-4 py-1.5 rounded-full font-medium text-[16px] border border-[#8CFF2E]/20 shadow-[0_0_15px_rgba(140,255,46,0.1)]">
          All-in-One Finance Toolkit
        </span>
      </div>

      <div className="max-w-[1000px] mx-auto space-y-6">
        <h1 className="hero-heading text-[40px] md:text-[64px] font-medium leading-[1.1] tracking-tight">
          Smart way to <br className="hidden md:block" /> manage your finance
        </h1>

        <p className="hero-subheading text-[16px] md:text-[18px] font-normal opacity-80 max-w-[800px] mx-auto">
          Take control of your financial future with Clario. Effortlessly track
          your budgets, manage expenses, and gain insights to grow your
          wealth—all in one place.
        </p>
      </div>

      <div className="mt-[20px]">
        <button
          onClick={() => navigate("/auth/signin")}
          className="btn-hero-cta px-[32px] py-[14px] rounded-[23px] font-semibold text-[15px] transition-all hover:bg-[#7be625] shadow-[0_0_30px_rgba(140,255,46,0.2)]"
        >
          Get Started for Free
        </button>
      </div>

      <div className="mt-[50px] w-full max-w-[1000px] flex justify-center pb-20 overflow-hidden">
        <div className="relative w-full aspect-[1000/600] group">
          <div className="absolute -inset-1 bg-gradient-to-t from-[#8CFF2E]/10 to-transparent blur-2xl opacity-50 transition duration-1000 group-hover:opacity-75"></div>

          <img
            src={dashboardImg}
            alt="Clario Dashboard Preview"
            className="relative w-full h-full object-contain rounded-xl border border-white/5 shadow-2xl transition-transform duration-700 hover:scale-[1.01]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
