import React from "react";
import UpComingReminder from "./UpComingReminder";
import ReminderSkeleton from "./ReminderSkeleton";
import { useReminderHook } from "./useReminderHook";
import Layout from "src/components/Layout";

const ReminderPage: React.FC = () => {
  const { loading } = useReminderHook();

  return (
    <Layout>{loading ? <ReminderSkeleton /> : <UpComingReminder />}</Layout>
  );
};

export default ReminderPage;
