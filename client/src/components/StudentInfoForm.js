import React from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentInfoForm({ onEditStudent, onPageChange }) {
  const params = useParams();
  const [student, setStudent] = useState({
      first_name: "",
      last_name: "",
      uga_my_id: "",
      programs: [],
      matriculation_term: "",
      graduation_term: "",
      pre_professional: ""
  });

  useEffect(() => {
    fetch(`/students/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setStudent(plan.data);
        onPageChange(`/students/${params.id}`)
      });
  }, [params.id]);


  useEffect(() => {
})

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
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Card style={{ padding: "0" }} className="rounded-0">
                <CardHeader>
                  <h2>Student Information</h2>
                </CardHeader>
                <Card.Body>
                <Row>
                  <InputGroup size="sm" className="rounded-0">
                    <InputGroup.Text className="rounded-0 py-0">
                      First Name
                    </InputGroup.Text>
                    <Form.Control id="inputGroup-sizing-sm" className="rounded-0" type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleEditInfo}  />
                    <InputGroup.Text className="rounded-0 py-0">
                      Last Name
                    </InputGroup.Text>
                    <Form.Control className="rounded-0" type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleEditInfo} />
                  </InputGroup>
                  <InputGroup size="sm" className="rounded-0">
                    <InputGroup.Text className="rounded-0 py-0">
                      MyID
                    </InputGroup.Text>
                    <Form.Control className="rounded-0" type="text" placeholder="UGA MyID" name="uga_my_id" value={uga_my_id} onChange={handleEditInfo} />
                    <InputGroup.Text className="rounded-0 py-0" size="sm">
                      Matric
                    </InputGroup.Text>
                    <FormControl className="rounded-0" type="text" placeholder="matriculation term" name="matriculation_term" value={matriculation_term} onChange={handleEditInfo} />
                    <InputGroup.Text  className="rounded-0 py-0">
                      Grad
                    </InputGroup.Text>
                    <FormControl className="rounded-0 text-end" type="text" placeholder="graduation term" name="graduation_term" value={graduation_term} onChange={handleEditInfo} />
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
    </React.Fragment>
  );
}

export default StudentInfoForm;
