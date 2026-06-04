import { useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../schedule.css";

// SCHEDULE DATA
export const scheduleData = [
  { subject: "ITEC 101", room: "COMLAB 2", day: "MON", start: "7:00 AM", end: "9:00 AM" },
  { subject: "DCIT 26", room: "COMLAB 3", day: "MON", start: "10:00 AM", end: "12:00 PM" },
  { subject: "ITEC 100", room: "COMLAB 1", day: "MON", start: "1:00 PM", end: "3:00 PM" },
  { subject: "ITEC 106", room: "COMLAB 4", day: "MON", start: "4:00 PM", end: "6:00 PM" },

  { subject: "DCIT 26", room: "COMLAB 3", day: "WED", start: "9:00 AM", end: "11:00 AM" },
  { subject: "ITEC 101", room: "COMLAB 2", day: "WED", start: "1:00 PM", end: "3:00 PM" },
  { subject: "GNED 09", room: "ROOM 102", day: "WED", start: "4:00 PM", end: "5:00 PM" },

  { subject: "ITEC 100", room: "COMLAB 1", day: "FRI", start: "7:00 AM", end: "9:00 AM" },
  { subject: "GNED 08", room: "ROOM 101", day: "FRI", start: "10:00 AM", end: "12:00 PM" },
  { subject: "DCIT 26", room: "COMLAB 3", day: "FRI", start: "1:00 PM", end: "3:00 PM" },
];

// ✅ FIXED TIME SLOTS (THIS WAS MISSING)
const timeSlots = [
  "7:00 AM",
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
];

// TIME CONVERTER
const timeToNumber = (time) => {
  const [t, modifier] = time.split(" ");
  let [hours] = t.split(":");

  hours = parseInt(hours);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  return hours;
};

// GET SUBJECT AT TIME
const getSubjectAtTime = (day, time) => {
  return scheduleData.find((item) => {
    if (item.day !== day) return false;

    const start = timeToNumber(item.start);
    const end = timeToNumber(item.end);
    const current = timeToNumber(time);

    return current >= start && current < end;
  });
};

function Schedule() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="main-container">

      {/* MOBILE TOPBAR */}
      <div className="mobile-topbar">
        <button id="menuBtn" onClick={() => setSidebarOpen(!sidebarOpen)}>
          <i className="bi bi-list"></i>
        </button>
        <h6 className="m-0">CvSU Student Portal</h6>
      </div>

      {/* SIDEBAR */}
      <div className={`sidebar ${sidebarOpen ? "show-sidebar" : ""}`}>

        <div>
          <div className="logo-box">
            <img src="/logo.jpg" alt="logo" />
            <div className="portal-text">
              <h6>CvSU TANZA</h6>
              <p>STUDENT PORTAL</p>
            </div>
          </div>

          <div className="line"></div>

          <Link to="/landing" className="back-btn">
            <i className="bi bi-arrow-left"></i>
          </Link>

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
              <Link to="/schedule" className="active">
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
          <Link to="/" onClick={() => localStorage.removeItem("user")}>
            <i className="bi bi-box-arrow-right"></i> Logout
          </Link>
        </div>

      </div>

      {/* CONTENT */}
      <div className="content">

        <div className="schedule-container">

          <div className="schedule-header">
            <h5>SCHEDULES</h5>
            <select>
              <option>2nd Semester A.Y. 2025-2026</option>
              <option>1st Semester A.Y. 2025-2026</option>
            </select>
          </div>

          <div className="table-responsive">

            <table className="schedule-table">

              <thead>
                <tr>
                  <th>TIME</th>
                  <th>MON</th>
                  <th>TUE</th>
                  <th>WED</th>
                  <th>THU</th>
                  <th>FRI</th>
                  <th>SAT</th>
                </tr>
              </thead>

              <tbody>

                {timeSlots.map((time, i) => (
                  <tr key={i}>
                    <td>{time}</td>

                    {["MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => {
                      const subject = getSubjectAtTime(day, time);

                      return (
                        <td key={day} className={subject ? "subject" : ""}>
                          {subject ? (
                            <>
                              {subject.subject}
                              <span>{subject.room}</span>
                            </>
                          ) : ""}
                        </td>
                      );
                    })}
                  </tr>
                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>
    </div>
  );
}

export default Schedule;