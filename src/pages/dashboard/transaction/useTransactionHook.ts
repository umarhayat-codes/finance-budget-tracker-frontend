import { useState, useEffect } from "react";
import axios from "axios";
import {
  TransactionItem,
  TransactionFormData,
  CategoryApiResponse,
  UseTransactionsResult,
} from "../../../../types";
import { useTransactions } from "src/redux/useReduxHook";
import { toast } from "react-toastify";

const TRANSACTIONS_API_URL = "http://localhost:5000/api/transactions";
const CATEGORIES_API_URL = "http://localhost:5000/api/categories";

export const addTransactionApi = async (
  data: TransactionFormData,
): Promise<TransactionItem> => {
  const response = await axios.post(`${TRANSACTIONS_API_URL}/`, data, {
    withCredentials: true,
  });
  return response.data.transaction;
};

export const fetchTransactionsApi = async (): Promise<TransactionItem[]> => {
  const response = await axios.get(`${TRANSACTIONS_API_URL}/`, {
    withCredentials: true,
  });
  return response.data.transactions;
};

export const useTransactionHook = (): UseTransactionsResult => {
  const [categories, setCategories] = useState<CategoryApiResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const transactionData = useTransactions();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await axios.get<CategoryApiResponse[]>(
          CATEGORIES_API_URL,
          {
            withCredentials: true,
          },
        );
        setCategories(response.data);
      } catch (err) {
        toast.error("Failed to fetch categories");
        setError("Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return {
    ...transactionData,
    categories,
    loading,
    error,
  };
};
