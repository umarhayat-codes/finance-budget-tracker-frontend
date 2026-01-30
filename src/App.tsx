import Index from "./pages/Routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useLoadUser, useAppSelector } from "./redux/useReduxHook";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  <>
    <Provider store={store}>
      <AppContent />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  </>
);

export default App;
