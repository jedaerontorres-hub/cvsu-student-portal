import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../profile.css";

function Profile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [editing, setEditing] = useState(false);

  const [student, setStudent] = useState({
    name: "",
    course: "",
    studentNumber: "",
    email: "",
    contact: "",
    address: "",
  });

  useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser?.email) return;

  fetch(
    `http://localhost/STUDENT_PORTAL/api/get_profile.php?email=${storedUser.email}`
  )
    .then((res) => res.json())
    .then((data) => {
      setStudent({
        name: data.fullname || "",
        course: data.course || "",
        studentNumber: data.student_number || "",
        email: data.email || "",
        contact: data.contact || "",
        address: data.address || "",
      });
    })
    .catch((err) => console.log(err));
}, []);

  const handleChange = (e) => {
  setStudent({
    ...student,
    [e.target.name]: e.target.value,
  });
};

  const handleSave = async () => {
  try {
    const res = await fetch(
      "http://localhost/STUDENT_PORTAL/api/update_profile.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname: student.name,
          course: student.course,
          student_number: student.studentNumber,
          email: student.email,
          contact: student.contact,
          address: student.address,
        }),
      }
    );

    const data = await res.json();

    if (data.message) {
      const currentUser =
        JSON.parse(localStorage.getItem("user")) || {};

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...currentUser,
          fullname: student.name,
          course: student.course,
          student_number: student.studentNumber,
          contact: student.contact,
          address: student.address,
        })
      );

      alert("Profile updated successfully!");
      setEditing(false);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

  return (
    <div>

      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <button id="menuBtn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="bi bi-list"></i>
        </button>
        <h5>CvSU Student Portal</h5>
      </div>

      <div className="main-container">

        {/* SIDEBAR (SAME STYLE AS DASHBOARD/LANDING) */}
        <div className={`sidebar ${sidebarOpen ? "show-sidebar" : ""}`}>

          <div>

            {/* LOGO */}
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
                <Link to="/profile" className="active">
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

          {/* LOGOUT */}
          <div className="logout">
            <Link to="/" onClick={() => localStorage.removeItem("user")}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </Link>
          </div>

        </div>

        {/* CONTENT */}
        <div className="content">
          {/* PROFILE CARD */}
          <div className="profile-card">

            <div className="profile-content">

              <p className="profile-label">PROFILE</p>

              <div className="profile-wrapper">

                {/* ICON */}
                <div className="profile-icon-box">
                  <i className="bi bi-person"></i>
                </div>

                {/* DETAILS */}
                <div className="profile-details">

                  <div className="profile-header">

                    <input
                      type="text"
                      name="name"
                      className="profile-name-input"
                      value={student.name}
                      onChange={handleChange}
                      disabled={!editing}
                    />

                    <p className="course-text">
                      {student.course || "Bachelor of Science in Information Technology"}
                    </p>

                  </div>

                  <div className="info-grid">

                    <strong>Student No.</strong>
                    <input
                      type="text"
                      name="studentNumber"
                      value={student.studentNumber}
                      onChange={handleChange}
                      disabled={!editing}
                    />

                    <strong>Email</strong>
                    <input
                      type="email"
                      name="email"
                      value={student.email}
                      onChange={handleChange}
                      disabled={!editing}
                    />

                    <strong>Contact</strong>
                    <input
                      type="text"
                      name="contact"
                      value={student.contact}
                      onChange={handleChange}
                      disabled={!editing}
                    />

                    <strong>Address</strong>
                    <input
                      type="text"
                      name="address"
                      value={student.address}
                      onChange={handleChange}
                      disabled={!editing}
                    />

                  </div>

                  {/* BUTTONS */}
                  <div className="profile-buttons">

                    {!editing ? (
                      <button
                        className="edit-btn"
                        onClick={() => setEditing(true)}
                      >
                        EDIT PROFILE
                      </button>
                    ) : (
                      <button
                        className="save-btn"
                        onClick={handleSave}
                      >
                        SAVE PROFILE
                      </button>
                    )}

                  </div>

                </div>

              </div>

            </div>

            <div className="profile-design"></div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Profile;