import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios";
import {
  FiPlus,
  FiTruck,
  FiHome,
  FiMap,
  FiDollarSign,
  FiTrendingUp,
  FiActivity,
} from "react-icons/fi";
import { LuUtensils } from "react-icons/lu";
import { BiMask } from "react-icons/bi";
import {
  CategoryCardData,
  CategoryFormData,
  CategoryApiResponse,
  SavingCardData,
  SavingFormData,
  SavingApiResponse,
  IconType,
  ApiErrorResponse,
} from "../../../../types";

// Base API URL - adjust if necessary
const API_URL = "http://localhost:3000/api";

// Axios with credentials for cookies (JWT)
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

export const useCategoryHook = () => {
  // Cast icons to IconType to resolve TS2786
  const PlusIcon = FiPlus as IconType;
  const UtensilsIcon = LuUtensils as IconType;
  const TruckIcon = FiTruck as IconType;
  const HomeIcon = FiHome as IconType;
  const GameIcon = BiMask as IconType;
  const TravelIcon = FiMap as IconType;
  const SalaryIcon = FiDollarSign as IconType;
  const InvestIcon = FiTrendingUp as IconType;
  const DefaultIcon = FiActivity as IconType;
  const SavingIcon = FiTrendingUp as IconType;

  const dummyChartData = [
    { value: 10 },
    { value: 20 },
    { value: 15 },
    { value: 40 },
    { value: 30 },
    { value: 50 },
    { value: 25 },
    { value: 60 },
  ];

  const [categories, setCategories] = useState<CategoryCardData[]>([]);
  const [savings, setSavings] = useState<SavingCardData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
  const [formData, setFormData] = useState<CategoryFormData>({
    categoryName: "",
    amount: "",
  });
  const [savingFormData, setSavingFormData] = useState<SavingFormData>({
    title: "",
    amount: "",
    date: "",
  });

  const getIconByCategoryName = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes("food")) return UtensilsIcon;
    if (lowerName.includes("transport")) return TruckIcon;
    if (lowerName.includes("entertainment")) return GameIcon;
    if (lowerName.includes("housing")) return HomeIcon;
    if (lowerName.includes("salary")) return SalaryIcon;
    if (lowerName.includes("travel")) return TravelIcon;
    return DefaultIcon;
  };

  const mapApiToCardData = (
    apiData: CategoryApiResponse,
  ): CategoryCardData => ({
    id: apiData.id,
    icon: getIconByCategoryName(apiData.name),
    title: apiData.name,
    subtitle: "Category Activity",
    priceDetails: "Monthly Budget",
    priceValue: `$${apiData.amount}`,
    chartData: dummyChartData,
    createdAt: apiData.createdAt,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await api.get("/");
      const mappedData = response.data.map(mapApiToCardData);
      setCategories(mappedData);
      setError(null);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to fetch categories");
      console.error("Error fetching categories:", err);
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const mapApiToSavingCardData = (
    apiData: SavingApiResponse,
  ): SavingCardData => ({
    id: apiData.id,
    icon: SavingIcon,
    title: apiData.title,
    subtitle: "Saving Activity",
    priceDetails: "Saving Date: " + apiData.date,
    priceValue: `$${apiData.amount}`,
    chartData: dummyChartData,
    date: apiData.date,
    createdAt: apiData.createdAt,
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, savingsRes] = await Promise.all([
        api.get("/categories"),
        api.get("/savings"),
      ]);

      const mappedCategories = categoriesRes.data.map(mapApiToCardData);
      const mappedSavings = savingsRes.data.map(mapApiToSavingCardData);

      setCategories(mappedCategories);
      setSavings(mappedSavings);
      setError(null);
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to fetch data");
      console.error("Error fetching data:", err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({ categoryName: "", amount: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenSavingModal = () => setIsSavingModalOpen(true);
  const handleCloseSavingModal = () => {
    setIsSavingModalOpen(false);
    setSavingFormData({ title: "", amount: "", date: "" });
  };

  const handleSavingInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSavingFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSaving = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/savings", {
        title: savingFormData.title,
        amount: parseFloat(savingFormData.amount.replace(/[^0-9.]/g, "")),
        date: savingFormData.date,
      });

      const newSaving = mapApiToSavingCardData(response.data);
      setSavings((prev) => [newSaving, ...prev]);
      toast.success("Saving created successfully ✅");
      handleCloseSavingModal();
    } catch (err) {
      console.error("Error creating saving:", err);
      toast.error("Failed to create saving");
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post("/categories", {
        name: formData.categoryName,
        amount: parseFloat(formData.amount.replace(/[^0-9.]/g, "")),
      });

      const newCategory = mapApiToCardData(response.data);
      setCategories((prev) => [newCategory, ...prev]);
      toast.success("Category created successfully");
      handleCloseModal();
    } catch (err) {
      const error = err as AxiosError<ApiErrorResponse>;
      toast.error("Failed to create category");
      console.error("Error creating category:", err);
    }
  };

  return {
    categories,
    loading,
    error,
    isModalOpen,
    formData,
    handleOpenModal,
    handleCloseModal,
    handleInputChange,
    handleCreateCategory,
    PlusIcon,
    savings,
    isSavingModalOpen,
    savingFormData,
    handleOpenSavingModal,
    handleCloseSavingModal,
    handleSavingInputChange,
    handleCreateSaving,
    SavingIcon,
  };
};
