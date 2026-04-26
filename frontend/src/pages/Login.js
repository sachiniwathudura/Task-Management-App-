import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // simple validation
    if (!form.email || !form.password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Login</h2>

        {error && <p style={styles.error}>{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        

          <p style={styles.link}>
            Don't have an account? <Link to="/register"style={{ color: "#60a5fa", textDecoration: "none" }}>Register</Link>
          </p>
        </form>
      </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #141e30, #243b55)",
    fontFamily: "Arial, sans-serif",
  },
  card: {
    padding: "35px",
    background: "#1f2937",
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  title: {
  marginBottom: "20px",
  color: "#f9fafb",   
  fontSize: "24px",
  fontWeight: "bold",
},
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #b6cff8",
    background: "#d7e1f5",
    color: "#022b54",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "linear-gradient(135deg, #2c2fca, #0d0690)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  error: {
    color: "#f87171",
    fontSize: "13px",
    marginBottom: "10px",
  },
  link: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#f1f4ea",
  },
};
