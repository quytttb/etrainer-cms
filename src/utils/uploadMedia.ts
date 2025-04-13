import { RcFile } from "antd/es/upload";
import axios from "axios";

const uploadMedia = async (file: RcFile) => {
  let resourceType = "image";
  if (file.type.startsWith("audio/") || file.type.startsWith("video/")) {
    resourceType = "video";
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_PRESET);

  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/${resourceType}/upload`,
    formData
  );

  return data.secure_url;
};

export default uploadMedia;
