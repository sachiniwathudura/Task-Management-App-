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

        <p>
          Don't have an account? <Link to="/register">Register</Link>
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
    background: "#f4f4f4",
  },
  card: {
    padding: "30px",
    background: "#fff",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
};
