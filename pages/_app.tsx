import "../styles/globals.css";
import type { AppProps } from "next/app";
import ThemeContextProvider from "../contexts/ThemeContext";
import AuthContextProvider from "../contexts/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <ThemeContextProvider>
        <Component {...pageProps} />
      </ThemeContextProvider>
    </AuthContextProvider>

  );
}

export default MyApp;
