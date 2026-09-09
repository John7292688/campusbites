import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "../../styles/packageCategories.css";
import "react-toastify/dist/ReactToastify.css";

function PackageCategories() {
  const [categories, setCategories] =
    useState([]);

  const [name, setName] = useState("");  

  const [editingCategory, setEditingCategory] =
    useState(null);

  const [editName, setEditName] =
    useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/package-categories"
      );

      setCategories(
        response.data.categories
      );
    } catch (error) {
      console.error(error);
    }
  };

  const createCategory = async () => {
  if (!name.trim()) return;

  const tempCategory = {
    id: Date.now(),
    name: name.trim(),
  };

  const oldCategories = [...categories];

  // Show immediately
  setCategories((prev) => [
    ...prev,
    tempCategory,
  ]);

  const categoryName = name;

  setName("");

  toast.success(
      "Category added successfully!"
    );

  try {
    const response = await axios.post(
      "${import.meta.env.VITE_API_URL}/api/package-categories",
      {
        name: categoryName,
      }
    );

    const realCategory =
      response.data.category;

    // Replace temporary category with real one
    setCategories((prev) =>
      prev.map((category) =>
        category.id === tempCategory.id
          ? realCategory
          : category
      )
    );

  } catch (error) {
    console.error(error);

    // Roll back if failed
    setCategories(oldCategories);

    toast.error(
      "Failed to create category"
    );
  }
};

const deleteCategory = async (id) => {
  const oldCategories = [...categories];

  setCategories((prev) =>
    prev.filter(
      (category) => category.id !== id
    )
  );

  try {
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/api/package-categories/${id}`
    );

    toast.success(
      "Category deleted successfully"
    );
  } catch (error) {
    setCategories(oldCategories);

    toast.error(
      "Delete failed. Changes restored."
    );
  }
};

const editCategory = (category) => {
  setEditingCategory(category);
  setEditName(category.name);
};

const saveCategoryEdit = async () => {
  if (!editName.trim()) return;

  const oldCategories = [...categories];

  setCategories(
    categories.map((category) =>
      category.id === editingCategory.id
        ? {
            ...category,
            name: editName,
          }
        : category
    )
  );

  setEditingCategory(null);

  toast.success(
      "Category updated successfully"
    );

  try {
    await axios.put(
      `${import.meta.env.VITE_API_URL}/api/package-categories/${editingCategory.id}`,
      {
        name: editName,
      }
    );

    
  } catch (error) {
    setCategories(oldCategories);

    toast.error(
      "Update failed. Changes reverted."
    );
  }
};

return (
  <div className="package-categories-page">
    {/* Header */}
    <div
      style={{
        marginBottom: "30px",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        Package Categories
      </h1>

      <p
        style={{
          color: "#64748B",
          marginTop: "8px",
          fontSize: "16px",
        }}
      >
        Create and manage package categories for restaurants.
      </p>
    </div>

    {/* Add Category Card */}
    <div
      style={{
        background: "#fff",
        padding: "24px",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginTop: 0,
          marginBottom: "20px",
        }}
      >
        Add New Category
      </h2>

      <div className="category-form-row">
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          style={{
            flex: 1,
            padding: "14px",
            border: "1px solid #CBD5E1",
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <button
          onClick={createCategory}
          style={{
            background: "#2563EB",
            color: "#fff",
            border: "none",
            padding: "14px 24px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Add Category
        </button>
      </div>
    </div>

    {/* Categories Table */}
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        border: "1px solid #E2E8F0",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          padding: "24px",
          borderBottom: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Categories
        </h2>

        <span
          style={{
            background: "#EFF6FF",
            color: "#2563EB",
            padding: "6px 12px",
            borderRadius: "999px",
            fontWeight: "600",
          }}
        >
          {categories.length} Total
        </span>
      </div>

      <div className="categories-table-wrapper">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
        <thead>
          <tr
            style={{
              background: "#F8FAFC",
            }}
          >
            <th
              style={{
                padding: "18px",
                textAlign: "left",
                color: "#475569",
              }}
            >
              Category Name
            </th>

            <th
              style={{
                padding: "18px",
                textAlign: "left",
                color: "#475569",
              }}
            >
              Status
            </th>

            <th
              style={{
                padding: "18px",
                textAlign: "left",
                color: "#475569",
              }}
            >
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background =
                  "#F8FAFC")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  "#FFFFFF")
              }
              style={{
                borderTop: "1px solid #E2E8F0",
                transition: "0.2s",
              }}
            >
              <td
                style={{
                  padding: "18px",
                  fontWeight: "600",
                }}
              >
                {category.name}
              </td>

              <td
                style={{
                  padding: "18px",
                }}
              >
                <span
                  style={{
                    background: "#DCFCE7",
                    color: "#15803D",
                    padding: "6px 12px",
                    borderRadius: "999px",
                    fontWeight: "600",
                    fontSize: "14px",
                  }}
                >
                  Active
                </span>
              </td>

              <td
                style={{
                  padding: "18px",
                }}
              >
                <div className="category-actions">
                  <button
                    onClick={() =>
                      editCategory(category)
                    }
                    onMouseEnter={(e) =>
                      (e.target.style.background =
                        "#1D4ED8")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background =
                        "#2563EB")
                    }
                    style={{
                      background: "#2563EB",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "0.2s",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => {
                      const confirmed =
                        window.confirm(
                          `Delete "${category.name}"?`
                        );

                      if (confirmed) {
                        deleteCategory(category.id);
                      }
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.background =
                        "#DC2626")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.background =
                        "#EF4444")
                    }
                    style={{
                      background: "#EF4444",
                      color: "#fff",
                      border: "none",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontWeight: "600",
                      transition: "0.2s",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      {categories.length === 0 && (
        <div
          style={{
            padding: "40px",
            textAlign: "center",
            color: "#64748B",
          }}
        >
          No categories found.
        </div>
      )}

      
    </div>

    {editingCategory && (
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.5)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 999,
        }}
      >
        <div
          style={{
            background: "#fff",
            padding: "30px",
            borderRadius: "16px",
            width: "90%",
            maxWidth: "450px",
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.15)",
          }}
        >
          <h2>Edit Category</h2>

          <input
            type="text"
            value={editName}
            onChange={(e) =>
              setEditName(e.target.value)
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "10px",
              marginBottom: "20px",
              border: "1px solid #CBD5E1",
              borderRadius: "8px",
              boxSizing: "border-box",
            }}
          />

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              onClick={() =>
                setEditingCategory(null)
              }
              style={{
                background: "#E2E8F0",
                color: "#334155",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Cancel
            </button>

            <button
              onClick={saveCategoryEdit}
              style={{
                background: "#2563EB",
                color: "#fff",
                border: "none",
                padding: "10px 18px",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "600",
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )}

    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
    />
  </div>
  
);
}



export default PackageCategories;