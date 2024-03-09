"use client";

import Header from "./components/Header";
import Table from "./components/Table";
import ZeroRequest from "./components/ZeroRequest";
import { usePayments } from "@/hooks/usePayments";

const Page = () => {
  const { data: payments, isLoading, error } = usePayments();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div>
      <Header />
      <div className="flex justify-center h-screen">
        {payments ? <Table rows={payments} /> : <ZeroRequest />}
      </div>
    </div>
  );
};

export default Page;
