import React from "react";
import man1 from "../../assets/man_1.png";
import man2 from "../../assets/man_2.png";
import man3 from "../../assets/man_3.png";

// Duplicate for marquee effect
const reviewsRow1 = [
  {
    text: "Big effort - high quality. Best Framer content out there.",
    name: "Danielle M.",
    role: "Freelance UX Designer",
    image: man1,
  },
  {
    text: "Clario made my finances feel simple. Everything’s in one place.",
    name: "Alex T.",
    role: "Product Manager",
    image: man2,
  },
  {
    text: "I finally set a savings goal and actually stuck to it.",
    name: "Reema K.",
    role: "Marketing Consultant",
    image: man3,
  },
];

const reviewsRow2 = [
  {
    text: "No more spreadsheet chaos. Just clean insights.",
    name: "Jonas W.",
    role: "Startup Founder",
    image: man2,
  },
  {
    text: "It feels like Clario understands how I think about money.",
    name: "Samira L.",
    role: "E-commerce Seller",
    image: man3,
  },
  {
    text: "The best investment I made for my financial health.",
    name: "Mark D.",
    role: "Freelancer",
    image: man1,
  },
];

const ReviewCard: React.FC<{
  text: string;
  name: string;
  role: string;
  image: string;
}> = ({ text, name, role, image }) => (
  <div className="min-w-[400px] md:min-w-[450px] bg-[#0D0D0D] p-8 rounded-[30px] flex flex-col justify-between mx-3">
    <div className="mb-6">
      {/* Quote Icon */}
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mb-4 opacity-20"
      >
        <path
          d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 7.55228 14.017 7V3H19.017C20.6739 3 22.017 4.34315 22.017 6V15C22.017 16.6569 20.6739 18 19.017 18H16.017V21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 7.55228 5.0166 7V3H10.0166C11.6735 3 13.0166 4.34315 13.0166 6V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166V21H5.0166Z"
          fill="white"
        />
      </svg>
      <p className="text-[20px] font-medium text-textWhite leading-snug">
        {text}
      </p>
    </div>
    <div className="flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border border-white/10"
      />
      <div>
        <h4 className="text-[16px] font-medium text-textWhite">{name}</h4>
        <p className="text-[14px] text-[#A3A3A3]">{role}</p>
      </div>
    </div>
  </div>
);

const ReviewSection: React.FC = () => {
  return (
    <section className="w-full py-20 bg-black font-manrope overflow-hidden">
      <div className="w-full flex flex-col items-center">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 px-4 w-full max-w-[1000px] mx-auto gap-8">
          <h2 className="text-[32px] md:text-[48px] font-medium text-textWhite leading-tight text-left lg:max-w-[500px]">
            Loved by individuals and small teams
          </h2>
          <p className="text-[16px] md:text-[18px] font-normal text-textWhite opacity-80 max-w-[400px] leading-relaxed text-left pb-1">
            People across industries trust Clario to manage money, reduce
            stress, and make smarter decisions — all in one simple dashboard.
          </p>
        </div>

        {/* Row 1 */}
        <div className="w-full flex mb-6 overflow-hidden relative">
          {/* Gradient Overlay Left */}
          <div className="absolute left-0 top-0 bottom-0 w-[100px] md:w-[200px] bg-gradient-to-r from-black to-transparent z-10"></div>
          {/* Gradient Overlay Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[100px] md:w-[200px] bg-gradient-to-l from-black to-transparent z-10"></div>

          {/* Marquee Content */}
          <div className="flex animate-scroll-left min-w-full">
            {[...reviewsRow1, ...reviewsRow1, ...reviewsRow1].map(
              (review, i) => (
                <ReviewCard key={i} {...review} />
              )
            )}
          </div>
        </div>

        {/* Row 2 */}
        <div className="w-full flex overflow-hidden relative">
          {/* Gradient Overlay Left */}
          <div className="absolute left-0 top-0 bottom-0 w-[100px] md:w-[200px] bg-gradient-to-r from-black to-transparent z-10"></div>
          {/* Gradient Overlay Right */}
          <div className="absolute right-0 top-0 bottom-0 w-[100px] md:w-[200px] bg-gradient-to-l from-black to-transparent z-10"></div>

          {/* Marquee Content */}
          <div className="flex animate-scroll-right min-w-full">
            {[...reviewsRow2, ...reviewsRow2, ...reviewsRow2].map(
              (review, i) => (
                <ReviewCard key={i} {...review} />
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
