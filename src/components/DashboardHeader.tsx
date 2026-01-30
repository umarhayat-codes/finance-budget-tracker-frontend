import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import man1 from "../assets/dashboard_header_image.png";
import { useAuth } from "src/redux/useReduxHook";
import { IconType } from "react-icons";

const DashboardHeader: React.FC = () => {
  const SearchIcon = IoSearchOutline as IconType;
  const { user } = useAuth();
  return (
    <div className="flex w-full items-center justify-between py-4">
      <div className="flex h-[45px] md:w-full w-[250px] max-w-[434px] items-center rounded-[200px] border border-headerBorder bg-transparent px-4">
        <input
          type="text"
          placeholder="Search"
          className="h-full w-full bg-transparent font-inter text-[16px] font-bold text-black outline-none placeholder:text-textGray"
        />
        <SearchIcon className="text-xl text-textGray" />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
          <span className="font-inter text-[13px] font-bold text-black">
            {user?.fullName}
          </span>
          <span className="font-inter text-[13px] font-bold text-textSecondary hidden sm:block">
            Pro Plan User
          </span>
        </div>
        <img
          src={man1}
          alt="User Profile"
          className="h-[50px] w-[50px] rounded-[300px] object-cover"
        />
      </div>
    </div>
  );
};

export default DashboardHeader;
