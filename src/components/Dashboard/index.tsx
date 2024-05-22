import React from "react";
import EnhancedTable from "./Table";
import { getBooks } from "@/lib/getData";

const Dashboard = async () => {
  const data = await getBooks(1, 100);

  return (
    <div className="pt-12">
      <EnhancedTable data={data} />
    </div>
  );
};

export default Dashboard;
