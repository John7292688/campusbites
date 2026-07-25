import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

import {
  getAllMenuCategories,
} from "../../services/menuCategoryService";

import MenuCategoryDialog from "../../components/owner/MenuCategoryDialog";
import LocalOfferRoundedIcon from "@mui/icons-material/LocalOfferRounded";

const MenuCategories = () => {
  const [categories, setCategories] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getAllMenuCategories();
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>
            Menu Categories
          </h1>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Manage your Build Your Plate categories.
          </p>
        </div>

        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() => setOpenDialog(true)}
        >
          Add Category
        </Button>
      </div>

      {categories.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "100px",
            color: "#6b7280",
          }}
        >
          <h2>No categories yet</h2>

          <p>
            Click <strong>Add Category</strong> to create your
            first menu category.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "16px",
          }}
        >
          {categories.map((category) => (
            <div
                key={category.id}
                style={{
                background: "#fff",
                padding: "18px 24px",
                borderRadius: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",

                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                }}
            >
                <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontWeight: 600,
                    fontSize: "16px",
                }}
                >
                <LocalOfferRoundedIcon
                    sx={{
                    color: "#f59e0b",
                    }}
                />

                {category.name}
                </div>

                <div
                style={{
                    display: "flex",
                    gap: "10px",
                }}
                >
                <Button
                    variant="outlined"
                    size="small"
                >
                    Edit
                </Button>

                <Button
                    variant="contained"
                    color="error"
                    size="small"
                >
                    Delete
                </Button>
                </div>
            </div>
            ))}
        </div>
      )}

      <MenuCategoryDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        onCategoryCreated={fetchCategories}
      />
    </>
  );
};

export default MenuCategories;