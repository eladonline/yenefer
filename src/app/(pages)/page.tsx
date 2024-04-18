"use client";
import { Button, type GetProp, type UploadFile, UploadProps } from "antd/lib";
import api from "@/app/services/clientApi";
import ImageUploadInput from "@/app/components/Inputs/Upload";
import { useState } from "react";

export default function Page() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleClick = async () => {
    const res = await api.http.get("/", {});
    console.log(res);
  };

  console.log(fileList);
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <div>
        <ImageUploadInput
          fileList={fileList}
          setFileList={({ fileList }) => setFileList(fileList)}
        />
        <Button onClick={handleClick}>click me!</Button>
      </div>
    </main>
  );
}
