import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../grades.css";

function Grades() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [semester, setSemester] = useState("2nd");
  const [gpa, setGpa] = useState("0.00");

  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ SIDEBAR TOGGLE (FIXED)
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // GET GRADES
  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost/STUDENT_PORTAL/api/get_grades.php?student_id=${user.id}&semester=${semester}`
    )
      .then((res) => res.json())
      .then((data) => setGrades(data))
      .catch((err) => console.log(err));
  }, [semester, user]);

  // GET GPA
  useEffect(() => {
    if (!user?.id) return;

    fetch(
      `http://localhost/STUDENT_PORTAL/api/get_gpa.php?student_id=${user.id}&semester=${semester}`
    )
      .then((res) => res.json())
      .then((data) => setGpa(data.gpa))
      .catch((err) => console.log(err));
  }, [semester, user]);

  return (
    <div className="main-container">

      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <button id="menuBtn" onClick={toggleSidebar}>
          <i className="bi bi-list"></i>
        </button>
        <h5>CvSU Student Portal</h5>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "show-sidebar" : ""}`} id="sidebar">

        <div>

          <div className="logo-box">
            <img src="/logo.jpg" alt="logo" />
            <div className="portal-text">
              <h6>CvSU TANZA</h6>
              <p>STUDENT PORTAL</p>
            </div>
          </div>

          <div className="line"></div>

          {/* BACK */}
          <Link to="/landing" className="back-btn">
            <i className="bi bi-arrow-left"></i>
          </Link>

          {/* MENU */}
          <ul className="menu">

            <li>
              <Link to="/dashboard">
                <i className="bi bi-grid"></i> Dashboard
              </Link>
            </li>

            <li>
              <Link to="/profile">
                <i className="bi bi-person"></i> Profile
              </Link>
            </li>

            <li>
              <Link to="/grades" className="active">
                <i className="bi bi-journal-bookmark"></i> Grades
              </Link>
            </li>

            <li>
              <Link to="/schedule">
                <i className="bi bi-calendar-week"></i> Schedule
              </Link>
            </li>

            <li>
              <Link to="/course">
                <i className="bi bi-book"></i> Course
              </Link>
            </li>

            <li>
              <Link to="/enrollment">
                <i className="bi bi-file-earmark-check"></i> Enrollment
              </Link>
            </li>

          </ul>

        </div>

        {/* LOGOUT (FIXED - NO PAGE RELOAD) */}
        <div className="logout">
          <Link
            to="/"
            onClick={() => localStorage.removeItem("user")}
          >
            <i className="bi bi-box-arrow-right"></i>
            LOGOUT
          </Link>
        </div>

      </div>

      {/* CONTENT */}
      <div className="content">

        <div className="grades-card">

          {/* HEADER */}
          <div className="grades-header">
            <h3>GRADES</h3>

            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="form-select"
            >
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>
          </div>

          {/* TABLE */}
          <div className="table-responsive">
            <table className="table grades-table">
              <thead>
                <tr>
                  <th>CODE</th>
                  <th>NAME</th>
                  <th>UNITS</th>
                  <th>GRADE</th>
                </tr>
              </thead>

              <tbody>
                {grades.length > 0 ? (
                  grades.map((g, i) => (
                    <tr key={i}>
                      <td>{g.subject_code}</td>
                      <td>{g.subject_name}</td>
                      <td>{g.units}</td>
                      <td>{g.grade}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: "center" }}>
                      No grades found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* GPA */}
          <div className="gwa-box">
            <span>GPA</span>
            <div className="gwa-value">{gpa}</div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Grades;