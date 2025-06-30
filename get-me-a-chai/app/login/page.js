"use client";

import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaGoogle, FaFacebook, FaApple, FaGithub } from "react-icons/fa";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user?.email) {
      router.replace("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Welcome to GetMeAChai
        </h2>
        <p className="text-center text-sm text-gray-500">
          Login or Sign Up to get your fans to support you
        </p>

        <div className="space-y-3">
          <button
            onClick={() => signIn("apple", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 text-white bg-black hover:bg-gray-800 px-4 py-2 rounded"
          >
            <FaApple /> Continue with Apple
          </button>
          <button
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            <FaGoogle /> Continue with Google
          </button>
          <button
            onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            <FaFacebook /> Continue with Facebook
          </button>
          <button
            onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
            className="w-full flex items-center justify-center gap-2 text-white bg-gray-800 hover:bg-gray-900 px-4 py-2 rounded"
          >
            <FaGithub /> Continue with GitHub
          </button>
        </div>

        <div className="text-center text-sm text-gray-400 pt-4">
          By continuing, you agree to our Terms and Privacy Policy.
        </div>
      </div>
    </div>
  );
}
