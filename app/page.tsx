import AuthForm from './components/AuthForm';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>PolAI - Sign In</title>
        <meta name="description" content="Discover your political leanings with PolAI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gradient-animation min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h1 className="mt-6 text-center text-4xl font-extrabold text-gray-900">Welcome to PolAI!</h1>
            <p className="mt-2 text-center text-base text-black">
              Your personal space to discover your political leanings, organize political thoughts, and access to different political ideas.
            </p>
          </div>
          <AuthForm />
        </div>
      </div>
    </>
  );
}


