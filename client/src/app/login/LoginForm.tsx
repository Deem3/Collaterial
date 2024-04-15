import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  FormHelperText,
  FormLabel,
  Input,
  Stack,
  Typography,
} from "@mui/joy";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { mainColors } from "@/config/colorScheme";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (data: z.infer<typeof loginFormSchema>) => {
      return axios.post("/api/auth/login", data).then((res) => {
        localStorage.setItem("access-token", res.data.backendToken.accessToken);
        localStorage.setItem(
          "refresh-token",
          res.data.backendToken.refreshToken,
        );
        if (res.status === 201) {
          navigate("/");
        }
      });
    },
  });

  const loginFormSchema = z.object({
    username: z.string().min(4).max(10),
    password: z
      .string()
      .min(6)
      .max(20)
      .regex(/(?=.*[A-Z])(?=.*[a-z])/, {
        message:
          "Password must contain at least one uppercase and one lowercase letter",
      }),
  });

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
    loginMutation.mutate(data);
  };
  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <Stack mx={10} spacing={1}>
        <Controller
          control={control}
          name="username"
          render={({ field }) => (
            <>
              <FormLabel sx={{ fontSize: 15, color: "#FFFFFF" }}>
                Нэвтрэх нэр
              </FormLabel>
              <Input
                startDecorator={
                  <PersonOutlineOutlinedIcon
                    sx={{
                      color: "#fff",
                    }}
                  />
                }
                color="support"
                size="lg"
                type="text"
                {...field}
                autoComplete="off"
                placeholder="Enter Username"
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.username?.message}
              </FormHelperText>
            </>
          )}
        />
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <>
              <FormLabel sx={{ fontSize: 15, color: "#FFFFFF" }}>
                Нууц үг
              </FormLabel>
              <Input
                size="lg"
                color="support"
                startDecorator={
                  <HttpsOutlinedIcon
                    sx={{
                      color: "#fff",
                    }}
                  />
                }
                autoComplete="off"
                type="password"
                {...field}
                placeholder="Enter Password"
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.password?.message}
              </FormHelperText>
            </>
          )}
        />
        <Typography fontSize={15} textAlign="end" textColor="#fff">
          Нууц үг мартсан?
        </Typography>
        <Button
          style={{
            marginTop: 60,
            backgroundColor: mainColors.secondary,
            fontSize: 20,
            fontWeight: "bold",
            borderRadius: 35,
            boxShadow: "3px 4px 6px 50% rgba(0, 0, 0, 0.5)",
          }}
          type="submit"
        >
          Нэвтрэх
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
