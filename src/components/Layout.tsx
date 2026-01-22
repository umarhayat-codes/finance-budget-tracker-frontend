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
  FiMenu,
  FiX,
} from "react-icons/fi";
import mainIcon from "../assets/main_icon.png";
import {
  NavItemProps,
  FooterItemProps,
  LayoutProps,
} from "../types/layout.type";
import { logoutUser } from "src/redux/slice/AuthSlice";
import { useAppDispatch, useLoadTransactions } from "src/redux/useReduxHook";

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon: Icon,
  label,
  isDashboard,
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
        className={() =>
          `${baseClasses} px-6 py-4 rounded-[200px] font-inter font-bold text-[15px] ${
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
        <span>{label}</span>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={() =>
        `${baseClasses} pl-6 py-3 rounded-l-[99px] font-inter font-bold text-[14px] ${
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
      <span>{label}</span>
    </NavLink>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  useLoadTransactions(); // Load transactions globally
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Icons matching Figma image
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
        navigate("/auth/signin");
      },
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex min-h-screen bg-clarioBlack text-clarioWhite">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 w-full fixed top-0 bg-clarioBlack z-40 border-b border-cardBorder">
        <div className="flex items-center gap-2">
          <img src={mainIcon} alt="Clario" className="w-8 h-8 object-contain" />
          <span className="font-manrope font-semibold text-[20px]">Clario</span>
        </div>
        <button onClick={toggleSidebar} className="text-clarioWhite p-2">
          {isSidebarOpen
            ? React.createElement(FiX as any, { size: 24 })
            : React.createElement(FiMenu as any, { size: 24 })}
        </button>
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[280px] h-screen bg-clarioBlack flex flex-col pt-8 pb-10
        transition-transform duration-300 ease-in-out
        ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }
      `}
      >
        {/* Logo Section */}
        <div className="px-8 mb-10 flex items-center gap-3">
          <img
            src={mainIcon}
            alt="Clario"
            className="w-10 h-10 object-contain"
          />
          <span className="font-manrope font-semibold text-[20px] text-clarioWhite">
            Clario
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 flex flex-col gap-1 pr-6">
          {navItems.map((item) => (
            <NavItem
              key={item.to}
              {...item}
              onClick={() => setIsSidebarOpen(false)}
            />
          ))}
        </nav>

        {/* Footer Items */}
        <div className="px-8 mt-auto flex flex-col gap-6 pt-8 border-t border-cardBorder/30">
          {footerItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => {
                setIsSidebarOpen(false);
                if (item.onClick) item.onClick();
              }}
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
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 lg:p-4 overflow-auto pt-20 lg:pt-4 bg-[#F5F5F5]">
        <div className="min-h-full bg-white rounded-[24px] border border-transactionBorder p-6 shadow-sm overflow-hidden text-black">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
