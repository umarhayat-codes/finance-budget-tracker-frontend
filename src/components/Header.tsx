import { useNavigate, Link } from "react-router-dom";
import mainIcon from "../assets/main_icon.png";
import { useState } from "react";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="w-full bg-black border-b border-zinc-800/50 sticky top-0 z-50">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-[88px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img
            src={mainIcon}
            alt="Clario"
            className="w-[34px] h-[34px] object-contain"
          />
          <span className="header-logo-text font-semibold text-[20px] tracking-tight">
            Clario
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {["How it works", "Features", "Pricing", "Blog"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
              className="header-nav-link font-medium text-[16px] transition-colors hover:text-primary"
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <button
            onClick={() => navigate("/wishlist")}
            className="btn-waitlist px-[24px] py-[12px] rounded-[23px] font-semibold text-[15px] transition-colors hover:bg-[#222222]"
          >
            Waitlist
          </button>
          <button
            onClick={() => navigate("/contact")}
            className="btn-contact px-[24px] py-[12px] rounded-[23px] font-semibold text-[15px] transition-colors hover:bg-[#7be625]"
          >
            Contact
          </button>
        </div>

        <div className="lg:hidden flex items-center gap-4">
          <button
            onClick={() => navigate("/contact")}
            className="hidden sm:block mobile-contact px-4 py-2 rounded-[23px] font-semibold text-[14px]"
          >
            Contact
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 ">
            {isMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-800 px-6 py-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-6">
            {["How it works", "Features", "Pricing", "Blog"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="header-nav-link font-medium text-[18px]"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3 pt-4 border-t border-zinc-800">
            <button
              onClick={() => {
                navigate("/wishlist");
                setIsMenuOpen(false);
              }}
              className="btn-waitlist w-full py-3 rounded-[23px] font-semibold text-[16px]"
            >
              Waitlist
            </button>
            <button
              onClick={() => {
                navigate("/contact");
                setIsMenuOpen(false);
              }}
              className="btn-contact w-full py-3 rounded-[23px] font-semibold text-[16px]"
            >
              Contact
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
