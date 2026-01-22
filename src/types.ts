export interface SignUpFormData {
  fullName: string;
  email: string;
  password?: string;
}

export interface SignInFormData {
  email: string;
  password?: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface AuthState {
  authorized: boolean;
  isInitialized: boolean;
}

export interface ProfileState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface DashboardHeaderProps {}
export interface AddTransactionProps {}

export interface TransactionFormData {
  category: string;
  date: string;
  time: string;
  amount: string;
  method: string;
  type: "income" | "expense";
}

export interface TransactionItem extends TransactionFormData {
  id: string;
  tag?: string;
  isPositive: boolean;
}

export interface TransactionSummary {
  title: string;
  amount: string;
  percentage: string;
  difference: string;
  isPositive: boolean;
  type: "total" | "income" | "expense";
}

export interface TransactionActivityItem extends TransactionItem {}

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

export interface TransactionState {
  transactions: TransactionItem[];
  selectedMonth: Month;
}
