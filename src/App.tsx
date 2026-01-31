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
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#050505] font-poppins px-4">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
          <div
            className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col items-center">
          {/* Main Loader Container */}
          <div className="relative flex items-center justify-center">
            {/* Outer Spinning Ring */}
            <div className="w-24 h-24 border-2 border-primary/10 rounded-full"></div>
            <div className="absolute w-24 h-24 border-t-2 border-primary rounded-full animate-spin"></div>

            {/* Inner Pulsing Circle */}
            <div className="absolute w-16 h-16 bg-primary/10 rounded-full animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-primary rounded-full shadow-[0_0_20px_rgba(140,255,46,0.3)]"></div>
            </div>

            {/* Orbiting Dot */}
            <div className="absolute w-24 h-24 animate-[spin_3s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_10px_rgba(140,255,46,0.5)]"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="mt-12 flex flex-col items-center text-center">
            <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
              Finance <span className="text-primary">Tracker</span>
            </h1>
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm font-medium">
                Initializing secure connection
              </span>
              <div className="flex gap-1">
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1 h-1 bg-primary rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        </div>
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
