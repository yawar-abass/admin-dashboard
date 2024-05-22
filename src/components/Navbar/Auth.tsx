"use server";
import React from "react";
import { auth, signIn, signOut } from "../../../auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const Auth = async () => {
  const session = await auth();
  return (
    <div className="hidden lg:ml-auto lg:flex lg:items-center lg:space-x-10">
      <div className="ml-auto">
        {session && session.user ? (
          <div className="flex gap-2 items-center">
            <p className="text-white font-semibold text-sm">
              {session.user.name}
            </p>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <button
                className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
        ) : (
          <form
            action={async () => {
              revalidatePath("/api/auth/signin/");
              ("use server");
              await signIn("credentials", { redirectTo: "/dashboard" });
            }}
          >
            <button
              className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-white/20"
              type="submit"
            >
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
