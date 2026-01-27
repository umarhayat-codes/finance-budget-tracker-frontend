import React from "react";
import { toast } from "react-toastify";
import Layout from "../../../components/Layout";
import DashboardHeader from "../../../components/DashboardHeader";
import { FiCheck } from "react-icons/fi";
import { useAuth } from "../../../redux/useReduxHook";
import { useProfileHook } from "./useProfileHook";
import { ProfileFormData, IconType } from "../../../../types";
import profileImage from "../../../assets/profile_image.png";

const Profile: React.FC = () => {
  const CheckIcon = FiCheck as IconType;
  const { user } = useAuth();
  const {
    saveProfileData,
    fetchProfileData,
    loading,
    error: apiError,
  } = useProfileHook();

  const [formData, setFormData] = React.useState<ProfileFormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    paymentMethod: "",
    cardNumber: "",
    billingAddress: "",
  });

  React.useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.fullName || "",
        email: user.email || "",
      }));

      const loadProfile = async () => {
        const profile = await fetchProfileData(user.id);
        if (profile) {
          setFormData((prev) => ({
            ...prev,
            phoneNumber: profile.phoneNumber,
            dateOfBirth: profile.dateOfBirth,
            paymentMethod: profile.paymentMethod,
            cardNumber: profile.cardNumber,
            billingAddress: profile.billingAddress,
          }));
        }
      };
      loadProfile();
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (user) {
      try {
        await saveProfileData(user.id, formData);
        toast.success("Profile updated successfully!");
      } catch (err) {
        toast.error("Failed to save profile");
      }
    }
  };

  return (
    <Layout>
      <div className="flex flex-col gap-8 min-h-screen bg-white">
        <DashboardHeader />

        <div className="flex flex-col gap-8 px-4 md:px-0">
          <h1 className="font-inter font-bold text-[20px] text-profileTitle">
            User Profile
          </h1>

          <div className="flex justify-center">
            <img
              src={profileImage}
              alt="Profile"
              className="w-[150px] h-[150px] rounded-[70px] object-cover"
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="font-inter font-bold text-[15px] text-profileSectionTitle">
                Personal Information
              </h2>
              <div className="p-6 rounded-tr-[10px] rounded-tl-[10px] rounded-br-[10px] rounded-bl-[10px] border-[2px] border-profileBorder flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    className="w-full h-[60px] px-4 font-inter text-[15px] text-profileInputText placeholder:text-profileInputText outline-none border-b border-gray-100"
                    readOnly
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full h-[60px] px-4 font-inter text-[15px] text-profileInputText placeholder:text-profileInputText outline-none border-b border-gray-100"
                    readOnly
                  />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Phone Number"
                    className="w-full h-[60px] px-4 font-inter text-[15px] text-profileInputText placeholder:text-profileInputText outline-none border-b border-gray-100"
                  />
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    placeholder="Date Bioth"
                    className="w-full h-[60px] px-4 font-inter text-[15px] text-profileInputText placeholder:text-profileInputText outline-none border-b border-gray-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 flex-1">
              <h2 className="font-inter font-bold text-[15px] text-profileBillingTitle">
                Billing Information
              </h2>
              <div className="p-6 rounded-[10px] border-[2px] border-profileBillingBorder flex flex-col gap-4">
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleInputChange}
                    placeholder="Payment Method"
                    className="w-full h-[56px] px-4 font-inter text-[15px] text-profileInputBillingText placeholder:text-profileInputBillingText outline-none border-b border-profileInputBillingBorder"
                  />
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="Card Number"
                    className="w-full h-[56px] px-4 font-inter text-[15px] text-profileInputBillingText placeholder:text-profileInputBillingText outline-none border-b border-profileInputBillingBorder"
                  />
                  <input
                    type="text"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleInputChange}
                    placeholder="Biling Addreess"
                    className="w-full h-[56px] px-4 font-inter text-[15px] text-profileInputBillingText placeholder:text-profileInputBillingText outline-none border-b border-profileInputBillingBorder"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-4">
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                disabled={loading}
                className="px-6 py-3 bg-buttonBg rounded-[5px] font-inter font-bold text-[15px] text-white hover:bg-black/90 transition-colors disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
              <button className="px-6 py-3 bg-transactionTableHeaderBg rounded-[5px] font-inter font-bold text-[15px] text-profileDeleteBtnText hover:bg-gray-200 transition-colors">
                Delete Account
              </button>
            </div>

            <div className="flex items-center gap-3 px-4 py-2 bg-profileSubTierBg border-[2px] border-profileSubTierBorder rounded-[4px]">
              <div className="flex flex-col items-end">
                <span className="font-inter font-bold text-[15px] text-black">
                  Subscription Tier
                </span>
                <span className="font-inter font-normal text-[12px] text-profileSubTierText">
                  Pro Plan User
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#588D73] flex items-center justify-center text-white">
                <CheckIcon size={14} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
