import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  Routes,
  Route,
  useNavigate,
  useParams,
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
  // students is the state variable for the student list
  const params = useParams();
  const [students, setStudents] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [user, setUser] = useState({
    password: "",
    uga_my_id: ""
  });
  
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetch("/user").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  useEffect(() => {
    fetch("/students")
      .then((r) => r.json())
      .then((data) => setStudents(data));
  }, []);

  useEffect(() => {
    fetch("/plans")
      .then((r) => r.json())
      .then((data) => setPlans(data));
  }, []);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };


  const displayedStudents = students?.filter((student) => {
    return student?.data?.last_name.toLowerCase().includes(searchItem?.toLowerCase())
  })

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
    fetch("/logout", { method: "DELETE" }).then(() => {
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
                      students={displayedStudents}
                      onSearchChange={setSearchItem}
                      searchItem={searchItem}
                    />
                  }
                />
                <Route
                  exact
                  path="/students/:id"
                  element={
                    <StudentDetail
                      plans={plans}
                      onEditStudent={handleEditStudent}
                      onDeletePlan={handleDeletePlan}
                    />
                  }
                />
                <Route
                  exact
                  path="/plans/:id/edit"
                  element={ <AcademicPlanForm onAddPlan={handleAddPlan} /> } />
                <Route
                  path="/plans/:id/view"
                  element={<PrintPlan />}
                />
                <Route
                  exact
                  path="/new-student"
                  element={<NewStudentForm onAddStudent={handleAddStudent} />}
                />
                <Route
                  exact
                  path="/students/:id/new_plan"
                  element={<NewAcademicPlanForm onAddPlan={handleAddPlan} />}
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
                  path="/logout"
                  element={<MainNav onLogout={handleLogout} />}
                />
                <Route
                  exact
                  path="/new_plan"
                  element={<NewAcademicPlanForm onAddPlan={handleAddPlan} />}
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
