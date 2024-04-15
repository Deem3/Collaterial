import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Router from "./Router.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssVarsProvider } from "@mui/joy";
import theme from "./config/theme.ts";
import { StyledEngineProvider } from "@mui/joy/styles";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <CssVarsProvider theme={theme}>
        <QueryClientProvider client={new QueryClient()}>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </QueryClientProvider>
      </CssVarsProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
