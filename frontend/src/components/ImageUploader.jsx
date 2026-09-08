import { useRef, useState } from "react";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";

import { uploadImage } from "../services/uploadService";

const ImageUploader = ({
  label,
  folder,
  value,
  onUpload,
}) => {
  const [uploading, setUploading] =
    useState(false);

  const inputRef = useRef(null);

  const handleSelect = () => {
    if (uploading) return;

    inputRef.current.click();
  };

  const handleChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const imageUrl =
        await uploadImage(
          file,
          folder
        );

      onUpload(imageUrl);

      toast.success(
        "Image uploaded successfully."
      );
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Image upload failed."
      );
    } finally {
      setUploading(false);

      // Reset input so same file can be selected again
      e.target.value = "";
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
          cursor: uploading
            ? "not-allowed"
            : "pointer",
          border:
            "2px dashed #d1d5db",
          borderRadius: "16px",
          padding: "30px",
          textAlign: "center",
          background: "#fafafa",
          position: "relative",
          opacity: uploading
            ? 0.75
            : 1,
          transition:
            "all 0.3s ease",
        }}
      >
        {/* Upload Overlay */}
        {uploading && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "rgba(255,255,255,0.85)",
              display: "flex",
              flexDirection:
                "column",
              justifyContent:
                "center",
              alignItems: "center",
              borderRadius: "16px",
              zIndex: 10,
              gap: "12px",
            }}
          >
            <CircularProgress />

            <p
              style={{
                margin: 0,
                fontWeight: "600",
                color: "#F97316",
              }}
            >
              Uploading Image...
            </p>
          </div>
        )}

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
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{
          display: "none",
        }}
        onChange={handleChange}
        disabled={uploading}
      />
    </div>
  );
};

export default ImageUploader;