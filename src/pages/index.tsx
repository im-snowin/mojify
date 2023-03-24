import { SignInButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const session = useUser();
  const { data } = api.posts.getAll.useQuery();
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-900 text-white">
        {!session.isSignedIn ? (
          <SignInButton />
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Sign in as</h1>
            <p>{session?.user.username}</p>
            <ul>
              {data?.map((post) => (
                <li key={post.id}>{post.content}</li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </>
  );
};

export default Home;
