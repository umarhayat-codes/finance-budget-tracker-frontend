import React from "react";
import explore_blog_man_1 from "../../assets/explore_blog_man_1.png";
import explore_blog_man_2 from "../../assets/explore_blog_man_2.png";
import explore_blog_man_3 from "../../assets/explore_blog_man_3.png";
import explore_blog_man_4 from "../../assets/explore_blog_man_4.png";

const ExploreBlogSection: React.FC = () => {
  return (
    <section className="bg-black py-20 px-4 md:px-10 lg:px-20">
      <div className="w-full mx-auto xlg:px-[200px] xlg:max-w-[1400px]">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-white font-manrope font-medium text-[32px] md:text-[40px] lg:text-[48px] leading-tight">
            Explore the blog
          </h2>
          <button className="bg-[#1A1A1A] text-white font-manrope font-medium py-3 px-6 rounded-full text-sm md:text-base hover:bg-[#2A2A2A] transition-colors">
            View all posts
          </button>
        </div>

        <div className="bg-[#0D0D0D] rounded-[40px] overflow-hidden flex flex-col lg:flex-row items-center p-[10px] mb-8 border border-cardBorder">
          <div className="w-full lg:w-[470px] h-auto lg:h-[400px] flex-shrink-0">
            <img
              src={explore_blog_man_1}
              alt="How to Launch Your SaaS"
              className="w-full h-full object-cover rounded-[30px]"
            />
          </div>
          <div className="p-6 md:p-10 flex flex-col justify-center">
            <span className="text-textGray text-xs md:text-sm font-manrope tracking-widest uppercase mb-4">
              Basics
            </span>
            <h3 className="text-white font-manrope font-medium text-[24px] md:text-[30px] lg:text-[34px] leading-tight mb-4">
              How to Launch Your SaaS
              <br className="hidden md:block" /> Product With Confidence
            </h3>
            <p className="text-white font-manrope font-normal text-sm md:text-base lg:text-[16px] leading-relaxed mb-6 opacity-80">
              Learn how to go from idea to launch — fast. We cover positioning,
              landing pages, early user feedback, and building trust using the
              Clario template for Framer.
            </p>
            <a
              href="#"
              className="text-primary font-manrope font-medium text-sm md:text-base hover:underline w-fit"
            >
              Read more
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#0D0D0D] rounded-[40px] p-[10px] border border-cardBorder flex flex-col h-full lg:w-[320px] lg:h-[482.59px] mx-auto">
            <div className="w-full h-[250px] lg:h-[290px] mb-6">
              <img
                src={explore_blog_man_2}
                alt="Designing a Landing Page"
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>
            <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-textGray text-xs font-manrope tracking-widest uppercase mb-3 block">
                  Pro Tips
                </span>
                <h4 className="text-white font-manrope font-medium text-[20px] md:text-[22px] lg:text-[24px] leading-snug mb-4">
                  Designing a Landing Page
                  <br /> That Converts
                </h4>
              </div>
              <a
                href="#"
                className="text-primary font-manrope font-medium text-sm hover:underline w-fit mt-auto"
              >
                Read more
              </a>
            </div>
          </div>

          <div className="bg-cardBg rounded-[40px] p-[10px] border border-cardBorder flex flex-col h-full lg:w-[320px] lg:h-[482.59px] mx-auto">
            <div className="w-full h-[250px] lg:h-[290px] mb-6">
              <img
                src={explore_blog_man_3}
                alt="Collecting Feedback"
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>
            <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-textGray text-xs font-manrope tracking-widest uppercase mb-3 block">
                  Updates
                </span>
                <h4 className="text-white font-manrope font-medium text-[20px] md:text-[22px] lg:text-[24px] leading-snug mb-4">
                  Collecting Feedback From
                  <br /> Your First Users
                </h4>
              </div>
              <a
                href="#"
                className="text-primary font-manrope font-medium text-sm hover:underline w-fit mt-auto"
              >
                Read more
              </a>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded-[40px] p-[10px] border border-[#1F1F1F] flex flex-col h-full lg:w-[320px] lg:h-[482.59px] mx-auto">
            <div className="w-full h-[250px] lg:h-[290px] mb-6">
              <img
                src={explore_blog_man_4}
                alt="Building Trust"
                className="w-full h-full object-cover rounded-[30px]"
              />
            </div>
            <div className="px-4 pb-4 flex flex-col justify-between flex-grow">
              <div>
                <span className="text-textGray text-xs font-manrope tracking-widest uppercase mb-3 block">
                  CMS
                </span>
                <h4 className="text-white font-manrope font-medium text-[20px] md:text-[22px] lg:text-[24px] leading-snug mb-4">
                  Building Trust as an Early-
                  <br />
                  Stage SaaS Brand
                </h4>
              </div>
              <a
                href="#"
                className="text-primary font-manrope font-medium text-sm hover:underline w-fit mt-auto"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreBlogSection;
