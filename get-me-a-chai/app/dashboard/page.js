"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const [razorpayKeyId, setRazorpayKeyId] = useState("");
  const [razorpayKeySecret, setRazorpayKeySecret] = useState("");

  useEffect(() => {
    if (!session && status !== "loading") {
      router.push("/login");
    } else if (session) {
      setName(session.user.name || "");
      setUsername(session.user.name?.toLowerCase().replace(/\s+/g, "") || "");
      setProfilePic(session.user.image || "");
    }
  }, [session, status, router]);

  const handleSave = () => {
    const data = {
      name,
      email: session.user.email,
      username,
      profilePic,
      coverPic,
      razorpayKeyId,
      razorpayKeySecret,
    };

    console.log("Saving user data:", data);

    // API call goes here
    // fetch('/api/saveUserSettings', { method: 'POST', body: JSON.stringify(data) });
  };

  if (status === "loading") return null;

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Dashboard</h1>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            value={session.user.email}
            disabled
            className="w-full border px-4 py-2 rounded-md bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="Unique username"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Profile Picture URL</label>
          <input
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Cover Picture URL</label>
          <input
            value={coverPic}
            onChange={(e) => setCoverPic(e.target.value)}
            className="w-full border px-4 py-2 rounded-md"
            placeholder="https://..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Razorpay Key ID</label>
            <input
              value={razorpayKeyId}
              onChange={(e) => setRazorpayKeyId(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              placeholder="rzp_test_..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Razorpay Key Secret</label>
            <input
              value={razorpayKeySecret}
              onChange={(e) => setRazorpayKeySecret(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
              placeholder="your-secret"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="mt-6 w-full text-yellow-400 border border-yellow-400 hover:text-white hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
