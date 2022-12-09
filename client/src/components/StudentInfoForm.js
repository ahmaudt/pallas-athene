import React from "react";
import { Button, Card, Col, Form, FormControl, InputGroup, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StudentInfoForm({ onEditStudent, studentId }) {
  const params = useParams();
  const [studentData, setStudentData] = useState({
      first_name: "",
      last_name: "",
      uga_my_id: "",
      programs: [],
      matriculation_term: "",
      graduation_term: "",
      pre_professional: ""
  });

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/students/${studentId || params.id}`)
      .then((r) => r.json())
      .then((obj) => {
        setStudent(obj);
        setStudentData(obj.data);
        // onEditStudent(obj.data);
      });
  }, [params.id]);


  useEffect(() => {
})

function handleEditInfo(e) {
  const updatedStudentData = { ...studentData, [e.target.name]: e.target.value };
  const filteredStudentData = updatedStudentData.programs.filter((program) => program.program_name !== "");
  const updatedStudentDataWithFilteredPrograms = { ...updatedStudentData, programs: filteredStudentData };
  setStudentData(updatedStudentDataWithFilteredPrograms);
}

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/students/${params.id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: studentData,
      }),
    })
      .then((r) => r.json())
      // // below updates students in the state of App.js
      // .then((data) => onEditStudent(data));
  }

  const { first_name, last_name, uga_my_id, matriculation_term, graduation_term,  pre_professional } = studentData;
  const { program_name, program_type, program_code, credit_hrs } = studentData.programs;

  return (
    <React.Fragment>
      <Form onSubmit={handleSubmit}>
          <Row>
            <Col>
              <Card style={{ padding: "0" }} className="rounded-0">
                <CardHeader>
                  <h2>Student Information</h2>
                </CardHeader>
                <Card.Body style={{ padding: "0" }}>
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
                      Matriculation Term
                    </InputGroup.Text>
                    <FormControl className="rounded-0" type="text" placeholder="matriculation term" name="matriculation_term" value={matriculation_term} onChange={handleEditInfo} />
                    <InputGroup.Text  className="rounded-0 py-0">
                      Graduation Term
                    </InputGroup.Text>
                    <FormControl className="rounded-0 text-end" type="text" placeholder="graduation term" name="graduation_term" value={graduation_term} onChange={handleEditInfo} />
                    <InputGroup.Text className="rounded-0 py-0">
                      Pre-Professional
                    </InputGroup.Text>
                    <Form.Select size="sm" className="rounded-0 py-0" aria-label="Default select example"  name="pre_professional" value={pre_professional} onChange={handleEditInfo}>
                        <option>{pre_professional}</option>
                        <option value="Pre-Med">Pre-Med</option>
                        <option value="Pre-Law">Pre-Law</option>
                        <option value="Pre-Dental">Pre-Dental</option>
                        <option value="Pre-Pharmacy">Pre-Pharmacy</option>
                        <option value="Pre-Veterinary">Pre-Veterinary</option>
                        <option value="Pre-Optometry">Pre-Optometry</option>
                        <option value="Pre-PT">Pre-Physical Therapy</option>
                        <option value="Pre-OT">Pre-Occupational Therapy</option>
                        <option value="Pre-PA">Pre-Physician Assistant</option>
                        <option value="Pre-RN">Pre-Nursing</option>
                      </Form.Select>
                  </InputGroup>
                </Card.Body>
                <Card.Footer>
                  <Button size="sm" className="rounded-0" type="submit" variant="outline-primary">Save</Button>
                </Card.Footer>
              </Card>
            </Col>
          </Row>
      </Form>
    </React.Fragment>
  );
}

export default StudentInfoForm;
