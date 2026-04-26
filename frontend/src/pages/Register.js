import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";


export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // validation
    if (!form.email || !form.password) {
      return setError("All fields are required");
    }

    if (form.password.length < 6) {
      return setError("Password must be at least 6 characters");
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      setSuccess("Registration successful! You can login now.");

      setTimeout(() => {
        navigate("/");
      }, 1500);

    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.card}>
        <h2>Register</h2>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

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
          {loading ? "Registering..." : "Register"}
        </button>

        <p>
          Already have an account? <Link to="/" style={{ color: "#60a5fa", textDecoration: "none" }}>Login</Link>
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
    background: "#1f2937", // dark card
    borderRadius: "12px",
    width: "320px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    textAlign: "center",
  },
  title: {
    marginBottom: "20px",
    color: "#f5f6f8",
    fontSize: "24px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "12px",
    margin: "10px 0",
    borderRadius: "8px",
    border: "1px solid #dce8fb",
    background: "#dbe5f9",
    color: "#02213f",
    outline: "none",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    marginTop: "10px",
    background: "linear-gradient(135deg, #2230c5, #1635a3)",
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
  success: {
    color: "#4ade80",
    fontSize: "13px",
    marginBottom: "10px",
  },
  link: {
    marginTop: "15px",
    fontSize: "14px",
    color: "#9ca3af",
  },
};

