import { type AppType } from "next/dist/shared/lib/utils";
import { Inter } from "@next/font/google";

import "../styles/globals.css";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  style: "normal",
  subsets: ["latin"],
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
};

export default MyApp;
