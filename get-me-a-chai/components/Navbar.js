"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-zinc-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          href={session ? "/dashboard" : "/"}
          className="font-bold text-2xl tracking-wide text-yellow-400 flex items-center gap-2"
        >
          GetMeAChai
          <Image
            src="/Hot Beverage.gif"
            alt="chai gif"
            width={35}
            height={35}
            unoptimized
          />
        </Link>

        {/* Right section */}
        <div className="flex items-center gap-4 relative" ref={dropdownRef}>
          {/* Login / Logout Button */}
          {status !== "loading" && (
            <button
              onClick={() => {
                session
                  ? signOut({ callbackUrl: "/login" })
                  : signIn(undefined, { callbackUrl: "/dashboard" });
              }}
              className="text-yellow-400 border border-yellow-400 hover:text-white hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              {session ? "Logout" : "Login"}
            </button>
          )}

          {/* Dropdown for signed-in users */}
          {session && (
            <>
              <button
                type="button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="text-yellow-400 border border-yellow-400 hover:text-white hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
              >
                Menu
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-14 right-0 z-10 bg-white rounded-lg shadow w-44 text-sm text-gray-800">
                  <ul className="py-2">
                    <li>
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 hover:bg-yellow-100"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 hover:bg-yellow-100"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/your-page"
                        className="block px-4 py-2 hover:bg-yellow-100"
                      >
                        Your Page
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          signOut({ callbackUrl: "/login" });
                        }}
                        className="w-full text-left px-4 py-2 hover:bg-yellow-100 text-red-600"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
