import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      right: 0,
      padding: "1rem 2rem",
      display: "flex",
      gap: "1.5rem",
      zIndex: 300,
      fontFamily: "var(--mono)"
    }}>
      
      {!token ? (
        <>
          <Link to="/login" style={{ color: "#00f5a0", textDecoration: "none" }}>
            Login
          </Link>
          <Link to="/signup" style={{ color: "#00f5a0", textDecoration: "none" }}>
            Signup
          </Link>
        </>
      ) : (
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid #00f5a0",
            color: "#00f5a0",
            padding: "4px 10px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;