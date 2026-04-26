import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await axios.post(
        "http://127.0.0.1:5000/api/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login successful");
      navigate("/");

    } catch (err) {
      console.log(err.response);   // 🔍 DEBUG

      setError(err.response?.data?.error || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <form onSubmit={handleLogin} style={styles.form}>
          
          <input
            style={styles.input}
            value={form.email}   // ✅ controlled
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            style={styles.input}
            value={form.password}   // ✅ controlled
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* ✅ ERROR MESSAGE UI */}
        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.footer}>
          Don't have an account?{" "}
          <Link to="/signup" style={styles.link}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#060d0f"
  },
  card: {
    width: "320px",
    padding: "2rem",
    borderRadius: "12px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(0,245,160,0.2)",
    boxShadow: "0 0 20px rgba(0,245,160,0.1)",
    textAlign: "center"
  },
  title: {
    color: "#00f5a0",
    marginBottom: "1.5rem"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem"
  },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "transparent",
    color: "white",
    outline: "none"
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    background: "#00f5a0",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  },
  error: {
    marginTop: "10px",
    color: "red",
    fontSize: "13px"
  },
  footer: {
    marginTop: "1rem",
    fontSize: "14px",
    color: "#aaa"
  },
  link: {
    color: "#00f5a0",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Login;