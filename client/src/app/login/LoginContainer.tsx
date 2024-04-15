import { mainColors } from "@/config/colorScheme";
import { Grid, Typography, colors } from "@mui/joy";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <Grid container height="100vh">
      <Grid
        xs={8}
        display="flex"
        bgcolor={colors.grey[100]}
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          fontSize={40}
          fontWeight="bold"
          textColor={mainColors.primary}
          textAlign="center"
          sx={{
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.25);",
          }}
        >
          Барьцаа хөрөнгө
          <br />
          бүртгэлийн
          <br />
          программ
        </Typography>
      </Grid>
      <Grid
        xs={4}
        bgcolor={mainColors.primary}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <LoginForm />
      </Grid>
    </Grid>
  );
};

export default LoginContainer;
