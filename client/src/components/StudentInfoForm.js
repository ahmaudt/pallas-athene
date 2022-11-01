import React from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentInfoForm({ onEditStudent }) {
  const params = useParams();
  const [student, setStudent] = useState({
      first_name: "",
      last_name: "",
      uga_my_id: "",
      majors: [
        {
          name: "",
          credit_hours: 0
        }
      ],
      minors: [
        {
          name: "",
          credit_hours: ""
        }
      ],
      certificates: [
        {
          name: "",
          credit_hours: ""
        }
      ],
      matriculation_term: "",
      graduation_term: ""
  });

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then((r) => r.json())
      .then((plan) => setStudent(plan.data));
  }, [params.id]);

  function handleEditInfo(e) {
    const updatedStudent = { ...student, [e.target.name]: e.target.value };
    setStudent(updatedStudent);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/students/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((r) => r.json())
      // below updates students in the state of App.js
      .then((data) => onEditStudent(data));
  }

  const { first_name, last_name, majors, matriculation_term, graduation_term, uga_my_id, minors, certificates } = student;

  return (
    <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Card style={{ padding: "0" }} className="rounded-0">
              <CardHeader>
                <h2>Student Information</h2>
              </CardHeader>
              <Card.Body>
              <Row>
                <InputGroup className="input-group-sm">
                  <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">First</InputGroup.Text>
                  <Col style={{ paddingRight: "0" }}>
                    <FormControl className="rounded-0 " size="sm" type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleEditInfo}  />
                  </Col>
                  <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">Last</InputGroup.Text>
                  <Col style={{ paddingLeft: "0", paddingRight: "0" }}>
                    <FormControl className="rounded-0 " size="sm" type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleEditInfo} />
                  </Col>
                  <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">MyID</InputGroup.Text>
                  <Col style={{ paddingRight: "0", paddingLeft: "0" }}>
                    <FormControl className="rounded-0 " size="sm" type="text" placeholder="UGA MyID" name="uga_my_id" value={uga_my_id} onChange={handleEditInfo} />
                  </Col>
                  <Col>
                    <FormControl className="rounded-0 text-end" size="sm" type="text" placeholder="major" name="major" value={majors[0].name} onChange={handleEditInfo} />
                  </Col>
                  <InputGroup.Text className="rounded-0" size="sm">Major</InputGroup.Text>
                  </InputGroup>
                </Row>
                <Row>
                  <InputGroup className="input-group-sm">
                    <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">Minors</InputGroup.Text>
                  <Col>
                    <FormControl className="rounded-0" size="sm" type="text" placeholder="Minor" name="minor" value={minors[0].name} onChange={handleEditInfo} />
                  </Col>
                  <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">Certificates</InputGroup.Text>
                  <Col>
                    <FormControl className="rounded-0 " size="sm" type="text" placeholder="advising term" name="certificate" value={certificates[0].name} onChange={handleEditInfo} />
                  </Col>
                  <InputGroup.Text className="rounded-0 text-center justify-content-center" size="sm">Matric</InputGroup.Text>
                  <Col>
                    <FormControl className="rounded-0 " size="sm" type="text" placeholder="matriculation term" name="matriculation_term" value={matriculation_term} onChange={handleEditInfo} />
                  </Col>
                  <Col>
                    <FormControl className="rounded-0 text-end " size="sm" type="text" placeholder="graduation term" name="graduation_term" value={graduation_term} onChange={handleEditInfo} />
                  </Col>
                  <InputGroup.Text  className="rounded-0 text-center justify-content-center" size="sm">Grad</InputGroup.Text>
                  </InputGroup>
                </Row>
              </Card.Body>
              <Card.Footer>
                <Button className="rounded-0" type="submit" variant="primary">Save</Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
    </Form>
  );
}

export default StudentInfoForm;
