import { IconType } from "react-icons";
import { PieLabelRenderProps } from "recharts";
export type { IconType, PieLabelRenderProps };

export interface CategoryFormData {
  categoryName: string;
  amount: string;
  type?: "income" | "expense";
}

export interface SavingFormData {
  title: string;
  amount: string;
  date: string;
}

export interface SignUpFormData {
  fullName: string;
  email: string;
  password?: string;
}

export interface NavItemProps {
  to: string;
  icon: IconType;
  label: string;
  isDashboard?: boolean;
  onClick?: () => void;
}

export interface FooterItemProps {
  to: string;
  icon: IconType;
  label: string;
  fontSize: string;
  weight: string;
  onClick?: () => void;
}

export interface LayoutProps {
  children: React.ReactNode;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  authorized: boolean;
  isInitialized?: boolean;
}

export interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface SignInFormData {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface ApiErrorResponse {
  message: string;
}

export interface AxiosErrorType {
  response?: {
    status: number;
    data?: {
      message?: string;
    };
  };
}

export interface AuthHook {
  signup: (formData: SignUpFormData) => Promise<AuthResponse>;
  login: (formData: SignInFormData) => Promise<AuthResponse>;
  loading: boolean;
  error: string | null;
  success: boolean;
}
export interface DashboardHeaderProps {}
export interface AddTransactionProps {}
export interface AddBudgeProps {}

export interface TransactionSummary {
  title: string;
  amount: string;
  percentage: string;
  difference: string;
  isPositive: boolean;
  type: "total" | "income" | "expense";
}

export interface TransactionData {
  summary: TransactionSummary[];
}

export interface TransactionActivityItem {
  id: string;
  category: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  isPositive: boolean;
  tag?: string;
}

export interface ExpenseItem {
  id: string;
  category: string;
  percentage: number;
  color: string;
  isMain?: boolean;
}

export interface TransactionFormData {
  category: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  type: "income" | "expense";
}

export interface BudgeFormData {
  month: string;
  year: string;
  amount: string;
  category: string;
}

export interface TransactionItem extends TransactionFormData {
  id: string;
  tag?: string;
  isPositive?: boolean;
}

export interface TransactionState {
  transactions: TransactionItem[];
  selectedMonth: Month;
}

export interface ProfileFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  paymentMethod: string;
  cardNumber: string;
  billingAddress: string;
}

