import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landingpage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Grades from "./pages/Grades";
import Schedule from "./pages/Schedule";
import Course from "./pages/Course";
import Enrollment from "./pages/Enrollment";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/landing"
          element={<Landing />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/grades"
          element={<Grades />}
        />

        <Route
          path="/schedule"
          element={<Schedule />}
        />

        <Route
          path="/course"
          element={<Course />}
        />

        <Route
          path="/enrollment"
          element={<Enrollment />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;