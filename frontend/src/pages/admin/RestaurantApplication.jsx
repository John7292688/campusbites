import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function RestaurantApplication() {
  const { id } = useParams();

  const [restaurant, setRestaurant] =
    useState(null);

  useEffect(() => {
    fetchRestaurant();
  }, []);

  const fetchRestaurant = async () => {
    try {
      const token =
        localStorage.getItem("adminToken");

      const response = await axios.get(
        `http://localhost:5000/api/admin/restaurants/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setRestaurant(
        response.data.restaurant
      );
    } catch (error) {
      console.error(error);
    }
  };

const approveRestaurant = async () => {
  const previousStatus =
    restaurant.status;

  setRestaurant((prev) => ({
    ...prev,
    status: "approved",
  }));

  try {
    const token =
      localStorage.getItem("adminToken");

    await axios.patch(
      `http://localhost:5000/api/admin/restaurants/${restaurant.id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    setRestaurant((prev) => ({
      ...prev,
      status: previousStatus,
    }));
  }
};

const suspendRestaurant = async () => {
  const previousStatus =
    restaurant.status;

  setRestaurant((prev) => ({
    ...prev,
    status: "suspended",
  }));

  try {
    const token =
      localStorage.getItem("adminToken");

    await axios.patch(
      `http://localhost:5000/api/admin/restaurants/${restaurant.id}/suspend`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    setRestaurant((prev) => ({
      ...prev,
      status: previousStatus,
    }));
  }
};

const rejectRestaurant = async () => {
    const confirmAction = window.confirm(
        "Are you sure you want to reject this restaurant?"
    );

    if (!confirmAction) return;

    try {
        await axios.put(
            `${API_URL}/admin/restaurants/${id}/reject`,
            {},
            authConfig()
        );

        fetchRestaurant();
    } catch (error) {
        console.error(error);
    }
};

const reactivateRestaurant = async () => {
  const previousStatus =
    restaurant.status;

  setRestaurant((prev) => ({
    ...prev,
    status: "approved",
  }));

  try {
    const token =
      localStorage.getItem("adminToken");

    await axios.patch(
      `http://localhost:5000/api/admin/restaurants/${restaurant.id}/reactivate`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error(error);

    setRestaurant((prev) => ({
      ...prev,
      status: previousStatus,
    }));
  }
};

  if (!restaurant) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <div
        style={{
            background: "#fff",
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow:
            "0 4px 20px rgba(0,0,0,0.08)",
            marginBottom: "25px",
        }}
        >
        {restaurant.image_url && (
            <img
            src={restaurant.image_url}
            alt={restaurant.name}
            style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
            }}
            />
        )}

        <div
            style={{
            padding: "25px",
            display: "flex",
            gap: "20px",
            alignItems: "center",
            }}
        >
            {restaurant.logo_url && (
            <img
                src={restaurant.logo_url}
                alt="logo"
                style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                objectFit: "cover",
                border:
                    "4px solid #fff",
                }}
            />
            )}

            <div>
            <h1
                style={{
                    margin: 0,
                    fontSize: "48px",
                    fontWeight: "700",
                    lineHeight: 1.1,
                }}
            >
                {restaurant.name}
            </h1>

            <p
                style={{
                    marginTop: "8px",
                    marginBottom: "12px",
                    color: "#64748B",
                    fontSize: "16px",
                }}
            >
                Owner: {restaurant.owner_name}
            </p>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontWeight: "600",
                        fontSize: "14px",
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

                <span
                    style={{
                        padding: "6px 14px",
                        borderRadius: "999px",
                        fontWeight: "600",
                        fontSize: "14px",
                        background: restaurant.is_open
                            ? "#DCFCE7"
                            : "#FEE2E2",
                        color: restaurant.is_open
                            ? "#15803D"
                            : "#DC2626",
                    }}
                >
                    {restaurant.is_open ? "Open" : "Closed"}
                </span>

                <div
                    style={{
                        background: "#F8FAFC",
                        border: "1px solid #E2E8F0",
                        borderRadius: "10px",
                        padding: "8px 14px",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    ID: #{restaurant.id}
                </div>

                <div
                    style={{
                        background: "#EFF6FF",
                        color: "#2563EB",
                        border: "1px solid #BFDBFE",
                        borderRadius: "10px",
                        padding: "8px 14px",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    Menu Items: {restaurant.menuItems?.length || 0}
                </div>

                <div
                    style={{
                        background: "#F0FDF4",
                        color: "#16A34A",
                        border: "1px solid #BBF7D0",
                        borderRadius: "10px",
                        padding: "8px 14px",
                        fontSize: "14px",
                        fontWeight: "600",
                    }}
                >
                    Packages: {restaurant.comboPackages?.length || 0}
                                        
                                    </div>
                                    <div
                        style={{
                            background: "#F8FAFC",
                            border: "1px solid #E2E8F0",
                            borderRadius: "10px",
                            padding: "8px 14px",
                            fontSize: "14px",
                            fontWeight: "600",
                        }}
                    >
                        Joined:{" "}
                        {new Date(restaurant.created_at).toLocaleDateString()}
                    </div>
            </div>
        </div>
        </div>
        </div>

      <hr style={{ margin: "20px 0" }} />

        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "24px",
                marginBottom: "30px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <h2
                style={{
                    marginTop: 0,
                    marginBottom: "20px",
                }}
            >
                Application Actions
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    flexWrap: "wrap",
                }}
            >
                {restaurant.status === "pending" && (
                    <>
                        <button
                            onClick={approveRestaurant}
                            style={{
                                background: "#16A34A",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                                boxShadow: "0 2px 8px rgba(22,163,74,0.15)",
                            }}
                        >
                            ✓ Approve Application
                        </button>

                        <button
                           
                            style={{
                                background: "#DC2626",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                                boxShadow: "0 2px 8px rgba(220,38,38,0.15)",
                            }}
                        >
                            ✕ Reject Application
                        </button>
                    </>
                )}

                {restaurant.status === "approved" && (
                    <>
                        <button
                            onClick={suspendRestaurant}
                            style={{
                                background: "#F59E0B",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                                boxShadow: "0 2px 8px rgba(245,158,11,0.15)",
                            }}
                        >
                            Suspend Restaurant
                        </button>
                    </>
                )}

                {restaurant.status === "rejected" && (
                    <button
                        onClick={approveRestaurant}
                        style={{
                            background: "#16A34A",
                            color: "#fff",
                            border: "none",
                            padding: "12px 20px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        Approve Application
                    </button>
                )}

                {restaurant.status === "suspended" && (
                    <>
                        <button
                            onClick={reactivateRestaurant}
                            style={{
                                background: "#2563EB",
                                color: "#fff",
                                border: "none",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                                boxShadow: "0 2px 8px rgba(37,99,235,0.15)",
                            }}
                        >
                            Reactivate Restaurant
                        </button>

                        <button
                            style={{
                                background: "#FFFFFF",
                                color: "#2563EB",
                                border: "1px solid #2563EB",
                                padding: "12px 20px",
                                borderRadius: "10px",
                                cursor: "pointer",
                                fontWeight: "600",
                            }}
                        >
                            View Owner Profile
                        </button>
                    </>
                )}
            </div>
        </div>
            

      <hr
        style={{
            margin: "30px 0",
        }}
        />

        <div
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "30px",
            marginTop: "20px",
            width: "100%",
        }}
        >
        {/* Restaurant Information */}
        <div
            style={{
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "42px",
            minHeight: "180px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <h2
            style={{
                marginTop: 0,
                marginBottom: "24px",
                fontSize: "32px",
            }}
            >
            Restaurant Information
            </h2>

            <div style={{ marginBottom: "16px" }}>
            <div
                style={{
                color: "#64748B",
                fontSize: "13px",
                marginBottom: "4px",
                }}
            >
                Description
            </div>

            <div
                style={{
                fontWeight: "600",
                }}
            >
                {restaurant.description}
            </div>
            </div>



            <div style={{ marginBottom: "18px" }}>
            <div
                style={{
                    color: "#64748B",
                    fontSize: "13px",
                    marginBottom: "4px",
                }}
            >
                Location
            </div>

            <div
                style={{
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                {restaurant.location}
            </div>
        </div>



            <div>
            <div
                style={{
                    color: "#64748B",
                    fontSize: "13px",
                    marginBottom: "4px",
                }}
            >
                Restaurant Phone
            </div>

            <div
                style={{
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                {restaurant.phone}
            </div>
        </div>
        </div>

        {/* Owner Information */}
        <div
            style={{
            border: "1px solid #E2E8F0",
            borderRadius: "16px",
            padding: "42px",
            minHeight: "180px",
            background: "#FFFFFF",
            boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <h2
            style={{
                marginTop: 0,
                marginBottom: "24px",
                fontSize: "32px",
            }}
            >
            Owner Information
            </h2>

            <div style={{ marginBottom: "18px" }}>
            <div
                style={{
                    color: "#64748B",
                    fontSize: "13px",
                    marginBottom: "4px",
                }}
            >
                Owner Name
            </div>

            <div
                style={{
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                {restaurant.owner_name}
            </div>
        </div>


            <div style={{ marginBottom: "18px" }}>
            <div
                style={{
                    color: "#64748B",
                    fontSize: "13px",
                    marginBottom: "4px",
                }}
            >
                Email Address
            </div>

            <div
                style={{
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                {restaurant.owner_email}
            </div>
        </div>



            <div>
            <div
                style={{
                    color: "#64748B",
                    fontSize: "13px",
                    marginBottom: "4px",
                }}
            >
                Phone Number
            </div>

            <div
                style={{
                    fontWeight: "600",
                    fontSize: "15px",
                }}
            >
                {restaurant.owner_phone}
            </div>
        </div>
        </div>
        </div>

        <hr
        style={{
            margin: "30px 0",
        }}
        />

        <div
            style={{
                background: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "16px",
                padding: "24px",
                marginTop: "30px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}
        >
            <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}
            >
            <h2 style={{ margin: 0 }}>Menu Items</h2>

            <span
                style={{
                background: "#EFF6FF",
                color: "#2563EB",
                padding: "8px 14px",
                borderRadius: "999px",
                fontWeight: "600",
                fontSize: "14px",
                }}
            >
                {restaurant.menuItems?.length || 0} Items
            </span>
            </div>

            {restaurant.menuItems.length === 0 ? (
            <p>No menu items added yet.</p>
            ) : (
            <table
                style={{
                    width: "100%",
                    borderCollapse: "collapse",
                }}
            >
                <thead>
                <tr>
                    <th
                        style={{
                            textAlign: "left",
                            padding: "14px",
                            background: "#F8FAFC",
                            color: "#475569",
                            fontWeight: "600",
                        }}
                    >
                        Name
                    </th>

                    <th
                        style={{
                            textAlign: "left",
                            padding: "14px",
                            background: "#F8FAFC",
                            color: "#475569",
                            fontWeight: "600",
                        }}
                    >
                        Price
                    </th>

                    <th
                        style={{
                            textAlign: "left",
                            padding: "14px",
                            background: "#F8FAFC",
                            color: "#475569",
                            fontWeight: "600",
                        }}
                    >
                        Unit
                    </th>
                </tr>
                </thead>

                <tbody>
                {restaurant.menuItems.map(
                    (item) => (
                    <tr
                        key={item.id}
                        style={{
                            borderBottom: "1px solid #F1F5F9",
                        }}
                    >
                        <td
                            style={{
                                padding: "14px",
                                borderBottom: "1px solid #F1F5F9",
                                fontWeight: "500",
                            }}
                        >
                            {item.name}
                        </td>

                        <td
                            style={{
                                padding: "14px",
                                borderBottom: "1px solid #F1F5F9",
                                color: "#0F172A",
                                fontWeight: "600",
                            }}
                        >
                            ₦{Number(item.price).toLocaleString()}
                        </td>

                        <td
                            style={{
                                padding: "14px",
                                borderBottom: "1px solid #F1F5F9",
                                color: "#64748B",
                            }}
                        >
                            {item.unit || "-"}
                        </td>
                    </tr>
                    )
                )}
                </tbody>
            </table>
            )}
        </div>

        
        <hr
        style={{
            margin: "30px 0",
        }}
        />

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
            }}
        >
            <h2 style={{ margin: 0 }}>
                Combo Packages
            </h2>

            <span
                style={{
                    background: "#F0FDF4",
                    color: "#16A34A",
                    padding: "8px 14px",
                    borderRadius: "999px",
                    fontWeight: "600",
                    fontSize: "14px",
                }}
            >
                {restaurant.comboPackages?.length || 0} Packages
            </span>
        </div>

        {restaurant.comboPackages.length === 0 ? (
        <p>No combo packages added yet.</p>
        ) : (
        <div
            style={{
            display: "grid",
            gap: "20px",
            }}
        >
            {restaurant.comboPackages.map(
            (pkg) => (
                <div
                    key={pkg.id}
                    style={{
                        border: "1px solid #E2E8F0",
                        borderRadius: "16px",
                        padding: "24px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "24px",
                        background: "#FFFFFF",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                        marginBottom: "20px",
                    }}
                >
                <div style={{ flex: 1 }}>
                    <h3>{pkg.name}</h3>

                    <p>{pkg.description}</p>

                    <p
                        style={{
                            fontSize: "20px",
                            fontWeight: "700",
                            color: "#F59E0B",
                            margin: "10px 0",
                        }}
                    >
                        ₦{pkg.price}
                    </p>

                    <p>
                    <strong>Includes:</strong> {pkg.items_included}
                    </p>
                </div>

                {pkg.image && (
                    <img
                    src={pkg.image}
                    alt={pkg.name}
                    width="250"
                    style={{
                        width: "220px",
                        height: "140px",
                        objectFit: "cover",
                        borderRadius: "12px",
                    }}
                    />
                )}
                </div>
            )
            )}
        </div>
        )}
    </div>
  );
}

export default RestaurantApplication;