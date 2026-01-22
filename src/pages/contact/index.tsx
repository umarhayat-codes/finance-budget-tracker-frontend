import React from "react";
import Contact from "./Contact";
import QuestionAnswerSection from "../home/QuestionAnswerSection";
import ReadyManageSection from "../home/ReadyManageSection";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Contact />
      <QuestionAnswerSection />
      <ReadyManageSection />
      <Footer />
    </div>
  );
};

export default ContactPage;
