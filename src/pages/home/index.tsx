import React from "react";
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
  return (
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
