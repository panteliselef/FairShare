import { type NextPage } from "next";
import Head from "next/head";
import clx from "classnames";

import { ItemForm, PeopleInput, ThemeSwitch, TableResults } from "@components/index";
import { FormProvider } from "@contexts/Form";
import { PeopleProvider } from "@contexts/PeopleContext";
import { useTheme } from "@contexts/ThemeContext";

const Home: NextPage = () => {
  const { theme } = useTheme();

  return (
    <div className={clx({ dark: theme === "dark" })}>
      <Head>
        <title>Fair Share | Bill Calculator</title>
        <meta name="description" content="Split the bill between friends with ease." />
        <meta name="keywords" content="calculator, bill, receipt, split, cut, share" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-white dark:bg-black">
        <div className="container flex max-w-2xl flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex w-full items-center justify-between">
            <h1 className="m-0 text-5xl font-extrabold tracking-tight text-black dark:text-white sm:text-[5rem]">
              Fair
              <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Share
              </span>
            </h1>
            <ThemeSwitch />
          </div>
          <PeopleProvider>
            <FormProvider>
              <PeopleInput />
              <ItemForm />
              <TableResults />
            </FormProvider>
          </PeopleProvider>
        </div>
      </main>
    </div>
  );
};

export default Home;
