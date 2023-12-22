import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/AuthContext";
import { NotificationProvider } from "@/context/NotificationContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      {/* <NotificationProvider> */}
        <StyledEngineProvider injectFirst>
          <ToastContainer />
          <Component {...pageProps} />
        </StyledEngineProvider>
      {/* </NotificationProvider> */}
    </AuthProvider>
  );
}
