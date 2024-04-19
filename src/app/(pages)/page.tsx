"use client";
import { Button } from "antd/lib";
import api from "@/app/services/clientApi";

export default function Page() {
  const handleClick = async () => {
    const res = await api.http.post("/", { body: {} });
  };

  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div>
        <Button onClick={handleClick}>click me!</Button>
      </div>
    </main>
  );
}
