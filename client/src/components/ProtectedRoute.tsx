import useAuth from "@/hooks/useAuth";
import { CircularProgress, Grid } from "@mui/joy";
import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";
import { mainColors } from "@/config/colorScheme";

const ProtectedRoute = ({ role }: { role?: string }) => {
  const [accessToken, refreshToken, user, isLoading] = useAuth();
  const [isRoleChecked, setIsRoleChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user) {
      if (role && !user.sub.role.includes(role)) {
        navigate("/");
      } else {
        setIsRoleChecked(true);
      }
    }
  }, [isLoading, user, role]);

  if (!accessToken || !refreshToken) {
    return <Navigate to="/login" />;
  }

  if (isLoading || !isRoleChecked) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <CircularProgress
          determinate={false}
          size="lg"
          value={40}
          variant="plain"
          sx={{ color: mainColors.primary }}
        />
      </div>
    );
  }

  return (
    <>
      <Header />
      <Grid container height="100vh">
        <Grid xs={1.5}>
          <Menu />
        </Grid>
        <Grid xs={10.5}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
};

export default ProtectedRoute;
