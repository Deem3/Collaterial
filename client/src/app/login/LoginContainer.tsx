import InvertedLShape from "@/components/ui/InvertedLShape";
import { Box } from "@mui/joy";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <Box position="relative" bgcolor="#1F41A9" width="100%" height="100vh">
      <div className="absolute left-[-24rem] top-[-24rem] rounded-[50%] rotate-90 w-[48rem] h-[38rem] bg-[#264ECA]"></div>
      <div className="absolute left-[50rem] top-[20rem]">
        <InvertedLShape width="460px" height="570px" z={2} />
      </div>
      <div className="absolute left-[-15rem] bottom-[-4rem] bg-[#274FC7] w-[23rem] h-[29rem] rounded-[50%]"></div>
      <Box
        height="100vh"
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          zIndex={1}
          display="flex"
          height="45%"
          width="30%"
          bgcolor="rgba(88, 130, 193, 0.3)"
          borderRadius="40px"
          border="solid 2px rgba(88, 130, 193, 0.6)"
          justifyContent="center"
          alignItems="center"
        >
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default LoginContainer;
