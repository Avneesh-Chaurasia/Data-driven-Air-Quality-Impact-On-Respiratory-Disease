import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logo({ username }) {
  const [open, setOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [userData, setUserData] = useState({
    name: username || "User",
    email: ""
  });

  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  // ✅ Load latest data (after profile edit)
  useEffect(() => {
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    const email = localStorage.getItem("email");

    // If profile updated → show full name
    if (firstName) {
      setUserData({
        name: `${firstName} ${lastName || ""}`.trim(),
        email: email || ""
      });
    } else {
      // fallback → username (signup case)
      setUserData({
        name: username,
        email: email || ""
      });
    }
  }, [username]);

  const letter = userData.name ? userData.name.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleEnter = () => {
    clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  return (
    <div
      style={styles.wrapper}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Avatar */}
      <div style={styles.avatar}>{letter}</div>

      {/* Dropdown */}
      {open && (
        <div style={styles.dropdown}>

          {/* USER INFO */}
          <div style={styles.userInfo}>
            <div style={styles.userName}>{userData.name}</div>
            <div style={styles.userEmail}>
              {userData.email || "No email"}
            </div>
          </div>

          <div style={styles.divider}></div>

          {/* Logout */}
          <div
            style={{
              ...styles.menuItem,
              ...(hoveredItem === "logout" && styles.menuItemHover)
            }}
            onMouseEnter={() => setHoveredItem("logout")}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={handleLogout}
          >
            Logout
          </div>

        </div>
      )}
    </div>
  );
}

const styles = {
  wrapper: {
    position: "relative",
    display: "inline-block",
    paddingBottom: "10px"
  },

  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#00f5a0",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    fontSize: "18px",
    cursor: "pointer"
  },

  dropdown: {
    position: "absolute",
    top: "48px",
    right: "0",
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "6px",
    width: "240px",
    minWidth: "220px",
    boxShadow: "0 10px 20px rgba(0,0,0,0.4)",
    zIndex: 1000,
    overflow: "hidden"
  },

  userInfo: {
    padding: "10px",
    borderBottom: "1px solid #1e293b"
  },

  userName: {
    fontSize: "14px",
    fontWeight: "bold",
    color: "#e2e8f0"
  },

  userEmail: {
    fontSize: "12px",
    color: "#94a3b8",
    marginTop: "2px"
  },

  divider: {
    height: "1px",
    backgroundColor: "#1e293b"
  },

  menuItem: {
    padding: "10px",
    color: "#e2e8f0",
    cursor: "pointer",
    transition: "0.2s"
  },

  menuItemHover: {
    backgroundColor: "rgba(0, 245, 160, 0.15)",
    color: "#00f5a0"
  }
};

export default Logo;