import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd/lib";
import type { GetProp, UploadFile, UploadProps } from "antd/lib";
import UploadController from "@/utils/hooks/useForm/UploadController";
import { FieldValues } from "react-hook-form";
import { ImageUploadPayload } from "@/types/globalTypes";
type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const imageListHydration = async (
  imageList: UploadFile[],
): Promise<ImageUploadPayload[]> => {
  const nextImages = [];

  for (let { size, name, type, originFileObj } of imageList) {
    const base64 = await getBase64(originFileObj as FileType);
    nextImages.push({ size, name, type, base64 });
  }

  return nextImages;
};

const ImageUploadInput: React.FC<FieldValues> = ({ control, name, rules }) => {
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Add Image</div>
    </button>
  );
  return (
    <>
      <UploadController control={control} name={name} rules={rules}>
        <Upload listType="picture-card" onPreview={handlePreview}>
          {uploadButton}
        </Upload>
      </UploadController>
      {previewImage && (
        <Image
          alt={"image"}
          wrapperStyle={{ display: "none" }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default ImageUploadInput;
