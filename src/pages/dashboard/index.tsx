import { Routes, Route } from "react-router-dom";
import TransactionsPage from "./transaction";
import Profile from "./profile/Profile";
import CategoriesPage from "./category";
import BudgePage from "./budge";
import GoalPage from "./goal";
import ReportPage from "./report";
import ReminderPage from "./reminder";
import Setting from "./setting/Setting";
import FinanceDashboardPage from "./financeDashboard";

const Dashboard: React.FC = () => (
  <Routes>
    <Route path="finance" element={<FinanceDashboardPage />} />
    <Route path="transactions" element={<TransactionsPage />} />
    <Route path="profile" element={<Profile />} />
    <Route path="categories" element={<CategoriesPage />} />
    <Route path="budget" element={<BudgePage />} />
    <Route path="goals/*" element={<GoalPage />} />
    <Route path="reports" element={<ReportPage />} />
    <Route path="reminders" element={<ReminderPage />} />
    <Route path="settings" element={<Setting />} />
  </Routes>
);

export default Dashboard;
