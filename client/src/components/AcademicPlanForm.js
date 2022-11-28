import React from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormGroup
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function AcademicPlanForm({ onUpdatePlan }) {
  const params = useParams();

  const [payload, setPayload] = useState();

  const [plan, setPlan] = useState({
    advising_term: "",
    current_term: "",
    recommendations: [
      {
        course: "",
        requirement: "",
        alt_course: ""
      }
    ],
  });

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan.data);
        setStudent(plan.student)
      });
  }, [params.id]);

  // console.log(payload.data);
  // console.log(payload.student);

  const [rowCount, setRowCount] = useState(`${plan.recommendations.length}`);

  function handleRecommendationChange(index, name, value) {
    const updatedRecommendations = plan.recommendations.map(
      (recommendation, i) => {
        if (i === index) {
          return { ...recommendation, [name]: value };
        }
        return recommendation;
      }
    );
    console.log(updatedRecommendations);
    setPlan((plan) => ({
      ...plan,
      recommendations: updatedRecommendations,
    }))
  }

  const handleAddRow = () => {
    let newRow = { requirement: "", course: "", alt_course: "" };
    newRow.id = plan.recommendations.length + 1;
    setPlan((plan) => ({
      ...plan,
      recommendations: [...plan.recommendations, newRow],
    }));
  }

  const handleDeleteRow = (i) => {
    setPlan((plan) => ({
      ...plan,
      recommendations: plan.recommendations.filter(
        (recommendation) => recommendation.id !== i
      ),
    }));
  }


  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/plans/${plan.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    })
      .then((r) => r.json())
      .then((data) => onUpdatePlan(data));
  }

  const planRecommendations = [...Array(plan.recommendations)].map((r, index) => (
      plan.recommendations.map((recommendation, i) => (
      <Row key={i}>
        <Col sm="3" style={{ paddingRight: "0" }}>
          <Form.Control
            type="text"
            placeholder="requirement"
            name="requirement"
            value={recommendation.requirement}
            onChange={(e) => handleRecommendationChange(i, "requirement", e.target.value)}
          />
        </Col>
        <Col sm="5" style={{ paddingRight: "0", paddingLeft: "0" }}>
          <Form.Control
            type="text"
            placeholder="course"
            name="course"
            value={recommendation.course}
            onChange={(e) => handleRecommendationChange(i, "course", e.target.value)}
          />
        </Col>
        <Col sm="3" style={{ paddingLeft: "0" }}>
          <Form.Control
            type="text"
            placeholder="alt_course"
            name="alt_course"
            value={recommendation.alt_course}
            onChange={(e) => handleRecommendationChange(i, "alt_course", e.target.value)}
          />
        </Col>
        <Col sm="1" style={{ paddingLeft: "0" }}>
        <FontAwesomeIcon icon={icon({name: 'trash', style: 'solid'})} />
          {/* <button variant="outline-danger" onClick={(e) => handleDeleteRow(i)}>
            
          </button> */}
        </Col>
      </Row>
      ))
  ));

  if (!plan) return <h2>Loading...</h2>;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          {/* <StudentInfoForm /> */}
        </Col>
      </Row>
    <Row>
      <Col>
        <Card style={{ padding: "0" }} className="rounded-0">
          <CardHeader>
            <h2 className="float-start">Student Plan</h2>
            <Button className="float-end" variant="primary" onClick={handleAddRow}>Add Row</Button>
          </CardHeader>
          <Card.Body style={{ padding: "0" }}>
              <FormGroup>
                {[...Array(plan.recommendations)].map((r, index) => (
                  plan.recommendations.map((recommendation, i) => (
                  <Row key={i}>
                    <Col sm="3" style={{ paddingRight: "0" }}>
                      <Form.Control
                        className="rounded-0"
                        type="text"
                        placeholder="requirement"
                        name="requirement"
                        value={recommendation.requirement}
                        onChange={(e) => handleRecommendationChange(i, "requirement", e.target.value)}
                      />
                    </Col>
                    <Col sm="5" style={{ paddingRight: "0", paddingLeft: "0" }}>
                      <Form.Control
                        className="rounded-0"
                        type="text"
                        placeholder="course"
                        name="course"
                        value={recommendation.course}
                        onChange={(e) => handleRecommendationChange(i, "course", e.target.value)}
                      />
                    </Col>
                    <Col sm="3" style={{ paddingLeft: "0" }}>
                      <Form.Control
                        className="rounded-0"
                        type="text"
                        placeholder="alt course"
                        name="alt_course"
                        value={recommendation.alt_course}
                        onChange={(e) => handleRecommendationChange(i, "alt_course", e.target.value)}
                      />
                    </Col>
                    <Col sm="1" style={{ paddingLeft: "0" }}>
                      <Button variant="outline-danger" onClick={(e) => handleDeleteRow(i)}>Delete Row</Button>
                    </Col>
                  </Row>
                  ))
                ))} 
              </FormGroup>
              <FormGroup style={{ padding: "10px" }}>
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                  className="rounded-0"
                  as="textarea" 
                  placeholder="plan notes"
                  name="notes"
                  defaultValue={plan.notes}
                  onChange={(e) => plan.notes = e.target.value}
                  rows={5}>
                </Form.Control>
              </FormGroup>
          </Card.Body>
          <Card.Footer>
            <Button variant="primary" type="submit">
              Save
            </Button>
            <Link to={`/students/${student?.id}`}>
              <Button style={{ marginLeft: "10px" }} variant="secondary" type="button">
                Cancel
              </Button>
            </Link>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Form>
  );
}

export default AcademicPlanForm;
