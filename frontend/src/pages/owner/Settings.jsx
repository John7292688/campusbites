import { toast } from "react-toastify";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Divider,
  Switch,
  FormControlLabel,
} from "@mui/material";

import {
  getProfile,
  updateProfile,
  changePassword,
  toggleRestaurantStatus,
} from "../../services/restaurantOwnerService";

const Settings = () => {
  const [profile, setProfile] =
    useState({
      full_name: "",
      email: "",
      phone: "",
    });

  const [passwordData, setPasswordData] =
  useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });  

  const [showPasswords, setShowPasswords] =
  useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [loading, setLoading] =
    useState(true);

  const [isOpen, setIsOpen] =
    useState(true);  

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response =
        await getProfile();

      setProfile({
        full_name:
          response.owner.full_name || "",
        email:
          response.owner.email || "",
        phone:
          response.owner.phone || "",
      });
      setIsOpen(
        response.restaurant?.is_open ??
            true
        );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (
    e
  ) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
        ...passwordData,
        [e.target.name]: e.target.value,
    });
    };

    const togglePasswordVisibility = (
    field
    ) => {
    setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
    }));
    };

    const handleUpdatePassword =
  async () => {
    try {
      if (
        passwordData.newPassword !==
        passwordData.confirmPassword
      ) {
        toast.error(
        "New passwords do not match"
        );
        return;
      }

      await changePassword({
        currentPassword:
          passwordData.currentPassword,
        newPassword:
          passwordData.newPassword,
      });

      toast.success(
        "Password updated successfully"
        );

      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
            "Failed to update password"
        );
    }
  };

  const handleSaveProfile =
    async () => {
      try {
        await updateProfile(profile);

        toast.success(
        "Profile updated successfully"
        );
      } catch (error) {
        console.error(error);
        toast.error(
        "Failed to update profile"
        );
      }
    };

   const handleToggleRestaurantStatus =
    async (event) => {
        const newStatus =
        event.target.checked;

        // Update UI immediately
        setIsOpen(newStatus);

        try {
        await toggleRestaurantStatus(
            newStatus
        );

        toast.success(
            newStatus
            ? "Restaurant opened"
            : "Restaurant closed"
        );
        } catch (error) {
        console.error(error);

        // Revert if API fails
        setIsOpen(!newStatus);

        toast.error(
            "Failed to update restaurant status"
        );
        }
    };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="settings-page">
      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        Settings
      </h1>

      <Paper
        className="settings-paper"
        sx={{
          borderRadius: 3,
        }}
      >
        <h2>
          Profile Information
        </h2>

        <TextField
          fullWidth
          label="Full Name"
          name="full_name"
          value={profile.full_name}
          onChange={
            handleProfileChange
          }
          margin="normal"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={profile.email}
          onChange={
            handleProfileChange
          }
          margin="normal"
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={profile.phone}
          onChange={
            handleProfileChange
          }
          margin="normal"
        />

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={
            handleSaveProfile
          }
        >
          Save Changes
        </Button>

        <Divider sx={{ my: 4 }} />

        <h2>Restaurant Availability</h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 600,
                color: isOpen ? "#16a34a" : "#dc2626",
              }}
            >
              {isOpen
                ? "🟢 Restaurant Open"
                : "🔴 Restaurant Closed"}
            </div>

            <small
              style={{
                color: "#6b7280",
              }}
            >
              {isOpen
                ? "Accepting orders"
                : "Not accepting orders"}
            </small>
          </div>

          <Switch
            checked={isOpen}
            onChange={handleToggleRestaurantStatus}
          />
        </div>

        <Divider sx={{ my: 4 }} />

        <Divider sx={{ my: 4 }} />

            <h2>Security</h2>

            <TextField
            fullWidth
            type={
                showPasswords.current
                ? "text"
                : "password"
            }
            label="Current Password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
            margin="normal"
            slotProps={{
                input: {
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() =>
                        togglePasswordVisibility(
                            "current"
                        )
                        }
                        edge="end"
                    >
                        {showPasswords.current ? (
                        <VisibilityOff />
                        ) : (
                        <Visibility />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                },
            }}
            />

            <TextField
            fullWidth
            type={
                showPasswords.new
                ? "text"
                : "password"
            }
            label="New Password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
            margin="normal"
            slotProps={{
                input: {
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() =>
                        togglePasswordVisibility(
                            "new"
                        )
                        }
                        edge="end"
                    >
                        {showPasswords.new ? (
                        <VisibilityOff />
                        ) : (
                        <Visibility />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                },
            }}
            />

            <TextField
            fullWidth
            type={
                showPasswords.confirm
                ? "text"
                : "password"
            }
            label="Confirm New Password"
            name="confirmPassword"
            value={passwordData.confirmPassword}
            onChange={handlePasswordChange}
            margin="normal"
            slotProps={{
                input: {
                endAdornment: (
                    <InputAdornment position="end">
                    <IconButton
                        onClick={() =>
                        togglePasswordVisibility(
                            "confirm"
                        )
                        }
                        edge="end"
                    >
                        {showPasswords.confirm ? (
                        <VisibilityOff />
                        ) : (
                        <Visibility />
                        )}
                    </IconButton>
                    </InputAdornment>
                ),
                },
            }}
            />

            <Button
            variant="contained"
            color="warning"
            sx={{ mt: 2 }}
            onClick={handleUpdatePassword}
            >
            Update Password
            </Button>
      </Paper>
    </div>
  );
};

export default Settings;