"use client";

import React, { useEffect } from "react";
import { useSession , signIn , signOut} from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login"); 
    }
  }, [session, status, router]);

  if (status === "loading") return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to your Dashboard</h1>
      <p className="text-gray-700">You're logged in as: <strong>{session?.user?.email}</strong></p>
    </div>
  );
};

export default Dashboard;
