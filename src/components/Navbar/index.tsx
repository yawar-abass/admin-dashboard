import Link from "next/link";
import React from "react";
import { auth, signIn, signOut } from "../../../auth";

async function Navbar() {
  const session = await auth();
  return (
    <header className=" py-4   md:py-6  bg-gray-50">
      <div className="container px-4 mx-auto sm:px-6 lg:px-24">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">
              OpenLibrary
            </Link>
          </div>
          <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
            <div className="ml-auto">
              {session && session.user ? (
                <div className="flex gap-2 items-center">
                  <p className="text-black font-semibold text-sm">
                    {session.user.name}
                  </p>
                  <form
                    action={async () => {
                      "use server";
                      await signOut();
                    }}
                  >
                    <button
                      className="inline-flex items-center justify-center px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                      role="button"
                      type="submit"
                    >
                      Logout
                    </button>
                  </form>
                </div>
              ) : (
                <form
                  action={async () => {
                    "use server";
                    await signIn("", { redirectTo: "/dashboard" });
                  }}
                >
                  <button
                    className="inline-flex items-center justify-center px-5 py-2 text-base font-bold leading-7 text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-600 font-pj focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    role="button"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Hambergur mobile menu  */}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
