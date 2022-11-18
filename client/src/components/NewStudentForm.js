import React from "react";
import { Button, Card, CardGroup, Col, Form, FormControl, InputGroup, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useState } from "react";
import { useParams } from "react-router-dom";

function NewStudentForm({ onAddStudent }) {
  const navigate = useNavigate();
  const [rowCount, setRowCount] = useState(2);
  const [studentData, setStudentData] = useState({
    first_name: "",
    last_name: "",
    uga_my_id: "",
    programs: [
      {
        program_name: "",
        program_type: "",
        program_code: "",
        credit_hrs: 0
      }
    ],
    matriculation_term: "",
    graduation_term: "",
    pre_professional: ""
  });

  function handleEditInfo(e) {
    const updatedStudentData = { ...studentData, [e.target.name]: e.target.value };
    const filteredStudentData = updatedStudentData.programs.filter((program) => program.program_name !== "");
    const updatedStudentDataWithFilteredPrograms = { ...updatedStudentData, programs: filteredStudentData };
    setStudentData(updatedStudentDataWithFilteredPrograms);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        {
          data: studentData
        }
      ),
    })
      .then((r) => r.json())
      // below updates students in the state of App.js
      .then((data) => {
        onAddStudent(data);
        navigate("/students");
      });
      
  }

  function handleAddProgram(i, name, value) {
    // check to see if plan contains recommendation
    let rowId = i + 1;
    let program = studentData.programs.find(
      (program) => program.id === rowId
    );
    if (program) {
      setStudentData({
        ...studentData,
        programs: studentData.programs.map((program) =>
          program.id === rowId ? { ...program, [name]: value } : program
        ),
      })
    } else {
      setStudentData({
        ...studentData,
        programs: [
          ...studentData.programs,
          { id: rowId, [name]: value },
        ]
      })
    }
  }

  function handleAddRow() {
    let newRow = { program_code: "", program_name: "", program_type: "", credit_hrs: 0 };
    newRow.id = rowCount.index + 1;
    setRowCount(rowCount + 1);
  }

  function handleDeleteRow() {
    setRowCount(rowCount - 1);
  }  
 
  const { first_name, last_name, uga_my_id, matriculation_term, graduation_term,  pre_professional } = studentData;
  const { program_name, program_type, program_code, credit_hrs } = studentData.programs;

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
            <Card className="rounded-0" style={{ padding: "0" }}>
              <CardHeader>
                <h2>Student Information</h2>
              </CardHeader>
              <Card.Body>
                <InputGroup size="sm">
                  <InputGroup.Text className="rounded-0 py-0">
                    First Name
                  </InputGroup.Text>
                  <FormControl className="rounded-0" type="text" placeholder="first name" name="first_name" value={first_name} onChange={handleEditInfo}/>
                  <InputGroup.Text className="rounded-0 py-0">
                    Last Name
                  </InputGroup.Text>
                  <FormControl className="rounded-0" type="text" placeholder="last name" name="last_name" value={last_name} onChange={handleEditInfo}/>
                  <InputGroup.Text className="rounded-0 py-0">
                  UGA MyID
                </InputGroup.Text>
                <FormControl className="rounded-0" type="text" placeholder="UGA MyID" name="uga_my_id" value={uga_my_id} onChange={handleEditInfo}/>
                </InputGroup>
                <InputGroup size="sm">
                  <InputGroup.Text className="rounded-0 py-0">
                    Matriculation Term
                  </InputGroup.Text>
                  <FormControl className="rounded-0" type="text" placeholder="matriculation term" name="matriculation_term" value={matriculation_term} onChange={handleEditInfo}/>
                  <InputGroup.Text className="rounded-0 py-0">
                    Graduation Term
                  </InputGroup.Text>
                  <FormControl className="rounded-0" type="text" placeholder="graduation term" name="graduation_term" value={graduation_term} onChange={handleEditInfo}/>
                  <InputGroup.Text className="rounded-0 py-0">
                    Pre-Professional
                  </InputGroup.Text>
                  <Form.Select size="sm" className="rounded-0 py-0" aria-label="Default select example"  name="pre_professional" value={pre_professional} onChange={handleEditInfo}>
                      <option>Select pre-professional track</option>
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
            </Card>
            <Card className="rounded-0" style={{ padding: "0" }}>
              <CardHeader>
                  <h4>Programs</h4>
                  <Button variant="outline-primary" size="sm" onClick={handleAddRow}>Add Row</Button>
                </CardHeader>
                <Card.Body>
                  {[...Array(rowCount)].map((r, i) => (
                    <InputGroup key={i} size="sm" className="rounded-0 py-0">
                      <InputGroup.Text className="rounded-0 py-0">
                        Code
                      </InputGroup.Text>
                      <FormControl className="rounded-0 py-0" type="text" placeholder="Program Code" name="program_code" value={program_code} onChange={(e) => handleAddProgram(i, "program_code", e.target.value)} />
                      <InputGroup.Text className="rounded-0 py-0">
                        Name
                      </InputGroup.Text>
                      <FormControl
                        className="rounded-0 py-0"
                        type="text"
                        placeholder="Program Name"
                        name="program_name"
                        value={program_name}
                        onChange={(e) => handleAddProgram(i, "program_name", e.target.value)}
                      />
                      <InputGroup.Text className="rounded-0 py-0">
                        Type
                      </InputGroup.Text>
                      <FormControl className="rounded-0 py-0" type="text" placeholder="Program Type" name="program_type" value={program_type} onChange={(e) => handleAddProgram(i, "program_type", e.target.value)} />
                      <InputGroup.Text className="rounded-0 py-0">
                        Hrs
                      </InputGroup.Text>
                      <FormControl className="rounded-0 py-0" type="text" placeholder="Credit Hrs" name="credit_hrs" value={credit_hrs} onChange={(e) => handleAddProgram(i, "credit_hrs", e.target.value)} />
                      <Button className="rounded-0" size="sm" variant="outline-danger" onClick={handleDeleteRow}>Delete Row</Button>
                    </InputGroup>
                  ))}
                </Card.Body>
                <Card.Footer>
                <Button type="submit" variant="primary">Save</Button>
              </Card.Footer>
            </Card>
        </Col>
      </Row>
    </Form>
  );
}

export default NewStudentForm;
