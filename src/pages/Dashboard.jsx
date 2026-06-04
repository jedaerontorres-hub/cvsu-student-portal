import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ⭐ NEW: GPA STATE
  const [gpa, setGpa] = useState("0.00");

  // LOGIN CHECK
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
    } else {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);

      // ⭐ FETCH GPA
      if (parsed?.id) {
        fetch(
          `http://localhost/STUDENT_PORTAL/api/get_gpa.php?student_id=${parsed.id}&semester=2nd`
        )
          .then((res) => res.json())
          .then((data) => {
            setGpa(data.gpa || "0.00");
          })
          .catch((err) => console.log(err));
      }
    }
  }, [navigate]);

  // SIDEBAR TOGGLE
  const toggleSidebar = () => {
    document.getElementById("sidebar").classList.toggle("show-sidebar");
  };

  // OUTSIDE CLICK CLOSE
  useEffect(() => {
    const handleClick = (e) => {
      const sidebar = document.getElementById("sidebar");
      const menuBtn = document.getElementById("menuBtn");

      if (
        sidebar &&
        menuBtn &&
        !sidebar.contains(e.target) &&
        !menuBtn.contains(e.target)
      ) {
        sidebar.classList.remove("show-sidebar");
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

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
      <div className="sidebar" id="sidebar">

        <div>
          <div className="logo-box">
            <img src="/logo.jpg" alt="logo" />

            <div className="portal-text">
              <h6>CvSU TANZA</h6>
              <p>STUDENT PORTAL</p>
            </div>
          </div>

          <div className="line"></div>

          <a href="/landing" className="back-btn">
            <i className="bi bi-arrow-left"></i>
          </a>

          <ul className="menu">
            <li>
              <Link to="/dashboard" className="active">
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

        <div className="logout">
          <a href="/">
            <i className="bi bi-box-arrow-right"></i>
            LOGOUT
          </a>
        </div>

      </div>

      {/* CONTENT */}
      <div className="content">

      <div className="topbar">
        <div className="welcome">
          <p className="small-text">Welcome back,</p>
          <h2 className="name-text">{user?.fullname}</h2>
          <span>Bachelor of Science in Information Technology</span>
        </div>
      </div>
        <div className="row g-4 mt-1">

          {/* ENROLLED UNITS */}
          <div className="col-lg-4 col-md-6">
            <div className="info-card card1">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h6>ENROLLED UNITS</h6>
                  <h2>24</h2>
                  <small>Units</small>
                </div>
                <div className="info-icon">
                  <i className="bi bi-mortarboard-fill"></i>
                </div>
              </div>
            </div>
          </div>

          {/* CURRENT SEMESTER */}
          <div className="col-lg-4 col-md-6">
            <div className="info-card card2">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h6>CURRENT SEMESTER</h6>
                  <h4>2nd Semester</h4>
                  <small>A.Y 2025-2026</small>
                </div>
                <div className="info-icon">
                  <i className="bi bi-calendar-check-fill"></i>
                </div>
              </div>
            </div>
          </div>

          {/* ⭐ GPA (NOW DYNAMIC) */}
          <div className="col-lg-4 col-md-12">
            <div className="info-card card3">
              <div className="d-flex justify-content-between align-items-center w-100">
                <div>
                  <h6>GPA</h6>
                  <h2>{gpa}</h2>
                  <small>Auto Computed</small>
                </div>
                <div className="info-icon">
                  <i className="bi bi-award-fill"></i>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* REST OF YOUR DESIGN (UNCHANGED) */}
        <div className="row mt-4 align-items-stretch">
          <div className="col-lg-8">
            <div className="content-box">
              <div className="box-header">
                <h5>MONDAY CLASSES</h5>
                <span className="view">TODAY'S SCHEDULE</span>
              </div>

              <div className="class-item">
                <div className="time-box">7:00 AM <br /> 9:00 AM</div>
                <div>
                  <strong>ITEC 101 - HUMAN COMPUTER INTERACTION</strong>
                  <p>Room: COMLAB 2</p>
                </div>
              </div>

              <div className="class-item">
                <div className="time-box">10:00 AM <br /> 12:00 PM</div>
                <div>
                  <strong>DCIT 26 - Application Development</strong>
                  <p>Room: COMLAB 3</p>
                </div>
              </div>

              <div className="class-item">
                <div className="time-box">1:00 PM <br /> 3:00 PM</div>
                <div>
                  <strong>ITEC 100 - Human Computer Interaction</strong>
                  <p>Room: COMLAB 1</p>
                </div>
              </div>

              <div className="class-item">
                <div className="time-box">4:00 PM <br /> 6:00 PM</div>
                <div>
                  <strong>ITEC 106 - IT ELECTIVE 2 - Web System and Technologies</strong>
                  <p>Room: COMLAB 4</p>
                </div>
              </div>
            </div>
          </div>

          {/* MY CLASSES */}
          <div className="col-lg-4">
            <div className="content-box my-classes-box">

              <div className="box-header">
                <h5>MY COURSE</h5>
              </div>

              <div className="subjects-container">

                <div className="subject-card itec">DCIT 26</div>
                <div className="subject-card dcit">GNED 08</div>
                <div className="subject-card pf">GNED 09</div>
                <div className="subject-card web">ITEC 100</div>
                <div className="subject-card ia">ITEC 101</div>
                <div className="subject-card net">ITEC 105</div>
                <div className="subject-card pe">ITEC 106</div>

              </div>

            </div>
          </div>

        </div>

        {/* ANNOUNCEMENTS */}
        <div className="content-box">
          <div className="box-header">
            <h5>LATEST ANNOUNCEMENTS</h5>

          </div>

          <div className="announcement-scroll">
            <div className="announce-item">
              <div className="announce-icon">
                <i className="bi bi-megaphone-fill"></i>
              </div>
              <div>
                <strong>Enrollment for 2nd Semester</strong>
                <p>May 23, 2026</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;