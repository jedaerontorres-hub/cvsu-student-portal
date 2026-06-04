import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loginContainer = document.querySelector(".login-container");
    if (loginContainer) {
      loginContainer.style.opacity = "1";
    }
  }, []);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(
      "http://localhost/STUDENT_PORTAL/api/login.php",
      {
        email,
        password,
      }
    );

    const data = res.data;

    if (data.message) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      navigate("/landing");
    } else {
      alert(data.error || "Invalid email or password");
    }
  } catch (error) {
    console.error(error);
    alert("Server error (check API / XAMPP)");
  }
};

  return (
    <>
      <nav className="cvsu-navbar">
        <div className="navbar-left">
          <img src="/logo.jpg" alt="CvSU Logo"/>
          <div className="navbar-text">
            <h2>CvSU-TANZA</h2>
            <span>STUDENT PORTAL</span>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="login-container">
          <div className="left-panel">
            <div className="logo-card">
              <img src="/logo.jpg" alt="CvSU Logo" />
            </div>
          </div>

          <div className="right-panel">
            <h1>STUDENT LOGIN</h1>

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label>Email Address</label>

                <div className="input-box">
                  <i className="bi bi-envelope"></i>

                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="input-group">
                <label>Password</label>

                <div className="input-box">
                  <i className="bi bi-lock"></i>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-login">
                LOGIN
              </button>

              <div className="signup">
                Don't have an account?{" "}
                <a href="/register">SIGN UP</a>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;