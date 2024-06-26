import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Image, Upload } from "antd/lib";
import type { GetProp, UploadFile, UploadProps } from "antd/lib";
import UploadController from "@/utils/hooks/useForm/UploadController";
import { FieldValues } from "react-hook-form";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const imageListToPayload = async (
  imageList: UploadFile[],
): Promise<UploadFile[]> => {
  const nextImages = [];

  for (let { size, name, type, originFileObj, uid } of imageList) {
    const base64 = await getBase64(originFileObj as FileType);
    nextImages.push({ size, name, type, thumbUrl: base64, uid });
  }

  return nextImages;
};

const ImageUploadInput: React.FC<FieldValues> = ({
  control,
  name,
  rules,
  ...props
}) => {
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
        <Upload listType="picture-card" onPreview={handlePreview} {...props}>
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