export interface ProfileApiResponse {
  id: string;
  userId: string;
  phoneNumber: string;
  dateOfBirth: string;
  paymentMethod: string;
  cardNumber: string;
  billingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryCardData {
  id: string;
  icon: IconType;
  title: string;
  subtitle: string;
  priceDetails: string;
  priceValue: string;
  chartData: { value: number }[];
  createdAt?: string;
}

export interface SavingCardData {
  id: string;
  icon: IconType;
  title: string;
  subtitle: string;
  priceDetails: string;
  priceValue: string;
  chartData: { value: number }[];
  date: string;
  createdAt?: string;
}

export interface CategoryApiResponse {
  id: string;
  name: string;
  amount: number;
  type?: "income" | "expense";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavingApiResponse {
  id: string;
  title: string;
  amount: number;
  date: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryBreakdownItem {
  id: string;
  label: string;
  subLabel?: string;
  percentage?: string;
  color: string;
  value: number;
  [key: string]: string | number | undefined;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface CardProps {
  title: string;
  amount: string;
  percentage: string;
  difference: string;
  isPositive: boolean;
  type: "total" | "income" | "expense";
  variant?: "default" | "budget";
  className?: string;
  children?: React.ReactNode;
}

export interface BudgeSummary {
  title: string;
  amount: string;
  percentage: string;
  difference: string;
  isPositive: boolean;
  type: "total" | "income" | "expense";
  usedFrom?: string;
}

export interface BudgeSummaryItem {
  title: string;
  amount: string;
  percentage?: string;
  fraction?: string;
  isPositive?: boolean;
  type: "total" | "income" | "expense";
  trend?: string;
}

export interface BudgetApiResponse {
  id: string;
  userId: string;
  budget?: string;
  category: string;
  amount: number;
  month: string;
  year: string;
  createdAt: string;
  updatedAt: string;
}

export interface LatestBudgetApiResponse extends BudgetApiResponse {
  spent: number;
}

export interface GraphDataPoint {
  month: string;
  year: string;
  budget: number;
  spent: number;
  fullDate?: Date;
}

export interface BreakdownData {
  id: string;
  category: string;
  budgeted: number;
  spent: number;
  percentage: number;
}

export type Month =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December"
  | "All";

export interface BudgetState {
  budgets: BudgetApiResponse[];
  loading: boolean;
  error: string | null;
  selectedMonth: Month;
}

export interface ExpenseValidationResult {
  isValid: boolean;
  errorMessage: string | null;
}

export interface BudgetCheckParams {
  category: string;
  month: string;
  amount: number;
}

export interface MonthlyComparisonItem {
  difference: string;
  percentage: string;
  isPositive: boolean;
}

export interface MonthlyComparisonResponse {
  income: MonthlyComparisonItem;
  expense: MonthlyComparisonItem;
  total: MonthlyComparisonItem;
}

export interface TransactionComparison {
  percentage: string;
  difference: string;
  isPositive: boolean;
}

export interface UseTransactionsResult {
  categories: CategoryApiResponse[];
  loading: boolean;
  error: string | null;
  selectedMonth: Month;
  handleMonthSelect: (month: Month) => void;
  totalTransaction: number;
  totalIncome: number;
  totalExpense: number;
  validateExpense: (params: BudgetCheckParams) => ExpenseValidationResult;
  totalComparison: TransactionComparison;
  expenseComparison: TransactionComparison;
  incomeComparison: TransactionComparison;
  transactions: TransactionItem[];
  totalBalance: number;
}

export type GoalStatus = "On Track" | "Pending" | "Delayed" | "Completed";

export interface GoalItem {
  id: string;
  userId: string;
  goalName: string;
  targetAmount: number;
  targetDate: string;
  goalType: string;
  fundingSource: string;
  goalStatus: GoalStatus;
  createdAt: string;
  updatedAt: string;
  icon?: IconType;
}

export interface GoalHistoryItem {
  id: string;
  date: string;
  goalName: string;
  trackStatus: GoalStatus;
  processStatus: GoalStatus;
  amountStatus: string;
}

export interface GoalStats {
  totalGoals: number;
  completed: number;
  pendingGoals: number;
  spentSavings: string;
}

export interface CreateGoalFormData {
  goalName: string;
  targetAmount: string;
  targetDate: string;
  goalType: string;
  fundingSource: "Current Savings" | "New Account";
}

export interface UseGoalHookResult {
  goals: GoalItem[];
  stats: GoalStats;
  history: GoalHistoryItem[];
  goalForm: CreateGoalFormData;
  loading: boolean;
  error: string | null;
  filterStatus: GoalStatus | "All";
  handleGoalChange: (field: keyof CreateGoalFormData, value: string) => void;
  handleCreateGoal: () => void;
  handleCancelGoal: () => void;
  handleFilterChange: (status: GoalStatus | "All") => void;
  updateGoalStatus: (id: string, newStatus: GoalStatus) => Promise<void>;
}

export interface MonthlyExpenseBreakdown {
  totalIncome: string | number;
  totalExpense: string | number;
  data: {
    category: string;
    value: number;
    color: string;
  }[];
}

export interface IncomeVsExpenseTrend {
  labels: string[];
  incomeData: number[];
  expenseData: number[];
  savingsData: number[];
}

export interface MonthlyFinancialApiResponse {
  totalIncome: number;
  totalExpense: number;
  startDate: string;
  endDate: string;
  categoryBreakdown: SummaryBreakdownItem[];
  trend: IncomeVsExpenseTrend;
}

export interface RecentTransaction {
  id: string;
  date: string;
  description: string;
  category: string;
  amountStatus: string;
  status: "Received" | "Completed";
}

export interface ReportData {
  monthlyBreakdown: MonthlyExpenseBreakdown;
  trend: IncomeVsExpenseTrend;
  recentTransactions: RecentTransaction[];
  startDate?: string;
  endDate?: string;
}

export interface SummaryBreakdownItem {
  category: string;
  value: number;
  amount: number;
  color: string;
}

export interface SummaryApiResponse {
  totalIncome: number;
  totalExpense: number;
  startDate: string;
  endDate: string;
  categoryBreakdown: SummaryBreakdownItem[];
  trend: IncomeVsExpenseTrend;
}

export interface TransactionApiResponse {
  transactions: TransactionItem[];
}

export interface UseReportHookResult {
  reportData: ReportData;
  loading: boolean;
  error: string | null;
}

export interface ReminderItem {
  id: string;
  title: string;
  amount: string;
  subtitle?: string;
  dateStr: string;
  type: string;
  userId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ReminderFormData {
  title: string;
  amount: string;
  dateStr: string;
}

export interface ReminderResponse {
  message?: string;
  data: ReminderItem | ReminderItem[];
}

export interface ReminderPreference {
  id: string;
  label: string;
  enabled: boolean;
  type: "toggle" | "dropdown";
}

export interface UseReminderHookResult {
  loading: boolean;
  remindersRow1: ReminderItem[];
  remindersRow2: ReminderItem[];
  remindersRow3: ReminderItem[];
  preferences: ReminderPreference[];
  completionRate: number;
  handlePreferenceToggle: (id: string) => void;
  addReminder: (data: ReminderFormData) => Promise<void>;
}

export interface SettingProps {}

export interface UseSettingHookResult {
  darkMode: boolean;
  toggleDarkMode: () => void;
  emailNotifications: boolean;
  toggleEmailNotifications: () => void;
  pushNotifications: boolean;
  togglePushNotifications: () => void;
  defaultCurrency: string;
  setDefaultCurrency: (currency: string) => void;
  twoFactorAuth: boolean;
  toggleTwoFactorAuth: () => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  handlePasswordChange: () => Promise<void>;
}

export interface ChangePasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface MonthlyFinancialData {
  month: string;
  income: number;
  expense: number;
  savings: number;
}

export interface SummaryCardData {
  id: string;
  title: string;
  amount: string;
  type: "income" | "spending" | "budget" | "saving";
  description: string;
  bgColor: string;
  textColor: string;
  amountColor: string;
  descColor: string;
  borderColor: string;
}

export interface TransactionNew {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  date: string;
  paymentMethod: string;
  status: "Success" | "Received" | "Pending";
  type: "income" | "expense";
  iconType: "food" | "wallet" | "globe" | "power" | "home";
}

export interface BudgetGoalData {
  id: string;
  name: string;
  dueDate: string;
  completedPercentage: number;
  currentAmount: string;
  targetAmount: string;
  remainingAmount: string;
  status: "On Track" | "Moderate";
}

export interface ExpenseDistributionItem {
  id: string;
  category: string;
  percentage: number;
  amount: string;
  color: string;
  textColor: string;
  [key: string]: string | number | undefined;
}

export interface ExpenseBreakdownApiResponse {
  mainCategories: ExpenseDistributionItem[];
  otherCategories: ExpenseDistributionItem[];
}

export interface UseFinanceHookResult {
  data: MonthlyFinancialData[];
  summaryCards: SummaryCardData[];
  transactions: RecentTransactionItem[];
  budgetGoals: BudgetGoalData[];
  breakdownData: ExpenseBreakdownApiResponse | null;
  startMonth: string;
  endMonth: string;
  onDownload: () => void;
  onShare: () => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  onAddNewGoal: () => void;
  onManageBudgets: () => void;
  onEditGoal: (id: string) => void;
  onDeleteGoal: (id: string) => void;
  selectedMonth: string;
  handleMonthChange: (month: string) => void;
  totalPages: number;
  isLoading: boolean;
  loading: boolean;
  availableMonths: MonthOption[];
  expenseDistribution: ExpenseDistributionItem[];
  renderCustomizedLabel: (props: CustomLabelProps) => React.ReactNode;
}

export interface FinancialSummary {
  totalIncome: number;
  totalExpense: number;
  totalSaving: number;
  totalBudget: number;
}

export interface RecentTransactionItem {
  id: string;
  category: string;
  subCategory: string;
  amount: string;
  date: string;
  paymentMethod: string;
  status: "Success" | "Received" | "Pending";
  type: "income" | "expense";
  iconType: "food" | "wallet" | "globe" | "power" | "home";
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
}

export interface RecentTransactionApiResponse {
  transactions: RecentTransactionItem[];
  pagination: PaginationInfo;
}

export interface MonthOption {
  label: string;
  value: string;
}

export interface BudgetTooltipProps {
  active?: boolean;
  payload?: { payload: GraphDataPoint }[];
}

export interface BarChartItem {
  month?: string;
  payload?: GraphDataPoint;
}

export interface CustomLabelProps extends PieLabelRenderProps {
  payload?: ExpenseDistributionItem;
}

export interface TrendChartData {
  name: string;
  income: number;
  expense: number;
}

export type TooltipValueFormatter = (
  value: number | undefined,
) => [string, string];

export interface IconProps {
  icon: IconType;
  size?: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BudgetCardProps {
  title: string;
  icon?: React.ReactNode;
  amount: string | number;
  percentage?: string;
  isPositive?: boolean;
  difference?: string;
  headerRight?: React.ReactNode;
  children?: React.ReactNode;
  showTrend?: boolean;
  className?: string;
  bodyRightContent?: React.ReactNode;
}

export interface RadarDataPoint {
  month: string;
  fullMonth: string;
  year: number;
  spent: number;
  totalBudget: number;
  totalSpent: number;
}

export interface RadarTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: RadarDataPoint;
    name: string;
    value: number;
    color: string;
  }>;
}
