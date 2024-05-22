import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <main className="container max-w-7xl  mx-auto">{children}</main>;
};

export default DashboardLayout;
