import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../course.css";

function Course() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-container">

      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <button id="menuBtn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="bi bi-list"></i>
        </button>

        <h5>CvSU Student Portal</h5>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "show-sidebar" : ""}`} id="sidebar">

        <div>

          {/* LOGO */}
          <div className="logo-box">
            <img src="/logo.jpg" alt="CvSU Logo" />

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
              <Link to="/grades">
                <i className="bi bi-journal-bookmark"></i> Grades
              </Link>
            </li>

            <li>
              <Link to="/schedule">
                <i className="bi bi-calendar-week"></i> Schedule
              </Link>
            </li>

            <li>
              <Link to="/course" className="active">
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

        {/* LOGOUT */}
        <div className="logout">
          <Link to="/" onClick={() => localStorage.removeItem("user")}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </Link>
        </div>

      </div>

      {/* CONTENT */}
      <div className="content">
        {/* COURSE CARD */}
        <div className="course-card">

          <div className="card-header-custom">

            <h5>COURSE</h5>

            <select className="form-select semester-select">
              <option>2nd Semester A.Y. 2025-2026</option>
              <option>1st Semester A.Y. 2025-2026</option>
            </select>

          </div>

          {/* TABLE */}
          <div className="table-responsive">

            <table className="table course-table align-middle">

              <thead>
                <tr>
                  <th>COURSE CODE</th>
                  <th>COURSE NAME</th>
                  <th>UNITS</th>
                  <th>STATUS</th>
                </tr>
              </thead>

              <tbody>

                <tr>
                  <td>ITEC 100</td>
                  <td>Human Computer Interaction</td>
                  <td>3</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>ITEC 101</td>
                  <td>Integrative Programming</td>
                  <td>3</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>ITEC 105</td>
                  <td>Network Management</td>
                  <td>3</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>ITEC 106</td>
                  <td>IT ELECTIVE 2 - Web System and Technologies</td>
                  <td>3</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>DCIT 26</td>
                  <td>Application Development</td>
                  <td>3</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>GNED 08</td>
                  <td>Understanding the Self</td>
                  <td>2</td>
                  <td className="status">Enrolled</td>
                </tr>

                <tr>
                  <td>GNED 09</td>
                  <td>Rizal Life, Works and Writings</td>
                  <td>1</td>
                  <td className="status">Enrolled</td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* TOTAL UNITS */}
          <div className="total-units">

            <span>TOTAL UNITS</span>

            <div className="units-badge">
              18
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Course;