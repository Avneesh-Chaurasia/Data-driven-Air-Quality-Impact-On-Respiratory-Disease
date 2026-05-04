import { Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "./logo";

function Navbar() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    firstName: localStorage.getItem("firstName"),
    lastName: localStorage.getItem("lastName"),
    email: localStorage.getItem("email")
  });

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Sync localStorage
  useEffect(() => {
    const updateUser = () => {
      setToken(localStorage.getItem("token"));
      setUser({
        username: localStorage.getItem("username"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email")
      });
    };

    window.addEventListener("storage", updateUser);
    updateUser();

    return () => window.removeEventListener("storage", updateUser);
  }, []);

  // ✅ Handle AIRTRACK click
  const handleLogoClick = (e) => {
    e.preventDefault();

    if (location.pathname === "/") {
      // Already on home → scroll to first section
      const section = document.getElementById("slide-1");
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Navigate to home first
      navigate("/");
      setTimeout(() => {
        const section = document.getElementById("slide-1");
        section?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  // ✅ Display name
  const displayName = user.firstName
    ? `${user.firstName} ${user.lastName || ""}`.trim()
    : user.username || "U";

  return (
    <div style={styles.navbar}>
      
      {/* 🔥 UPDATED LOGO */}
      <Link to="/" onClick={handleLogoClick} style={styles.logo}>
        AIR<span style={styles.highlight}>TRACK</span>
      </Link>
      
      {/* RIGHT SIDE */}
      <div style={styles.wrapper}>
        {!token ? (
          <>
            <Link to="/login" style={styles.button}>Login</Link>
            <Link to="/signup" style={styles.button}>Signup</Link>
          </>
        ) : (
          <Logo username={displayName} email={user.email} />
        )}
      </div>

    </div>
  );
}

const styles = {
  navbar: {
    position: "fixed",
    top: "10px",
    left: "20px",
    right: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 500
  },

  logo: {
    fontSize: "20px",
    fontWeight: "bold",
    textDecoration: "none",
    color: "#e2e8f0",
    cursor: "pointer"
  },

  highlight: {
    color: "#00f5a0"
  },

  wrapper: {
    display: "flex",
    gap: "1rem"
  },

  button: {
    padding: "6px 14px",
    background: "#00f5a0",
    color: "#000",
    borderRadius: "6px",
    textDecoration: "none"
  }
};

export default Navbar;