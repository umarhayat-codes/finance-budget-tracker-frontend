import React from "react";
import DashboardHeader from "../../../components/DashboardHeader";
import useSettingHook from "./useSettingHook";
import danielleImg from "../../../assets/danielle_m.png";
import { IoSearchOutline } from "react-icons/io5";
import Layout from "src/components/Layout";

const Setting = () => {
  const {
    darkMode,
    toggleDarkMode,
    defaultCurrency,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handlePasswordChange,
  } = useSettingHook();

  return (
    <Layout>
      <div className="min-h-screen bg-settingPageBg">
        <DashboardHeader />
        <div className="mt-8 flex flex-col gap-8 px-4 lg:flex-row lg:px-8">
          <div className="flex flex-1 flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h1 className="font-inter text-[25px] font-bold text-settingTitle">
                General Settings
              </h1>
              <div className="flex h-[45px] w-full max-w-[400px] items-center rounded-[200px] border border-settingSearchBorder bg-transparent px-4">
                <input
                  type="text"
                  placeholder="Search"
                  className="h-full w-full bg-transparent font-inter text-[13px] font-regular text-settingSearchText outline-none placeholder:text-settingSearchText"
                />
                <IoSearchOutline className="text-xl text-settingSearchText" />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-inter text-[17px] font-bold text-settingSectionTitle">
                General Preferences
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="flex flex-col justify-between rounded-[10px] border border-settingCardBorder bg-settingCardBg p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-inter text-[13px] font-bold text-settingTextDark">
                      Dark Mode
                    </span>
                    <div
                      className={`h-4 w-8 rounded-full ${
                        darkMode ? "bg-black" : "bg-gray-300"
                      } cursor-pointer`}
                      onClick={toggleDarkMode}
                    ></div>
                  </div>
                  <div className="mt-4 flex flex-col gap-2">
                    <span className="font-inter text-[12px] font-bold text-settingTextGray">
                      Email Notifications
                    </span>
                    <span className="font-inter text-[13px] font-bold text-settingTextLightGray">
                      Default Currency
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-[9px] border-2 border-settingCardBorder2 bg-settingCardBg2 p-4">
                  <div className="mb-2 font-inter text-[12px] font-bold text-settingTextMuted">
                    Push Notifications
                  </div>
                  <input
                    type="text"
                    value={defaultCurrency}
                    readOnly
                    className="h-[35px] w-full rounded-[5px] bg-settingInputBg px-3 font-inter text-[12px] text-settingInputText outline-none"
                  />
                  <div className="mt-2 text-[10px] text-gray-400">
                    Encit NifiGdns
                  </div>
                </div>

                <div className="flex flex-col justify-between rounded-[7px] border border-settingCardBorder3 bg-settingCardBg2 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-inter text-[13px] font-bold text-settingTextDark">
                      Dark Mode
                    </span>
                  </div>
                  <div className="font-inter text-[12px] font-bold text-settingTextMuted">
                    Push Notifications
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="font-inter text-[17px] font-bold text-settingSectionTitle">
                Security
              </h2>
              <div className="flex flex-col gap-4 rounded-[7px] bg-settingInputBgWhite p-6 shadow-sm">
                <div className="flex flex-col gap-2">
                  <input
                    type="password"
                    placeholder="Change Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border-b border-gray-100 py-3 font-inter text-[15px] font-bold text-settingInputText placeholder:text-settingPlaceholder outline-none bg-transparent"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-b border-gray-100 py-3 font-inter text-[15px] font-bold text-settingInputText placeholder:text-settingPlaceholder outline-none bg-transparent"
                  />
                  <button
                    onClick={handlePasswordChange}
                    className="bg-settingButtonSaveBg text-settingButtonSaveText rounded-[5px] px-6 py-2 mt-3 font-inter text-[13px] font-bold"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-4 mt-4">
              <button className="bg-settingButtonSaveBg text-settingButtonSaveText rounded-[5px] px-8 py-3 font-inter text-[13px] font-bold shadow-lg">
                Save Changes
              </button>
              <button className="bg-settingButtonCancelBg text-settingButtonCancelText rounded-[5px] px-8 py-3 font-inter text-[15px] font-regular">
                Cancel
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col gap-8 lg:w-[350px]">
            <div className="w-full">
              <img
                src={danielleImg}
                alt="Credit Card"
                className="w-full object-contain"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-inter text-[17px] font-bold text-settingSectionTitle">
                Security
              </h2>
              <div className="flex flex-col gap-2 rounded-[7px] bg-settingCardBg2 p-4">
                <div className="flex justify-between py-1">
                  <span className="font-inter text-[13px] font-regular text-settingTextRegular font-bold">
                    Emtil Coyrecy
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-inter text-[13px] font-regular text-settingTextRegular font-bold">
                    Default Currency
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-inter text-[17px] font-bold text-settingIntegrationTitle">
                App Integrations
              </h2>
              <div className="flex flex-col gap-2 rounded-[7px] bg-settingCardBg2 p-4">
                <div className="flex justify-between py-1">
                  <span className="font-inter text-[13px] font-bold text-settingBankText">
                    Bank Aciendar
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="font-inter text-[13px] font-bold text-settingBankText font-normal">
                    Bank Account Sync
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h2 className="font-inter text-[14px] font-bold text-settingSubscriptionTitle">
                Subscription Tier
              </h2>
              <div className="flex flex-col gap-2 rounded-[6px] border border-settingCardBorder3 bg-settingSubscriptionBg p-4">
                <div className="flex justify-between py-1">
                  <span className="font-inter text-[13px] font-regular text-settingProPlan">
                    Pro Plan User
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
