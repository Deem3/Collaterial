import { Route, Routes } from 'react-router-dom';
import HomeContainer from './app/Home/HomeContainer';
import AssetContainer from './app/asset/AssetContainer';
import CollateralContainer from './app/collateral/CollateralContainer';
import CustomerContainer from './app/customer/CustomerContainer';
import LendContainer from './app/lend/LendContainer';
import LoginContainer from './app/login/LoginContainer';
import ReportContainer from './app/report/ReportContainer';
import ProtectedRoute from './components/ProtectedRoute';

const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginContainer />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeContainer />} />
        <Route path="/report" element={<ReportContainer />} />
      </Route>
      <Route element={<ProtectedRoute role="EMPLOYEE" />}>
        <Route path="/customer" element={<CustomerContainer />} />
        <Route path="/collateral" element={<CollateralContainer />} />
        <Route path="/lend" element={<LendContainer />} />
      </Route>
      <Route element={<ProtectedRoute role="MANAGER" />}>
        <Route path="/asset" element={<AssetContainer />} />
      </Route>
    </Routes>
  );
};

export default Router;
