import React from "react";
import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import {
  Routes,
  Route,
  useNavigate,
  useMatch,
  useParams,
  useLocation
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import StudentDetail from "./components/StudentDetail";
import StudentList from "./components/StudentList";
import Home from "./components/Home";
import AcademicPlanForm from "./components/AcademicPlanForm";
import NewStudentForm from "./components/NewStudentForm";
import NewAcademicPlanForm from "./components/NewAcademicPlanForm";
import ViewPlan from "./components/ViewPlan";
import Login from "./components/Login";
import PrintPlan from "./components/PrintPlan";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  // students is the state variable for the student list
  const params = useParams();
  const [page, setPage] = useState("/");
  const [showNav, setShowNav] = useState(null);
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({
    password: "",
    uga_my_id: ""
  });
  // const [selectedStudent, setSelectedStudent] = useState({
  //   id: "",
  //   ugaMyId: "",
  //   firstName: "",
  //   lastName: "",
  //   matricTerm: "",
  //   gradTerm: "",
  //   currentTerm: "",
  //   advisingTerm: "",
  //   major: "",
  //   preProfessional: "",
  //   earnedHrs: 0,
  //   requiredHrs: 0,
  //   remainingHrs: 0,
  // });
  const [plans, setPlans] = useState([]);
  // const [workingPlan, setWorkingPlan] = useState({
  //   studentId: "",
  //   adviseTerm: "",
  //   adviseYear: "",
  //   recommendations: [],
  // });

  // function handleChangeForm(recommendations) {
  //   setWorkingPlan((workingPlan) => ({
  //     ...workingPlan,
  //     recommendations: recommendations,
  //   }));
  // }

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

  function handleEditStudent(student) {
    const updatedStudents = students.map((s) => {
      if (s.id === student.id) return student;
      return s;
    });
    setSelectedStudent(student);
    setStudents(updatedStudents);
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

  // this is a comment to test font style

  function handleLogout() {
    fetch("/logout", { method: "DELETE" }).then(() => {
      setUser("");
      navigate("/");
    });
  }

  function handleLogin(user) {
    setUser(user);
    navigate("/home");
  }

  const match = useMatch(page, {
    path: `/plans/:id/view`,
    exact: true,
    strict: false,
  });

  function handleChangePage(page) {
    setPage((page) => page);
    match ? setShowNav(false) : setShowNav(true);
  }

  

  if (user) {
    return (
      <div className="App">

        <div className="row">
          <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  exact
                  path="/students"
                  element={
                    <StudentList
                      students={students}
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
                      onPageChange={handleChangePage}
                    />
                  }
                />
                <Route
                  path="/plans/:id/edit"
                  element={
                    <AcademicPlanForm
                    />
                  }
                />
                <Route
                  path="/plans/:id/view"
                  element={<PrintPlan onPageChange={handleChangePage} />}
                />
                <Route
                  path="/new-student"
                  element={<NewStudentForm onAddStudent={handleAddStudent} />}
                />
                <Route
                  path="/students/:id/new_plan"
                  element={<NewAcademicPlanForm onAddPlan={handleAddPlan} />}
                />
                <Route
                  path="/generated-plan"
                  element={<PrintPlan />}
                />
                <Route
                  path="/login"
                  element={<Login onLogin={handleLogin} />}
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
