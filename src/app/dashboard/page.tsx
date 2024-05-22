import Dashboard from "@/components/Dashboard";
import React from "react";
import { auth } from "../../../auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  // const session = await auth();
  // if (!session || !session.user) {
  //   redirect("/");
  // }
  return (
    <main className="container max-w-7xl  mx-auto">
      {/* <h1>hello</h1> */}
      <Dashboard />
    </main>
  );
};

export default DashboardPage;
