import { useRef, useState } from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import { uploadImage } from "../services/uploadService";

const ImageUploader = ({
  label,
  folder,
  value,
  onUpload,
}) => {
  const [uploading, setUploading] = useState(false);

  const inputRef = useRef(null);

  const handleSelect = () => {
    inputRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl = await uploadImage(
        file,
        folder
      );

      onUpload(imageUrl);
    } catch (error) {
      console.error(error);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <label
        style={{
          display: "block",
          fontWeight: 600,
          marginBottom: "12px",
        }}
      >
        {label}
      </label>

      <div
        onClick={handleSelect}
        style={{
          cursor: "pointer",
          border: "2px dashed #d1d5db",
          borderRadius: "16px",
          padding: "30px",
          textAlign: "center",
          background: "#fafafa",
        }}
      >
        {value ? (
          <>
            <img
              src={value}
              alt={label}
              style={{
                width: "100%",
                maxHeight: "220px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "15px",
              }}
            />

            <strong>
              Click to Change Image
            </strong>
          </>
        ) : (
          <>
            <CloudUploadRoundedIcon
              sx={{
                fontSize: 60,
                color: "#F97316",
              }}
            />

            <h3>
              Click to Upload
            </h3>

            <p>
              PNG, JPG or WEBP
            </p>
          </>
        )}

        {uploading && (
          <p
            style={{
              marginTop: "15px",
              color: "#F97316",
              fontWeight: "600",
            }}
          >
            Uploading...
          </p>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{
          display: "none",
        }}
        onChange={handleChange}
      />
    </div>
  );
};

export default ImageUploader;