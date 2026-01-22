// import { Routes, Route } from "react-router-dom";
// import HomePage from "./pages/home";
// import ContactPage from "./pages/contact";
// import WishListPage from "./pages/wishlist";
// import TransactionsPage from "./pages/dashboard/transaction";
// import CategoriesPage from "./pages/dashboard/category";
// import Profile from "./pages/dashboard/profile/Profile";
// import Auth from "./pages/auth";

import Index from "./pages/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useLoadUser, useAppSelector } from "./redux/useReduxHook";

const AppContent: React.FC = () => {
  useLoadUser();
  const { isInitialized } = useAppSelector((state) => state.auth);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black text-white">
        Loading...
      </div>
    );
  }

  return <Index />;
};

const App: React.FC = () => (
  // <Routes>
  //   <Route path="/home" element={<HomePage />} />
  //   {/* <Route path="/" element={<TransactionsPage />} /> */}
  //   <Route path="/*" element={<Auth />} />
  //   <Route path="/categories" element={<CategoriesPage />} />
  //   <Route path="/profile" element={<Profile />} />
  //   <Route path="/contact" element={<ContactPage />} />
  //   <Route path="/wishlist" element={<WishListPage />} />
  // </Routes>

  <>
    <Provider store={store}>
      <AppContent />
    </Provider>
  </>
);

export default App;
