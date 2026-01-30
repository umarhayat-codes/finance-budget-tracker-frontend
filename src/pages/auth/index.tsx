import { Routes, Route } from "react-router-dom";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Auth: React.FC = () => (
  <Routes>
    <Route path="signup" element={<SignUp />} />
    <Route path="signin" element={<SignIn />} />
  </Routes>
);

export default Auth;
