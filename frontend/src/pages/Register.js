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
          Already have an account? <Link to="/">Login</Link>
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
    background: "#28a745",
    color: "#fff",
    border: "none",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
  },
  success: {
    color: "green",
    fontSize: "14px",
  },
};
