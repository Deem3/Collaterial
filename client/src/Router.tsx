import { Routes, Route } from 'react-router-dom';
import LoginContainer from './app/login/LoginContainer';
import ProtectedRoute from './components/ProtectedRoute';
import HomeContainer from './app/Home/HomeContainer';
import CustomerContainer from './app/customer/CustomerContainer';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/customer" element={<CustomerContainer />} />
      </Route>
    </Routes>
  );
};

export default Router;
