import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "@next/font/google";

import "../styles/globals.css";
import { ThemeProvider } from "@contexts/ThemeContext";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={inter.className}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};

export default MyApp;
