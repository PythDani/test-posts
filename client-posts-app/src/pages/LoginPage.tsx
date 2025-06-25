import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../services/auth";
import { useAuth } from "../context/AuthContext";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

type TokenPayload = {
  sub: number;
  username: string;
  iat: number;
  exp: number;
};

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { access_token } = await loginService(username, password);
      const decoded: TokenPayload = jwtDecode(access_token);
      const userId = decoded.sub;
      const res = await fetch(`http://localhost:3000/users/${userId}`);
      if (!res.ok) {
        throw new Error("No se pudo obtener el perfil");
      }
      const user = await res.json();

      login(user, access_token);
      await Swal.fire({
        icon: "success",
        title: "¡Bienvenido!",
        text: `Logeado como ${user.username}`,
        confirmButtonColor: "#488B75",
      });
      navigate("/posts");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error de conexión");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error}` || "Error de conexión",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.title}>Iniciar Sesión</h2>
        <input
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          style={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button style={styles.button} disabled={loading}>
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}

const styles: { [k: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f1f1f1",
    padding: "1rem",
    width: "100%",
  },
  form: {
    width: "100%",
    maxWidth: "400px",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    background: "#fff",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  title: {
    margin: "0 0 1rem",
    color: "#36607A",
    textAlign: "center",
  },
  input: {
    padding: "0.75rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  button: {
    padding: "0.75rem",
    fontSize: "1rem",
    background: "#488B75",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
