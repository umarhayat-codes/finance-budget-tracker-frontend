import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";

import { IconProps, FAQItem } from "types";

const Icon = ({ icon: IconComponent, size }: IconProps) => (
  <IconComponent size={size} />
);

const faqs: FAQItem[] = [
  {
    id: "01",
    question: "What kind of businesses is this template built for?",
    answer:
      "Clario is designed for SaaS tools, dashboards, fintech platforms, or any digital product that needs a modern, conversion-focused landing page. It’s fully customizable to fit a wide range of web-based services.",
  },
  {
    id: "02",
    question: "Is the template mobile-friendly and responsive?",
    answer:
      "Yes, Clario is built with a mobile-first approach, ensuring a seamless experience across all devices and screen sizes.",
  },
  {
    id: "03",
    question: "Can I use this template without coding skills?",
    answer:
      "Absolutely! The template is structured to be easily customizable even if you have minimal coding knowledge.",
  },
  {
    id: "04",
    question: "Will I get access to future updates?",
    answer:
      "Yes, all purchasers receive lifetime access to future updates and improvements for this template.",
  },
  {
    id: "05",
    question: "Can I use this template for commercial projects?",
    answer:
      "Yes, the license allows you to use Clario for both personal and commercial projects.",
  },
  {
    id: "06",
    question: "How can I get support if I run into issues?",
    answer:
      "We provide dedicated support via email and documentation to help you with any technical hurdles.",
  },
];

const QuestionAnswerSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("01");

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-black text-white py-24 px-6 md:px-12 xlg:px-[200px] font-manrope">
      <div className="max-w-[1000px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-[40px] md:text-[48px] font-medium leading-tight mb-4">
              Got questions? <br />
              We’ve got answers.
            </h2>
            <p className="text-white text-[18px] font-normal leading-relaxed opacity-80">
              Here’s everything you need to know{" "}
              <br className="hidden md:block" />
              before getting started.
            </p>
          </div>
          <div className="text-primary text-sm font-medium tracking-wide">
            Contact us
          </div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-cardBg border border-cardBorder rounded-[20px] overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg border border-primary/30 text-primary text-[16px] font-medium shadow-[0_0_10px_rgba(140,255,46,0.1)]">
                      {faq.id}
                    </div>
                    <span className="text-[18px] md:text-[20px] font-semibold leading-tight">
                      {faq.question}
                    </span>
                  </div>
                  <div className="text-white opacity-40">
                    {isOpen ? (
                      <Icon icon={FiMinus} size={24} />
                    ) : (
                      <Icon icon={FiPlus} size={24} />
                    )}
                  </div>
                </button>

                <div
                  className={`px-8 md:px-24 transition-all duration-300 ease-in-out ${
                    isOpen
                      ? "max-h-96 pb-8 opacity-100"
                      : "max-h-0 pb-0 opacity-0"
                  }`}
                >
                  <p className="text-white text-[16px] font-normal leading-relaxed opacity-70">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuestionAnswerSection;
