import React, { useState } from "react";
import {
  FaGoogle,
  FaPaypal,
  FaSlack,
  FaApple,
  FaStripeS,
} from "react-icons/fa";
import {
  SiRevolut,
  SiVercel,
  SiShopify,
  SiZapier,
  SiQuickbooks,
  SiWise,
} from "react-icons/si";

import { IconProps } from "types";

// Helper to resolve React 19 / react-icons type mismatch
const Icon = ({ icon: IconComponent, size }: IconProps) => (
  <IconComponent size={size} />
);

const PricePlan: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  return (
    <section className="bg-black text-white py-20 px-6 md:px-12 xlg:px-[200px] font-manrope flex flex-col items-center">
      {/* Pricing Badge */}
      <div className="flex items-center gap-2 mb-12">
        <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_#8CFF2E]"></span>
        <span className="text-primary text-sm font-medium">Pricing</span>
      </div>

      {/* Toggle */}
      <div className="flex items-center gap-4 mb-16">
        <span
          className={`${
            isMonthly ? "text-primary" : "text-textGray"
          } text-base font-medium transition-colors`}
        >
          Monthly
        </span>
        <button
          onClick={() => setIsMonthly(!isMonthly)}
          className="w-14 h-8 bg-cardBg border border-cardBorder rounded-full relative flex items-center px-1 transition-all"
        >
          <div
            className={`w-6 h-6 rounded-full bg-primary transition-transform duration-300 transform ${
              isMonthly ? "translate-x-0" : "translate-x-6"
            }`}
          />
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl mb-8">
        {/* Starter Card */}
        <div className="bg-cardBg border border-cardBorder rounded-[40px] p-8 md:p-12 flex flex-col h-full">
          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Starter</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl md:text-6xl font-bold">$29</span>
            <span className="text-textGray text-lg">/month</span>
          </div>
          <p className="text-white text-base font-normal mb-10 leading-relaxed whitespace-pre-line">
            Perfect for freelancers who want {"\n"}
            full control over their personal {"\n"}
            finances.
          </p>

          <button className="w-full py-4 rounded-full bg-buttonBg text-white font-semibold mb-12 hover:bg-zinc-900 transition-colors">
            Get Starter
          </button>

          <ul className="space-y-4 mt-auto">
            <li className="text-textGray text-base">Track income & expenses</li>
            <li className="text-textGray text-base">
              Connect up to 2 accounts
            </li>
            <li className="text-textGray text-base">Monthly reports</li>
            <li className="text-textGray text-base">Smart alerts</li>
          </ul>
        </div>

        {/* Pro Card */}
        <div className="bg-cardBg border border-cardBorder rounded-[40px] p-8 md:p-12 flex flex-col h-full relative overflow-hidden">
          <div className="absolute top-6 right-6">
            <span className="bg-[#142308] text-primary text-[10px] font-bold tracking-widest px-3 py-1 rounded-full uppercase">
              Popular
            </span>
          </div>

          <h3 className="text-2xl md:text-3xl font-semibold mb-6">Pro</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl md:text-6xl font-bold">$49</span>
            <span className="text-textGray text-lg">/month</span>
          </div>
          <p className="text-white text-base font-normal mb-10 leading-relaxed whitespace-pre-line">
            Advanced tools to manage your {"\n"}
            money smarter and unlock {"\n"}
            powerful insights.
          </p>

          <div className="relative mb-12 group">
            <div className="absolute inset-0 bg-primary opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
            <button className="relative w-full py-4 rounded-full bg-primary text-black font-semibold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(140,255,46,0.3)]">
              Get Pro
            </button>
          </div>

          <ul className="space-y-4 mt-auto">
            <li className="text-white text-base font-medium">
              Unlimited accounts
            </li>
            <li className="text-white text-base font-medium">
              AI spending insights
            </li>
            <li className="text-white text-base font-medium">Custom alerts</li>
            <li className="text-white text-base font-medium">
              Advanced reporting
            </li>
          </ul>
        </div>
      </div>

      {/* Partners Banner */}
      <div className="w-full max-w-6xl bg-cardBg border border-cardBorder rounded-[40px] p-8 md:p-12 flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-16">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Trusted by teams worldwide
          </h2>
          <p className="text-white text-base font-normal mb-8 whitespace-pre-line">
            Invite your team, sync accounts in {"\n"}
            real time, and track shared goals {"\n"}
            with ease.
          </p>
          <button className="text-primary font-semibold hover:underline decoration-2 underline-offset-4 bg-transparent border-none p-0 cursor-pointer">
            Talk to Sales
          </button>
        </div>

        {/* Logo Cloud */}
        <div className="flex-1 grid grid-cols-4 md:grid-cols-6 gap-y-10 gap-x-8 items-center opacity-40">
          <Icon icon={FaGoogle} size={24} />
          <Icon icon={SiWise} size={24} />
          <Icon icon={FaPaypal} size={24} />
          <Icon icon={SiRevolut} size={24} />
          <Icon icon={FaSlack} size={24} />
          <Icon icon={SiVercel} size={24} />
          <Icon icon={FaStripeS} size={20} />
          <Icon icon={SiShopify} size={24} />
          <Icon icon={FaApple} size={24} />
          <Icon icon={SiZapier} size={24} />
          <div className="text-xl font-bold text-white">F</div> {/* Logo F */}
          <Icon icon={SiQuickbooks} size={24} />
        </div>
      </div>
    </section>
  );
};

export default PricePlan;
