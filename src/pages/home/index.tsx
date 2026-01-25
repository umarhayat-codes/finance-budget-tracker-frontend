import React from "react";
import { useAuth, useAppDispatch } from "../../redux/useReduxHook";
import { logoutUser } from "../../redux/slice/AuthSlice";
import { useNavigate } from "react-router-dom";
import Header from "src/components/Header";
import HeroSection from "./HeroSection";
import ClarioWorkSection from "./ClarioWorkSection";
import WatchCashSection from "./WatchCashSection";
import FeatherSection from "./FeatherSection";
import WhyClarioSection from "./WhyClarioSection";
import ReviewSection from "./ReviewSection";
import HearUserSection from "./HearUserSection";
import PricePlan from "./PricePlan";
import QuestionAnswerSection from "./QuestionAnswerSection";
import ExploreBlogSection from "./ExploreBlogSection";
import ReadyManageSection from "./ReadyManageSection";
import Footer from "src/components/Footer";

const HomePage: React.FC = () => {
  const { user, authorized } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/auth/signin"); // Adjust route as needed
  };

  // if (!authorized) {
  //   // Ideally this should be protected by a route guard, but here's a fallback or public view
  //   return (
  //     <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
  //       <h1 className="text-3xl font-bold mb-4">
  //         Welcome to Finance Budget Tracker
  //       </h1>
  //       <p className="mb-4">Please log in to see your profile.</p>
  //       <button
  //         onClick={() => navigate("/auth/signin")}
  //         className="bg-[#8CFF2E] text-black px-4 py-2 rounded"
  //       >
  //         Login
  //       </button>
  //     </div>
  //   );
  // }

  return (
    // <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
    //   <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

    //   {user ? (
    //     <div className="bg-[#0D0D0D] p-8 rounded-2xl w-full max-w-md border border-[#2F2F2F]">
    //       <h2 className="text-2xl font-semibold mb-6 border-b border-[#2F2F2F] pb-2">
    //         Profile Details
    //       </h2>
    //       <div className="space-y-4">
    //         <div>
    //           <p className="text-gray-400 text-sm">Full Name</p>
    //           <p className="text-lg font-medium">{user.fullName}</p>
    //         </div>
    //         <div>
    //           <p className="text-gray-400 text-sm">Email</p>
    //           <p className="text-lg font-medium">{user.email}</p>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <p>Loading profile...</p>
    //   )}

    //   <button
    //     onClick={handleLogout}
    //     className="mt-8 bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-colors"
    //   >
    //     Logout
    //   </button>

    //   {/*
    //         // Original components commented out as requested to show profile only
    //         // <Header />
    //         // ...
    //         */}
    // </div>
    <>
      <Header />
      <HeroSection />
      <ClarioWorkSection />
      <WatchCashSection />
      <FeatherSection />
      <WhyClarioSection />
      <ReviewSection />
      <HearUserSection />
      <PricePlan />
      <QuestionAnswerSection />
      <ExploreBlogSection />
      <ReadyManageSection />
      <Footer />
    </>
  );
};

export default HomePage;
