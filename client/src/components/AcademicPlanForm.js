import React from "react";
import {
  Button,
  Row,
  Col,
  Card,
  Form,
  FormGroup,
  InputGroup,
  FormControl
} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import StudentInfoForm from "./StudentInfoForm";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import MainNav from "./MainNav";

function AcademicPlanForm() {
  const params = useParams();

  const [planData, setPlanData] = useState({
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

  const [plan, setPlan] = useState(null)

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan);
        setPlanData(plan.data);
        setStudent(plan.student)
      });
  }, [params.id]);

  function handleRecommendationChange(index, name, value) {
    const updatedRecommendations = planData.recommendations.map(
      (recommendation, i) => {
        if (i === index) {
          return { ...recommendation, [name]: value };
        }
        return recommendation;
      }
    );
    console.log(updatedRecommendations);
    setPlanData((planData) => ({
      ...planData,
      recommendations: updatedRecommendations,
    }))
  }

  const handleAddRow = () => {
    let newRow = { requirement: "", course: "", alt_course: "" };
    newRow.id = planData.recommendations.length + 1;
    setPlanData((planData) => ({
      ...planData,
      recommendations: [...planData.recommendations, newRow],
    }));
  }

  const handleDeleteRow = (i) => {

    // matches row to be deleted with index
    let newRows = planData.recommendations.filter((rec, idx) => {
      if (idx !== i) {
        return rec;
      }
    })
    console.log(newRows);
    setPlanData((planData) => ({
      ...planData,
      recommendations: newRows
    }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/plans/${plan.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: planData,
      }),
    })
      .then((r) => r.json())
  }

  if (!plan) return <h2>Loading...</h2>;

  return (
    <React.Fragment>
      <MainNav />
      <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
          <Card style={{ padding: "0" }} className="rounded-0">
            <CardHeader>
              <h4>Student Plan</h4>
              <Button variant="outline-primary" size="sm" onClick={handleAddRow}>Add Row</Button>
            </CardHeader>
            <Card.Body>
              <InputGroup size="sm" className="rounded-0 py-0">
                <InputGroup.Text style={{ width: "32.35%"}} className="rounded-0 py-0">
                  Requirement
                </InputGroup.Text>
                <InputGroup.Text style={{ width: "29.60%"}} className="rounded-0 py-0">
                  Course
                </InputGroup.Text>
                <InputGroup.Text style={{ width: "29.50%"}} className="rounded-0 py-0">
                  Alt Course
                </InputGroup.Text>
                <Button variant="danger" style={{ width: "8.5%"}} className="rounded-0 py-0">
                  Delete
                </Button>
              </InputGroup>
                  {[...Array(planData.recommendations)].map((r, index) => (
                    planData.recommendations.map((recommendation, i) => (
                    <InputGroup key={i} size="sm" className="rounded-0 py-0">
                      <InputGroup.Text style={{ width: "3%"}} className="rounded-0 py-0 pl-2">
                        {i + 1}
                      </InputGroup.Text>
                      <FormControl
                        className="rounded-0 py-0"
                        type="text"
                        name="requirement"
                        value={recommendation.requirement}
                        onChange={(e) => handleRecommendationChange(i, "requirement", e.target.value)}
                      />
                      <FormControl
                        className="rounded-0"
                        type="text"
                        name="course"
                        value={recommendation.course}
                        onChange={(e) => handleRecommendationChange(i, "course", e.target.value)}
                      />
                      <FormControl
                        className="rounded-0"
                        type="text"
                        name="alt_course"
                        value={recommendation.alt_course}
                        onChange={(e) => handleRecommendationChange(i, "alt_course", e.target.value)}
                      />
                      <Button className="rounded-0" size="sm" variant="outline-danger" onClick={(e) => handleDeleteRow(i)}>Delete Row</Button>
                    </InputGroup>
                    ))
                  ))} 
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
  </React.Fragment>
  );
}

export default AcademicPlanForm;
