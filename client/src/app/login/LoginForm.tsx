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
    username: z
      .string()
      .min(4, { message: "Username must be greater than 4" })
      .max(10, { message: "Username must not be greater than 10" }),
    password: z
      .string()
      .min(6, {
        message: "Password must be greater than 6",
      })
      .max(20, {
        message: "Password must not be greater than 20",
      })
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
    const username = data.username.toLowerCase();
    loginMutation.mutate({
      username,
      password: data.password,
    });
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
                color="neutral"
                size="lg"
                type="text"
                {...field}
                placeholder="Username"
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
                color="neutral"
                type="password"
                {...field}
                placeholder="Password"
              />
              <FormHelperText style={{ color: "red" }}>
                {errors.password?.message}
              </FormHelperText>
            </>
          )}
        />
        <Typography
          fontSize={15}
          paddingBottom={3}
          textAlign="start"
          textColor="#fff"
        >
          Нууц үг мартсан?
        </Typography>
        <Button
          sx={{
            backgroundColor: "#003465",
          }}
          type="submit"
          color="neutral"
        >
          Нэвтрэх
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
