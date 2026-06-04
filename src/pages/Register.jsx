import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../register.css";

function Register() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [terms, setTerms] = useState(false);

  const [alert, setAlert] = useState({ message: "", type: "" });

  const showAlert = (message, type) => {
    setAlert({ message, type });

};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    return setAlert({
      message: "Passwords do not match",
      type: "danger",
    });
  }

  if (!terms) {
    return setAlert({
      message: "You must agree to terms",
      type: "danger",
    });
  }

  try {
    const res = await axios.post(
      "http://localhost/STUDENT_PORTAL/api/register.php",
      {
        fullname,
        email,
        password,
      }
    );

    const data = res.data;

    if (data.message) {
      setAlert({
        message: data.message,
        type: "success",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } else {
      setAlert({
        message: data.error || "Registration failed",
        type: "danger",
      });
    }
  } catch (err) {
    console.error(err);

    setAlert({
      message: "Server error (check PHP/XAMPP)",
      type: "danger",
    });
  }
};
  return (
    <>
      {/* NAVBAR */}
      <nav className="cvsu-navbar">
        <div className="navbar-left">
          <img src="/logo.jpg" alt="CvSU Logo" />
          <div className="navbar-text">
            <h2>CvSU-TANZA</h2>
            <span>STUDENT PORTAL</span>
          </div>
        </div>
      </nav>

      {/* FORM */}
      <div className="main-wrapper">
        <div className="glass-card">

          <h2 className="text-center mb-4">
            CREATE ACCOUNT
          </h2>

          {alert.message && (
            <div className={`alert alert-${alert.type}`}>
              {alert.message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* FULLNAME */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>

            {/* EMAIL */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="bi bi-shield-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            {/* TERMS */}
            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
              />
              <label className="form-check-label">
                I agree to Terms
              </label>
            </div>

            {/* BUTTON */}
            <button type="submit" className="btn btn-success w-100">
              SIGN UP
            </button>

          </form>

          <p className="text-center mt-3">
            Already have account? <Link to="/">Login</Link>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;