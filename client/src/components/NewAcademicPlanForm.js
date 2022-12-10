import React from "react";
import { Button, Row, Col, Card, Form, FormGroup, InputGroup, FormControl, Modal } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useState, useEffect } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { FcDeleteRow, VscOutput } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import MainNav from "./MainNav";

function NewAcademicPlanForm({ onAddPlan }) {
  const params = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const handleModalClose = () => setShowConfirmation(false);
  const handleModalShow = () => setShowConfirmation(true);
  const [rowCount, setRowCount] = useState(4);

  const navigate = useNavigate();

  const [planData, setPlanData] = useState({
    advising_term: "",
    current_term: "",
    recommendations: [
      {
        course: "",
        requirement: "",
        alt_course: "",
      },
    ]
  });

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/students/${params.id}`)
      .then((r) => r.json())
      .then((payload) => {
        setStudent(payload);
      });
  }, [params.id]);

  const advisee_id = student?.id;

  function handleSubmit(e) {
    e.preventDefault();
    const filteredPlanData = planData.recommendations.filter((recommendation) => recommendation.course !== "");
    const updatedPlanData = { ...planData, recommendations: filteredPlanData };
    fetch("/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: advisee_id,
        data: updatedPlanData,
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        onAddPlan(data);
        handleModalClose();
        window.open(`/plans/${data.id}/view`, "_blank");
        navigate(`/students/${advisee_id}`);
      });
  }

  function handleAddRecommendation(i, name, value) {
    // check to see if plan contains recommendation
    let rowId = i + 1;
    let recommendation = planData.recommendations.find(
      (recommendation) => recommendation.id === rowId
    );
    if (recommendation) {
      // if recommendation exists, update it
      setPlanData({
        ...planData,
        recommendations: planData.recommendations.map((recommendation) =>
          recommendation.id === rowId
            ? { ...recommendation, [name]: value }
            : recommendation
        ),
      });
    } else {
      // if recommendation does not exist, create it
      setPlanData({
        ...planData,
        recommendations: [
          ...planData.recommendations,
          { id: rowId, [name]: value },
        ],
      });
    }
  }

  function handleAddTerm(e) {
    setPlanData({ ...planData, [e.target.name]: e.target.value });
  }

  function handleAddRow() {
    let newRow = { requirement: "", course: "", alt_course: "", notes: "" };
    newRow.id = rowCount.index + 1;
    setRowCount(rowCount + 1);
  }

  function handleDeleteRow() {
    setRowCount(rowCount - 1);
  }

  const { requirement, course, alt_course, notes, current_term, advising_term } = planData.recommendations;


  return (
    <React.Fragment>
      <MainNav />
      <Form>
        <Row>
          <Col>
            <StudentInfoForm currentStudent={student} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal show={showConfirmation} onHide={handleModalClose}>
              <Modal.Header closeButton>
                <Modal.Title>Confirm Submission</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                Are you sure you want to submit this plan?
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleModalClose}>
                  Cancel
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>
            <Card style={{ padding: "0" }} className="rounded-0" >
              <CardHeader>
                <h4 className="float-start">Student Plan</h4>
                <Button
                  size="sm"
                  className="rounded-0 float-end"
                  variant="outline-primary"
                  onClick={handleAddRow}
                >
                  Add Row
                </Button>
              </CardHeader>
              <Card.Body style={{ padding: "0" }}>
                <FormGroup>
                <InputGroup style={{ marginBottom: "25px" }} size="sm" className="rounded-0">
                <InputGroup.Text className="rounded-0 py-0">
                  Current Term
                </InputGroup.Text>
                <FormControl 
                  className="rounded-0 py-0"
                  type="text"
                  name="current_term"
                  value={current_term}
                  onChange={handleAddTerm}
                />
              <InputGroup.Text className="rounded-0 py-0">
                  Advising Term
                </InputGroup.Text>
                <FormControl 
                  className="rounded-0 py-0"
                  type="text"
                  name="advising_term"
                  value={advising_term}
                  onChange={handleAddTerm}
                />
              </InputGroup>
                  <InputGroup size="sm" className="rounded-0 py-0">
                    <InputGroup.Text style={{ width: "3%" }} className="rounded-0 py-0 pl-2">
                      #
                    </InputGroup.Text>
                    <InputGroup.Text style={{ width: "29.65%" }} className="rounded-0 py-0">
                      Requirement
                    </InputGroup.Text>
                    <InputGroup.Text style={{ width: "29.65%" }} className="rounded-0 py-0">
                      Course
                    </InputGroup.Text>
                    <InputGroup.Text style={{ width: "29.50%" }} className="rounded-0 py-0">
                      Alt Course
                    </InputGroup.Text>
                    <Button variant="danger" style={{ width: "8.20%"}} className="rounded-0 py-0">
                      Delete
                    </Button>
                  </InputGroup>
                  {[...Array(rowCount)].map((r, i) => (
                    <InputGroup key={i} size="sm" className="rounded-0 py-0">
                      <InputGroup.Text style={{ width: "3%"}} className="rounded-0 py-0 pl-2">
                        {i + 1}
                      </InputGroup.Text>
                        <Form.Control
                          className="rounded-0 py-0"
                          type="text"
                          placeholder="requirement"
                          name="requirement"
                          value={requirement}
                          onChange={(e) =>
                            handleAddRecommendation(
                              i,
                              "requirement",
                              e.target.value
                            )
                          }
                        />
                        <Form.Control
                          className="rounded-0 py-0"
                          type="text"
                          placeholder="course"
                          name="course"
                          value={course}
                          onChange={(e) =>
                            handleAddRecommendation(i, "course", e.target.value)
                          }
                        />
                        <Form.Control
                          className="rounded-0 py-0"
                          type="text"
                          placeholder="alt course"
                          name="alt_course"
                          value={alt_course}
                          onChange={(e) =>
                            handleAddRecommendation(
                              i,
                              "alt_course",
                              e.target.value
                            )
                          }
                        />
                        {/* <Button variant="outline-danger" onClick={handleDeleteRow}>Delete Row</Button> */}
                        <Button size="sm" variant="outline-danger" className="rounded-0 py-0" onClick={handleDeleteRow}>Delete Row</Button>
                    </InputGroup>
                  ))}
                </FormGroup>
                <FormGroup style={{ padding: "10px" }}>
                  <Form.Label>
                    <h5>Notes</h5>
                  </Form.Label>
                  <Form.Control
                    className="rounded-0"
                    as="textarea"
                    placeholder="plan notes"
                    name="notes"
                    defaultValue={planData.notes}
                    onChange={(e) => (planData.notes = e.target.value)}
                    rows={5}
                  ></Form.Control>
                </FormGroup>
              </Card.Body>
              <Card.Footer>
                <Button size="sm" className="rounded-0" variant="outline-success" onClick={handleModalShow}>
                  Save
                </Button>
                <Link to={`/plans/${planData.id}/view`}>
                  <Button
                    size="sm"
                    className="rounded-0"
                    style={{ marginLeft: "5px" }}
                    variant="outline-primary"
                    type="button"
                  >
                    View Plan
                  </Button>
                </Link>
                <Link to={`/students/${student?.id}`}>
                <Button style={{ marginLeft: "10px" }} size="sm" className="rounded-0" variant="outline-secondary" type="button">
                  Cancel
                </Button>
              </Link>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
}

export default NewAcademicPlanForm;
