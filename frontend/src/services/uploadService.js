import ownerApi from "./ownerApi";

export const uploadImage = async (
  file,
  folder
) => {
  const formData = new FormData();

  formData.append("image", file);
  formData.append("folder", folder);

  const response = await ownerApi.post(
    "/upload/image",
    formData,
    {
      headers: {
        "Content-Type":
          "multipart/form-data",
      },
    }
  );

  return response.data.imageUrl;
};