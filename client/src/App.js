import React from "react";
import fetch from 'isomorphic-fetch';
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentDetail from "./components/StudentDetail";
import StudentList from "./components/StudentList";
import AcademicPlanForm from "./components/AcademicPlanForm";
import NewStudentForm from "./components/NewStudentForm";
import NewAcademicPlanForm from "./components/NewAcademicPlanForm";
import Login from "./components/Login";
import PrintPlan from "./components/PrintPlan";
import MainNav from "./components/MainNav";

function App() {
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState({
    password: "",
    uga_my_id: ""
  });
  
  // const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("/api/v1/user").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  function handleEditStudent(student) {
    setStudents(students.map((s) => (s.id === student.id ? student : s)));
  }

  function handleAddStudent(student) {
    const updatedStudents = [...students, student];
    setStudents(updatedStudents);
  }

  function handleAddPlan(plan) {
    const updatedPlans = [...plans, plan];
    setPlans(updatedPlans);
  }

  function handleDeletePlan(id) {
    const updatedPlans = plans.filter((plan) => plan.id !== id);
    setPlans(updatedPlans);
  }

  function handleLogout() {
    fetch("/api/v1/logout", { method: "DELETE" }).then(() => {
      setUser("");
      navigate("/login");
    });
  }

  function handleLogin(user) {
    setUser(user);
    navigate("/students");
  }

  if (user) {
    return (
      <div className="App">
        <div className="row">
          <Col>
              <Routes>
                <Route
                  exact
                  path="/students"
                  element={
                    <StudentList
                      onSearchChange={setSearchItem}
                      searchItem={searchItem}
                    />
                  }
                />
                <Route
                  exact
                  path="/students/:id"
                  element={
                    <StudentDetail/>
                  }
                />
                <Route
                  exact
                  path="/plans/:id/edit"
                  element={ <AcademicPlanForm  /> } />
                <Route
                  exact
                  path="/plans/:id/view"
                  element={<PrintPlan />}
                />
                <Route
                  exact
                  path="/new_student"
                  element={<NewStudentForm />}
                />
                <Route
                  exact
                  path="/students/:id/new_plan"
                  element={<NewAcademicPlanForm />}
                />
                <Route
                  exact
                  path="/generated-plan"
                  element={<PrintPlan />}
                />
                <Route
                  exact
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
                />
                <Route
                  exact
                  path="/logout"
                  element={<MainNav onLogout={handleLogout} />}
                />
              </Routes>
          </Col>
        </div>
      </div>
    );
  } else {
    return <Login onLogin={handleLogin} />;
  }
}

export default App;
