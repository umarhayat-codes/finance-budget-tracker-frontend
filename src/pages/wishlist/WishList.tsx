import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const WishList: React.FC = () => {
  return (
    <>
      <Header />
      <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center text-center max-w-[800px] w-full">
          <h1 className="font-manrope font-medium text-[64px] leading-tight text-white mb-6">
            We’re getting
            <br />
            ready to launch
          </h1>

          <p className="font-manrope font-normal text-[18px] text-white max-w-[500px] mb-12">
            Join our waitlist to get early access to Clario’s next-gen features,
            exclusive updates.
          </p>

          <div className="w-full max-w-[500px] bg-wishlistCardBg rounded-[20px] p-6 flex flex-col gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="w-full bg-wishlistInputBg rounded-[10px] p-4 text-white font-manrope font-normal text-[14px] outline-none placeholder:text-textGray"
            />
            <button className="w-full bg-wishlistButtonBg rounded-[10px] py-4 text-buttonText font-manrope font-semibold text-[15px] hover:opacity-90 transition-opacity">
              Join Now
            </button>
          </div>

          <p className="font-manrope font-normal text-[14px] text-white mt-8 opacity-60">
            Limited spots available before public release.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WishList;
