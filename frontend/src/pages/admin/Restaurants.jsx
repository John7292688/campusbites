import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/adminRestaurants.css";

function Restaurants() {
  const navigate = useNavigate();
  const [restaurants, setRestaurants] =
    useState([]);

  const [searchTerm, setSearchTerm] =
    useState("");

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const filteredRestaurants =
  restaurants.filter((restaurant) =>
    restaurant.name
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
  );

  const fetchRestaurants = async () => {
    try {
      const token =
        localStorage.getItem("adminToken");

      const response = await axios.get(
        "${import.meta.env.VITE_API_URL}/api/admin/restaurants",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRestaurants(
        response.data.restaurants
      );
    } catch (error) {
      console.error(error);
    }
  };

const approveRestaurant = async (
  restaurantId
) => {
  const previousRestaurants =
    [...restaurants];

  setRestaurants((prev) =>
    prev.map((restaurant) =>
      restaurant.id === restaurantId
        ? {
            ...restaurant,
            status: "approved",
          }
        : restaurant
    )
  );

  try {
    const token =
      localStorage.getItem("adminToken");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${restaurantId}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    setRestaurants(
      previousRestaurants
    );
  }
};

const rejectRestaurant = async (
  restaurantId
) => {
  const previousRestaurants =
    [...restaurants];

  setRestaurants((prev) =>
    prev.map((restaurant) =>
      restaurant.id === restaurantId
        ? {
            ...restaurant,
            status: "rejected",
          }
        : restaurant
    )
  );

  try {
    const token =
      localStorage.getItem("adminToken");

    await axios.patch(
      `${import.meta.env.VITE_API_URL}/api/admin/restaurants/${restaurantId}/reject`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    setRestaurants(
      previousRestaurants
    );
  }
};

  return (
    <div
        style={{
        padding: "30px",
        background: "#F8FAFC",
        minHeight: "calc(100vh - 60px)"
        }}
    >
      <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "25px",
        }}
        >
        <div>
            <h1
            style={{
                margin: 0,
            }}
            >
            Restaurant Management
            </h1>

            <p
            style={{
                color: "#64748B",
                marginTop: "8px",
            }}
            >
            Manage restaurant approvals and status
            </p>
        </div>

        </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  }}
>
  {/* Total Restaurants */}
  <div
    style={{
      background: "#FFFFFF",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #E2E8F0",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#64748B",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      Total Restaurants
    </p>

    <h2
      style={{
        margin: "10px 0 0",
        fontSize: "36px",
        fontWeight: "700",
      }}
    >
      {restaurants.length}
    </h2>
  </div>

  {/* Active Restaurants */}
  <div
    style={{
      background: "#F0FDF4",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #BBF7D0",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#15803D",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      Active Restaurants
    </p>

    <h2
      style={{
        margin: "10px 0 0",
        fontSize: "36px",
        fontWeight: "700",
        color: "#15803D",
      }}
    >
      {
        restaurants.filter(
          (r) => r.status === "approved"
        ).length
      }
    </h2>
  </div>

  {/* Pending Reviews */}
  <div
    style={{
      background: "#FEFCE8",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #FDE68A",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#CA8A04",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      Pending Reviews
    </p>

    <h2
      style={{
        margin: "10px 0 0",
        fontSize: "36px",
        fontWeight: "700",
        color: "#CA8A04",
      }}
    >
      {
        restaurants.filter(
          (r) => r.status === "pending"
        ).length
      }
    </h2>
  </div>

  {/* Suspended Restaurants */}
  <div
    style={{
      background: "#FFF7ED",
      padding: "24px",
      borderRadius: "16px",
      border: "1px solid #FDBA74",
    }}
  >
    <p
      style={{
        margin: 0,
        color: "#EA580C",
        fontWeight: "600",
        fontSize: "14px",
      }}
    >
      Suspended Restaurants
    </p>

    <h2
      style={{
        margin: "10px 0 0",
        fontSize: "36px",
        fontWeight: "700",
        color: "#EA580C",
      }}
    >
      {
        restaurants.filter(
          (r) => r.status === "suspended"
        ).length
      }
    </h2>
  </div>
</div>

<div
  style={{
    marginBottom: "20px",
  }}
>
  <div className="restaurants-search-row">
    <input
      type="text"
      placeholder="Search restaurants..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{
        flex: 1,
        padding: "14px 16px",
        border: "1px solid #CBD5E1",
        borderRadius: "12px",
        fontSize: "15px",
      }}
    />


    <span
      style={{
        color: "#64748B",
        fontWeight: "600",
        whiteSpace: "nowrap",
      }}
    >
      {filteredRestaurants.length} Restaurants
    </span>
  </div>
</div>


      <div
        className="restaurants-table-wrapper"
        style={{
          background: "#fff",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
        }}
      >
        <table
          className="restaurants-table"
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
              <th style={{ padding: "18px", textAlign: "left" }}>
                Logo
              </th>

              <th style={{ padding: "18px", textAlign: "left" }}>
                Restaurant
              </th>

              <th style={{ padding: "18px", textAlign: "left" }}>
                Status
              </th>

              <th style={{ padding: "18px", textAlign: "left" }}>
                View Details
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredRestaurants.map((restaurant) => (
              <tr
                key={restaurant.id}
                onClick={() =>
                  navigate(
                    `/admin/restaurants/${restaurant.id}`
                  )
                }
                style={{
                  borderTop: "1px solid #E5E7EB",
                  cursor: "pointer",
                }}
              >
                <td style={{ padding: "18px" }}>
                  <img
                    src={restaurant.logo_url}
                    alt={restaurant.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #E2E8F0",
                    }}
                  />
                </td>

                <td style={{ padding: "18px" }}>
                  <div>
                    <div
                      style={{
                        fontWeight: "700",
                        fontSize: "18px",
                      }}
                    >
                      {restaurant.name}
                    </div>

                    <div
                      style={{
                        color: "#64748B",
                        fontSize: "14px",
                      }}
                    >
                      {restaurant.location}
                    </div>
                  </div>
                </td>

                <td style={{ padding: "18px" }}>
                  <span
                    style={{
                      padding: "6px 12px",
                      borderRadius: "999px",
                      fontWeight: "600",
                      background:
                        restaurant.status === "approved"
                          ? "#DCFCE7"
                          : restaurant.status === "rejected"
                          ? "#FEE2E2"
                          : restaurant.status === "suspended"
                          ? "#FEF3C7"
                          : "#E0F2FE",
                      color:
                        restaurant.status === "approved"
                          ? "#15803D"
                          : restaurant.status === "rejected"
                          ? "#DC2626"
                          : restaurant.status === "suspended"
                          ? "#D97706"
                          : "#0284C7",
                    }}
                  >
                    {restaurant.status}
                  </span>
                </td>

                <td style={{ padding: "18px" }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/admin/restaurants/${restaurant.id}`
                      );
                    }}
                    style={{
                      background: "#EFF6FF",
                      color: "#2563EB",
                      border: "1px solid #BFDBFE",
                      padding: "10px 16px",
                      borderRadius: "8px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Restaurants;