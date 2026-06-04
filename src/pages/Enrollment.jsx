import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../enrollment.css";

function Enrollment() {
  const studentId = 1;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [modal, setModal] = useState({
    show: false,
    type: "",
  });

  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    subject_code: "",
    subject_name: "",
    units: 3,
  });

  // ✅ DEFAULT = 2ND SEMESTER
  const [semester, setSemester] = useState("2nd");

  const schoolYear = "2025-2026";

  const API = "http://localhost/STUDENT_PORTAL/api";

  // =========================
  // LOAD SUBJECTS
  // =========================
  const loadSubjects = async () => {
    try {
      const res = await axios.get(
        `${API}/get_enrollment.php?student_id=${studentId}&semester=${semester}`
      );
      setSubjects(res.data);
    } catch (err) {
      console.error("Load Subjects Error:", err);
    }
  };

  useEffect(() => {
    loadSubjects();
  }, [semester]);

  // =========================
  // ADD SUBJECT
  // =========================
  const addSubject = async () => {
    try {
      const res = await axios.post(
        `${API}/add_enrollment.php`,
        {
          student_id: studentId,
          subject_code: form.subject_code,
          subject_name: form.subject_name,
          units: form.units,
          semester: semester,
          school_year: schoolYear,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      alert(res.data.message);

      loadSubjects();

      setForm({
        subject_code: "",
        subject_name: "",
        units: 3,
      });

      setModal({ show: false, type: "" });
    } catch (err) {
      console.error(err);
      alert("Network Error or Server Down");
    }
  };

  // =========================
  // DROP SUBJECT
  // =========================
  const dropSubject = async (id) => {
    try {
      await axios.get(`${API}/delete_enrollment.php?id=${id}`);
      loadSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const totalUnits = subjects.reduce((sum, s) => sum + Number(s.units), 0);

  // =========================
  // PRINT
  // =========================
  const printForm = () => {
    const content = document.getElementById("print-area").innerHTML;
    const win = window.open("", "", "width=900,height=650");

    win.document.write(`
      <html>
        <head><title>Print COR</title></head>
        <body>${content}</body>
      </html>
    `);

    win.document.close();
    win.print();
  };

  // =========================
  // MODAL
  // =========================
  const openModal = (type) => {
    setModal({ show: true, type });
  };

  const renderModalContent = () => {
    switch (modal.type) {
      case "add":
        return (
          <div>
            <h5>Add Subject</h5>

            <input
              className="form-control mb-2"
              placeholder="Subject Code"
              value={form.subject_code}
              onChange={(e) =>
                setForm({ ...form, subject_code: e.target.value })
              }
            />

            <input
              className="form-control mb-2"
              placeholder="Subject Name"
              value={form.subject_name}
              onChange={(e) =>
                setForm({ ...form, subject_name: e.target.value })
              }
            />

            <input
              className="form-control mb-3"
              type="number"
              placeholder="Units"
              value={form.units}
              onChange={(e) =>
                setForm({ ...form, units: e.target.value })
              }
            />

            <button className="btn btn-success w-100" onClick={addSubject}>
              Save Subject
            </button>
          </div>
        );

      case "drop":
        return (
          <div>
            <h5>Drop Subject</h5>

            {subjects.map((s) => (
              <div
                key={s.id}
                className="d-flex justify-content-between border p-2 mb-2"
              >
                <span>
                  {s.subject_code} - {s.subject_name}
                </span>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dropSubject(s.id)}
                >
                  Drop
                </button>
              </div>
            ))}
          </div>
        );

      case "print":
        return (
          <div>
            <h5>Print Form</h5>
            <button className="btn btn-primary w-100" onClick={printForm}>
              Print
            </button>
          </div>
        );

      case "download":
        return (
          <div>
            <h5>Download COR</h5>
            <a
              className="btn btn-success w-100"
              href={`${API}/cor.php?student_id=${studentId}&semester=${semester}`}
              target="_blank"
              rel="noreferrer"
            >
              Download PDF
            </a>
          </div>
        );

      default:
        return null;
    }
  };

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
              <Link to="/course">
                <i className="bi bi-book"></i> Course
              </Link>
            </li>

            <li>
              <Link to="/enrollment" className="active">
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

        <h3>ENROLLMENT</h3>

        {/* SEMESTER WITH CHEVRON */}
        <div className="card-box mb-3">
          <h6>Semester</h6>

          <div className="input-group">
            <select
              className="form-control"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            >
              <option value="1st">1st Semester</option>
              <option value="2nd">2nd Semester</option>
            </select>

            <span className="input-group-text">
              <i className="bi bi-chevron-down"></i>
            </span>
          </div>
        </div>

        {/* SUMMARY */}
        <div className="card-box">
          <h5>Summary</h5>
          <table className="table">
            <tbody>
              <tr>
                <td>Total Units</td>
                <td className="text-end">{totalUnits}</td>
              </tr>
              <tr>
                <td>Remaining</td>
                <td className="text-end">{24 - totalUnits}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ACTIONS */}
        <div className="row g-3 mb-4">

          <div className="col">
            <div className="action-card add" onClick={() => openModal("add")}>
              <i className="bi bi-plus-circle"></i>
              <h6>Add</h6>
            </div>
          </div>

          <div className="col">
            <div className="action-card drop" onClick={() => openModal("drop")}>
              <i className="bi bi-dash-circle"></i>
              <h6>Drop</h6>
            </div>
          </div>

          <div className="col">
            <div className="action-card print" onClick={() => openModal("print")}>
              <i className="bi bi-printer"></i>
              <h6>Print</h6>
            </div>
          </div>

          <div className="col">
            <div className="action-card download" onClick={() => openModal("download")}>
              <i className="bi bi-download"></i>
              <h6>Download</h6>
            </div>
          </div>

        </div>

        {/* TABLE */}
        <div className="card-box">
          <h5>Enrolled Subjects</h5>

          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Units</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {subjects.map((s) => (
                <tr key={s.id}>
                  <td>{s.subject_code}</td>
                  <td>{s.subject_name}</td>
                  <td>{s.units}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => dropSubject(s.id)}
                    >
                      Drop
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

      {/* MODAL */}
      {modal.show && (
        <div
          className="modal-overlay"
          onClick={() => setModal({ show: false, type: "" })}
        >
          <div
            className="modal-center"
            onClick={(e) => e.stopPropagation()}
          >
            {renderModalContent()}

            <button
              className="btn btn-secondary w-100 mt-3"
              onClick={() => setModal({ show: false, type: "" })}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Enrollment;