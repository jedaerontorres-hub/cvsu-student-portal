import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../landingpage.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function Landingpage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // MOBILE MENU
  const [menuOpen, setMenuOpen] = useState(false);

  // LOGIN CHECK
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      navigate("/");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // ANNOUNCEMENTS
  const announcements = [
    {
      title: "CvSU Tanza Foundation Week",
      desc: "A week-long celebration featuring academic contests, sports events, cultural performances, and student activities.",
      img: "/sportfest.jpg",
    },
    {
      title: "Enrollment for New Students",
      desc: "Enrollment schedules and requirements are now available for incoming freshmen and transferees.",
      img: "/school.jpg",
    },
    {
      title: "Student Organization Fair",
      desc: "Join campus organizations and explore leadership opportunities.",
      img: "/org.jpg",
    },
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % announcements.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % announcements.length);
  const prevSlide = () =>
    setCurrent((prev) =>
      prev === 0 ? announcements.length - 1 : prev - 1
    );

  // CALENDAR
  const [currentDate, setCurrentDate] = useState(new Date());

  const events = {
    5: { title: "Enrollment" },
    14: { title: "Midterm" },
    20: { title: "Fair" },
    27: { title: "Meeting" },
  };

  const month = currentDate.toLocaleString("default", { month: "long" });
  const year = currentDate.getFullYear();

  const daysInMonth = new Date(
    year,
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () =>
    setCurrentDate(new Date(year, currentDate.getMonth() - 1, 1));

  const nextMonth = () =>
    setCurrentDate(new Date(year, currentDate.getMonth() + 1, 1));

  const isMay = currentDate.getMonth() === 4;

  return (
    <div className="landing-page">

      {/* NAVBAR */}
      <nav className="cvsu-navbar">

        <div className="navbar-left">
          <img src="/logo.jpg" alt="CvSU Logo" />
          <div className="navbar-text">
            <h2>CvSU-TANZA</h2>
            <span>STUDENT PORTAL</span>
          </div>
        </div>

        {/* HAMBURGER */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <i className="bi bi-list"></i>
        </div>

        <ul className={`nav-links ${menuOpen ? "active" : ""}`}>

          <li>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              HOME
            </a>
          </li>

          <li>
            <a href="#announcements" onClick={() => setMenuOpen(false)}>
              ANNOUNCEMENTS
            </a>
          </li>

          <li>
            <a href="#calendar" onClick={() => setMenuOpen(false)}>
              CALENDAR
            </a>
          </li>

          {/* 🔥 FIXED NAVIGATION TO DASHBOARD */}
          <li>
            <button
              onClick={() => {
                setMenuOpen(false);
                navigate("/dashboard");
              }}
            >
              DASHBOARD
            </button>
          </li>
              
          <li>
            <button onClick={logout}>LOGOUT</button>
          </li>

        </ul>
      </nav>

      {/* HERO */}
      <section id="home" className="hero">
        <div className="welcome-card">
          <h3>WELCOME</h3>
          <h1>{user?.fullname || "STUDENT"}</h1>
          <h2>CvSU TANZA</h2>
          <p>
            Your all-in-one platform for academic information,
            campus services, schedules, announcements, and updates.
          </p>
        </div>
      </section>

      {/* ANNOUNCEMENTS */}
      <section id="announcements" className="announcement-section">

        <div className="section-title">
          <h2>ANNOUNCEMENTS</h2>
        </div>

        <div className="announcement-card">

          <button className="arrow left" onClick={prevSlide}>
            <i className="bi bi-chevron-left"></i>
          </button>

          <div className="carousel">
            <img
              src={announcements[current].img}
              className="slide-img"
              alt=""
            />

            <div className="announcement-content">
              <div>
                <h3>{announcements[current].title}</h3>
                <p>{announcements[current].desc}</p>
              </div>

              <button className="view-btn">View</button>
            </div>
          </div>

          <button className="arrow right" onClick={nextSlide}>
            <i className="bi bi-chevron-right"></i>
          </button>

        </div>
      </section>

      {/* CALENDAR */}
      <section id="calendar" className="calendar-section">

        <div className="calendar-card">
          <h3>ACADEMIC CALENDAR</h3>

          <div className="calendar-header">
            <i className="bi bi-chevron-left" onClick={prevMonth}></i>
            <span>{month.toUpperCase()} {year}</span>
            <i className="bi bi-chevron-right" onClick={nextMonth}></i>
          </div>

          <div className="calendar-grid">

            <span>SUN</span><span>MON</span><span>TUE</span>
            <span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>

            {Array.from({ length: firstDay }).map((_, i) => (
              <span key={i}></span>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;

              return (
                <span
                  key={day}
                  className={isMay && events[day] ? "event-day" : ""}
                >
                  {day}
                </span>
              );
            })}

          </div>
        </div>

        <div className="events-card">
          <h3>EVENTS</h3>

          {Object.keys(events).map((day) => (
            <div className="event" key={day}>
              <div className="event-date">
                <span>{day}</span>
                <small>MAY</small>
              </div>
              <div className="event-info">
                <h4>{events[day].title}</h4>
                <p>Scheduled event</p>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-container">

          <div>
            <h3>CvSU Tanza Campus</h3>
            <p>Brgy. Bagtas, Cavite</p>
          </div>

          <div>
            <h4>Quick Links</h4>
            <p><a href="#home">Home</a></p>
            <p><a href="#announcements">Announcements</a></p>
            <p><a href="#calendar">Calendar</a></p>
          </div>

          <div>
            <h4>Socials</h4>
            <div className="socials">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-linkedin"></i>
            </div>
          </div>

        </div>

        <div className="copyright">
          © 2026 CvSU Tanza
        </div>
      </footer>

    </div>
  );
}

export default Landingpage;