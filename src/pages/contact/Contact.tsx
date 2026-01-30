import React from "react";
import { useNavigate } from "react-router-dom";

const Contact: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-black flex flex-col items-center pt-20 pb-32 px-6">
      <div className="flex items-center gap-2 mb-8">
        <span className="w-2 h-2 rounded-full bg-primary"></span>
        <span className="text-primary font-manrope text-[16px]">
          Contact us
        </span>
      </div>

      <div className="text-center mb-16 max-w-2xl">
        <h1 className="font-manrope font-medium text-[48px] text-white leading-tight mb-4">
          We’re here to help
        </h1>
        <p className="font-manrope font-normal text-[18px] text-white opacity-80">
          Got questions about Clario or your plans? Send us a message and we’ll
          reply soon.
        </p>
      </div>

      <div className="bg-formBg w-full max-w-[600px] min-h-[580.58px] rounded-[20px] p-[25px] flex flex-col gap-6 shadow-2xl transition-all hover:shadow-primary/5">
        <h2 className="font-manrope font-medium text-[24px] text-white">
          Write us a message
        </h2>

        <form className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="font-manrope font-medium text-[16px] text-white">
                Full name
              </label>
              <input
                type="text"
                placeholder="Jane"
                className="bg-inputBg rounded-[10px] p-4 text-white font-manrope font-normal text-[14px] placeholder:text-zinc-500 border-none outline-none focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-manrope font-medium text-[16px] text-white">
                Email
              </label>
              <input
                type="email"
                placeholder="jane@framer.com"
                className="bg-inputBg rounded-[10px] p-4 text-white font-manrope font-normal text-[14px] placeholder:text-zinc-500 border-none outline-none focus:ring-1 focus:ring-primary/30 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-manrope font-medium text-[16px] text-white">
              Reason for contact
            </label>
            <input
              type="text"
              placeholder="Please specify"
              className="bg-inputBg rounded-[10px] p-4 text-white font-manrope font-normal text-[14px] placeholder:text-zinc-500 border-none outline-none focus:ring-1 focus:ring-primary/30 transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-manrope font-medium text-[16px] text-white">
              How can we help you?
            </label>
            <textarea
              placeholder="Write your message here"
              rows={4}
              className="bg-inputBg rounded-[10px] p-4 text-white font-manrope font-normal text-[14px] placeholder:text-zinc-500 border-none outline-none focus:ring-1 focus:ring-primary/30 transition-all resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="privacy"
              className="w-5 h-5 rounded bg-inputBg border-none accent-primary focus:ring-offset-black cursor-pointer"
            />
            <label
              htmlFor="privacy"
              className="font-manrope font-normal text-[14px] text-zinc-400 cursor-pointer"
            >
              I agree the privacy policy.
            </label>
          </div>

          <button
            type="submit"
            onClick={() => navigate("/")}
            className="bg-primary hover:bg-primary/90 rounded-[10px] w-full py-4 text-buttonText font-manrope font-semibold text-[15px] transition-all transform active:scale-[0.98]"
          >
            Get in touch
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
