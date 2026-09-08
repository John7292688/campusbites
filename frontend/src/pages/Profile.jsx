import { useState } from "react";
import { toast } from "react-toastify";
import { updateProfile } from "../services/profileService";
import { changePassword } from "../services/changePasswordService";
import "../styles/profile.css";

function Profile() {
  const [student, setStudent] = useState(
    JSON.parse(
      localStorage.getItem("student")
    )
  );

  const [fullName, setFullName] =
    useState(student?.full_name || "");

  const [phone, setPhone] =
    useState(student?.phone || "");

  const [loading, setLoading] =
    useState(false);

  const [currentPassword, setCurrentPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [passwordLoading, setPasswordLoading] =
    useState(false);

  const handleUpdateProfile =
    async () => {
      try {
        setLoading(true);

        const data =
          await updateProfile(
            fullName,
            phone
          );

        localStorage.setItem(
          "student",
          JSON.stringify(data.student)
        );

        setStudent(data.student);

        toast.success(
          "Profile updated successfully"
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to update profile"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChangePassword =
    async () => {
      if (
        !currentPassword ||
        !newPassword ||
        !confirmPassword
      ) {
        toast.error(
          "Please fill all password fields"
        );
        return;
      }

      if (
        newPassword !== confirmPassword
      ) {
        toast.error(
          "Passwords do not match"
        );
        return;
      }

      try {
        setPasswordLoading(true);

        const data =
          await changePassword(
            currentPassword,
            newPassword
          );

        toast.success(
          data.message
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to change password"
        );
      } finally {
        setPasswordLoading(false);
      }
    };

return (
  <div className="profile-page">
    <h1 className="profile-title">
      My Profile
    </h1>

    {/* Profile Section */}

    <div className="profile-card">
      <h3>Profile Information</h3>

      <div className="form-group">
        <label>Full Name</label>

        <input
          type="text"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />
      </div>

      <div className="form-group">
        <label>Email</label>

        <input
          type="email"
          value={student?.email || ""}
          readOnly
          className="readonly-input"
        />
      </div>

      <div className="form-group">
        <label>Phone Number</label>

        <input
          type="text"
          value={phone}
          onChange={(e) =>
            setPhone(e.target.value)
          }
        />
      </div>

      <button
        className="primary-btn"
        onClick={handleUpdateProfile}
        disabled={loading}
      >
        {loading
          ? "Updating..."
          : "Update Profile"}
      </button>
    </div>

    {/* Password Section */}

    <div className="profile-card">
      <h3>Change Password</h3>

      <div className="form-group">
        <label>Current Password</label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>New Password</label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
        />
      </div>

      <div className="form-group">
        <label>Confirm Password</label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
        />
      </div>

      <button
        className="primary-btn"
        onClick={handleChangePassword}
        disabled={passwordLoading}
      >
        {passwordLoading
          ? "Updating..."
          : "Change Password"}
      </button>
    </div>
  </div>
);
}

export default Profile;