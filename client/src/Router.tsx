import { Routes, Route } from "react-router-dom";
import LoginContainer from "./app/login/LoginContainer";
import ProtectedRoute from "./components/ProtectedRoute";

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/customer" element={<div>Home</div>} />
      </Route>
    </Routes>
  );
};

export default Router;
