import { type NextPage } from "next";
import Head from "next/head";
import { PeopleInput } from "../components";
import { ItemForm } from "../components/ItemForm";
import { PeopleProvider } from "../contexts/PeopleContext";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex flex-col self-start">
            <h1 className="m-0 text-5xl font-extrabold tracking-tight text-black sm:text-[5rem]">
              Separate
            </h1>
            <h2>the bill</h2>
          </div>
          <PeopleProvider>
            <PeopleInput />
            <ItemForm />
          </PeopleProvider>
        </div>
      </main>
    </>
  );
};

export default Home;
