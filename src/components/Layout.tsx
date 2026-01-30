import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiBox,
  FiPieChart,
  FiTarget,
  FiFileText,
  FiFolder,
  FiCalendar,
  FiUser,
  FiSettings,
  FiLogOut,
  FiChevronLeft,
  FiMenu,
  FiX,
} from "react-icons/fi";
import mainIcon from "../assets/main_icon.png";
import { NavItemProps, FooterItemProps, LayoutProps } from "../../types";
import { logoutUser } from "src/redux/slice/AuthSlice";
import { useAppDispatch, useLoadTransactions } from "src/redux/useReduxHook";
import { toast } from "react-toastify";

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon: Icon,
  label,
  isDashboard,
  isOpen,
  onClick,
}) => {
  const location = useLocation();
  const isActive =
    location.pathname === to ||
    (to === "/" && location.pathname === "/dashboard");

  const baseClasses = `flex items-center gap-3 transition-all duration-300 group cursor-pointer`;

  if (isDashboard) {
    return (
      <NavLink
        to={to}
        onClick={onClick}
        title={!isOpen ? label : ""}
        className={() =>
          `${baseClasses} ${
            isOpen ? "px-6 py-4 rounded-[200px]" : "px-0 py-4 justify-center"
          } font-inter font-bold text-[15px] ${
            isActive
              ? "bg-clarioGreen text-clarioBlack shadow-lg"
              : "text-clarioWhite hover:bg-white/10"
          }`
        }
      >
        <div
          className={`p-1.5 rounded-full transition-colors duration-300 ${
            isActive
              ? "bg-clarioBlack text-clarioGreen"
              : "bg-clarioWhite text-clarioBlack"
          }`}
        >
          <Icon size={18} />
        </div>
        <span
          className={`transition-all duration-300 ${
            isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          {label}
        </span>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      title={!isOpen ? label : ""}
      className={() =>
        `${baseClasses} ${
          isOpen ? "pl-6 py-3 rounded-l-[99px]" : "pl-0 py-3 justify-center"
        } font-inter font-bold text-[14px] ${
          isActive
            ? "bg-clarioGreen text-clarioBlack w-full"
            : "text-clarioWhite hover:bg-white/5"
        }`
      }
    >
      <div
        className={`p-1.5 rounded-full transition-colors duration-300 ${
          isActive
            ? "bg-clarioBlack text-clarioGreen"
            : "bg-clarioWhite text-clarioBlack"
        }`}
      >
        <Icon size={16} />
      </div>
      <span
        className={`transition-all duration-300 ${
          isOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
        }`}
      >
        {label}
      </span>
    </NavLink>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useLoadTransactions();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1239);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1239) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    // Call once to set initial state correctly
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: NavItemProps[] = [
    {
      to: "/dashboard/finance",
      icon: FiGrid,
      label: "Dashboard",
      isDashboard: true,
    },
    { to: "/dashboard/transactions", icon: FiBox, label: "Transactions" },
    { to: "/dashboard/budget", icon: FiPieChart, label: "Budgets" },
    { to: "/dashboard/goals", icon: FiTarget, label: "Goals" },
    { to: "/dashboard/reports", icon: FiFileText, label: "Reports" },
    { to: "/dashboard/categories", icon: FiFolder, label: "Categories" },
    { to: "/dashboard/reminders", icon: FiCalendar, label: "Reminders" },
  ];

  const footerItems: FooterItemProps[] = [
    {
      to: "/dashboard/profile",
      icon: FiUser,
      label: "Profile",
      fontSize: "text-[13px]",
      weight: "font-bold",
    },
    {
      to: "/dashboard/settings",
      icon: FiSettings,
      label: "Settings",
      fontSize: "text-[13px]",
      weight: "font-bold",
    },
    {
      to: "/auth/signin",
      icon: FiLogOut,
      label: "Logout",
      fontSize: "text-[15px]",
      weight: "font-normal",
      onClick: () => {
        dispatch(logoutUser());
        toast.success("Logout successful");
        navigate("/auth/signin");
      },
    },
  ];

  const activeItem =
    navItems.find(
      (item) =>
        location.pathname === item.to ||
        (item.to === "/" && location.pathname === "/dashboard"),
    ) || navItems[0];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNavItemClick = () => {
    if (window.innerWidth < 1239) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-clarioBlack text-clarioWhite relative">
      <div className="sidebar:hidden flex items-center justify-between p-4 w-full fixed top-0 bg-clarioBlack z-40 border-b border-cardBorder">
        <div className="flex items-center gap-2">
          <img src={mainIcon} alt="Clario" className="w-8 h-8 object-contain" />
          <span className="font-manrope font-semibold text-[20px]">Clario</span>
        </div>
        <button onClick={toggleSidebar} className="text-clarioWhite p-2">
          {isSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {isSidebarOpen && (
        <div
          className="sidebar:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
        fixed sidebar:static inset-y-0 left-0 z-50
        bg-clarioBlack flex flex-col pt-8 pb-10
        transition-all duration-300 ease-in-out
        ${
          isSidebarOpen
            ? "w-[240px] translate-x-0"
            : "w-[80px] -translate-x-full sidebar:translate-x-0"
        }
      `}
      >
        {/* <div
          className={`px-6 mb-10 flex items-center transition-all duration-300 ${
            isSidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={mainIcon}
              alt="Clario"
              className="w-10 h-10 object-contain"
            />
            {isSidebarOpen && (
              <span className="font-manrope font-semibold text-[20px] text-clarioWhite">
                Clario
              </span>
            )}
          </div>
          {isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="hidden sidebar:flex text-clarioWhite p-2 hover:bg-white/10 rounded-full transition-all duration-300"
              title="Close Sidebar"
            >
              <FiChevronLeft size={20} />
            </button>
          )}
        </div> */}

        <div
          className={`mb-10 flex items-center transition-all duration-300 ${
            isSidebarOpen ? "px-6 justify-between" : "px-2 justify-center gap-1"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={mainIcon}
              alt="Clario"
              className="w-10 h-10 object-contain"
            />
            {isSidebarOpen && (
              <span className="font-manrope font-semibold text-[20px] text-clarioWhite whitespace-nowrap">
                Clario
              </span>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className={`hidden sidebar:flex text-clarioWhite p-1.5 hover:bg-white/10 rounded-full transition-all duration-300 ${
              !isSidebarOpen ? "rotate-180" : ""
            }`}
            title={isSidebarOpen ? "Close Sidebar" : "Open Sidebar"}
          >
            <FiChevronLeft size={20} />
          </button>
        </div>

        <nav
          className={`flex-1 flex flex-col gap-1 transition-all duration-300 ${
            isSidebarOpen ? "pr-6" : "pr-0"
          }`}
        >
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              isOpen={isSidebarOpen}
              onClick={() => {
                if (item.onClick) item.onClick();
                handleNavItemClick();
              }}
            />
          ))}
          {/* {!isSidebarOpen && (
            <button
              onClick={toggleSidebar}
              className="hidden sidebar:flex text-clarioWhite p-2 hover:bg-white/10 rounded-full transition-all duration-300 mt-4 mx-auto"
              title="Open Sidebar"
            >
              <FiChevronLeft size={20} className="rotate-180" />
            </button>
          )} */}
        </nav>

        <div
          className={`mt-auto flex flex-col gap-6 pt-8 border-t border-cardBorder/30 transition-all duration-300 ${
            isSidebarOpen ? "px-8" : "px-0 items-center"
          }`}
        >
          {footerItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                if (item.onClick) item.onClick();
                handleNavItemClick();
              }}
              title={!isSidebarOpen ? item.label : ""}
              className={({ isActive }) =>
                `flex items-center gap-3 transition-all duration-300 font-inter ${
                  item.fontSize
                } ${item.weight} ${
                  isActive
                    ? "text-clarioGreen"
                    : "text-clarioWhite hover:text-clarioGreen/80"
                }`
              }
            >
              <div className="p-1.5 rounded-full bg-clarioWhite text-clarioBlack">
                <item.icon size={16} />
              </div>
              {isSidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </div>
      </aside>

      <main className="flex-1 sidebar:p-4 overflow-auto pt-20 sidebar:pt-4 bg-[#F5F5F5] transition-all duration-300 relative">
        <div className="min-h-full bg-white rounded-[24px] border border-transactionBorder p-6 shadow-sm overflow-hidden text-black">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
