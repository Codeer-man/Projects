import React from "react";
import RaftarNav from "../components/raftar/navbar";
import Center from "../components/raftar/center";

export default function RaftarPage() {
  return (
    <div className="h-[100vh] w-full bg-[#f5e2e2] relative">
      <RaftarNav />
      <Center />
    </div>
  );
}
