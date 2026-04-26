import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post("http://127.0.0.1:5000/api/signup", form);

      alert("Signup successful");

      // ✅ Reset form (now will work because inputs are controlled)
      setForm({
        username: "",
        email: "",
        password: ""
      });

      // ✅ Redirect to login (better UX)
      navigate("/login");

    } catch (err) {
      console.log(err.response);
      alert(err.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          
          <input
            style={styles.input}
            value={form.username}   // ✅ CONTROLLED
            placeholder="Username"
            onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <input
            style={styles.input}
            value={form.email}      // ✅ CONTROLLED
            placeholder="Email"
            onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <input
            style={styles.input}
            value={form.password}   // ✅ CONTROLLED
            type="password"
            placeholder="Password"
            onChange={e => setForm({ ...form, password: e.target.value })}
          />

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}   {/* ✅ loading UI */}
          </button>

        </form>

        <p style={styles.footer}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>Login</Link>
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

export default Signup;