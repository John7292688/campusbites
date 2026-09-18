import "../../styles/adminSettings.css";

function Settings() {
  return (
    <div className="admin-settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>
          Manage CampusBites platform settings.
        </p>
      </div>

      <div className="settings-grid">

        <div className="settings-card">
          <h3>Platform</h3>
          <p>CampusBites</p>
        </div>

        <div className="settings-card">
          <h3>Currency</h3>
          <p>Nigerian Naira (₦)</p>
        </div>

        <div className="settings-card">
          <h3>Frontend</h3>
          <p>Vercel Deployment</p>
        </div>

        <div className="settings-card">
          <h3>Backend</h3>
          <p>Render Deployment</p>
        </div>

        <div className="settings-card">
          <h3>Students</h3>
          <p>Manage student accounts</p>
        </div>

        <div className="settings-card">
          <h3>Restaurants</h3>
          <p>Manage restaurant accounts</p>
        </div>

      </div>
    </div>
  );
}

export default Settings;