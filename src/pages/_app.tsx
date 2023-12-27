import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { StyledEngineProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <NotificationProvider> */}
      <StyledEngineProvider injectFirst>
        <ToastContainer />
        <Component {...pageProps} />
      </StyledEngineProvider>
      {/* </NotificationProvider> */}
    </>
  );
}
