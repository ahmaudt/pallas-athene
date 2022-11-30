import React from "react";
import { Button, Row, Col, Card, Form, FormGroup } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useState, useEffect } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { FcDeleteRow, VscOutput } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import NavBar from "./NavBar";

function NewAcademicPlanForm({ onAddPlan }) {
  const params = useParams();
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
    fetch(`/students/${params.id}`)
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
        navigate(`/plans/${data.id}/view`);
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

  function handleAddRow() {
    let newRow = { requirement: "", course: "", alt_course: "", notes: "" };
    newRow.id = rowCount.index + 1;
    setRowCount(rowCount + 1);
  }

  function handleDeleteRow() {
    setRowCount(rowCount - 1);
  }

  const { requirement, course, alt_course, notes } = planData.recommendations;

  return (
    <React.Fragment>
      <NavBar />
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <StudentInfoForm currentStudent={student} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Card style={{ padding: "0" }} className="rounded-0" >
              <CardHeader>
                <h2 className="float-start">Student Plan</h2>
                <Button
                  className="rounded-0 float-end"
                  variant="primary"
                  onClick={handleAddRow}
                >
                  Add Row
                </Button>
              </CardHeader>
              <Card.Body style={{ padding: "0" }}>
                <FormGroup>
                  {[...Array(rowCount)].map((r, i) => (
                    <Row key={i}>
                      <Col lg="3" style={{ paddingRight: "0" }}>
                        <Form.Control
                          className="rounded-0"
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
                      </Col>
                      <Col md="4" style={{ paddingRight: "0", paddingLeft: "0" }}>
                        <Form.Control
                          className="rounded-0"
                          type="text"
                          placeholder="course"
                          name="course"
                          value={course}
                          onChange={(e) =>
                            handleAddRecommendation(i, "course", e.target.value)
                          }
                        />
                      </Col>
                      <Col md="4" style={{ paddingLeft: "0", marginRight: "0" }}>
                        <Form.Control
                          className="rounded-0"
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
                      </Col>
                      <Col
                        md="auto"
                        style={{ padding: "0", margin: "0", width: "10px" }}
                      >
                        {/* <Button variant="outline-danger" onClick={handleDeleteRow}>Delete Row</Button> */}
                        <FcDeleteRow size="2em" onClick={handleDeleteRow} />
                      </Col>
                    </Row>
                  ))}
                </FormGroup>
                <FormGroup style={{ padding: "10px" }}>
                  <Form.Label>Notes</Form.Label>
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
                <Button className="rounded-0" variant="success" type="submit">
                  Save
                </Button>
                <Link to={`/plans/${planData.id}/view`}>
                  <Button
                    className="rounded-0"
                    style={{ marginLeft: "5px" }}
                    variant="secondary"
                    type="button"
                  >
                    View Plan
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
