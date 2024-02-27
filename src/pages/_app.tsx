import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";
import { CurrencyProvider } from "@/context/CurrencyContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <ToastContainer />
        <AuthProvider>
          <NotificationProvider>
            <CurrencyProvider>
              <Component {...pageProps} />
            </CurrencyProvider>
          </NotificationProvider>
        </AuthProvider>
      </StyledEngineProvider>
    </>
  );
}
