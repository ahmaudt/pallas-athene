import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, FormControl, Row, Table } from "react-bootstrap";
import StudentListItem from "./StudentListItem";
import MainNav from "./MainNav";

function StudentList({ searchItem, onSearchChange }) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch("/api/v1/students")
      .then((r) => r.json())
      .then((data) => setStudents(data));
  }, []);

  const displayedStudents = students?.filter((student) => {
    if (student?.data?.last_name.toLowerCase().includes(searchItem?.toLowerCase()) || student?.data?.first_name.toLowerCase().includes(searchItem?.toLowerCase()) || student?.data?.programs[0]?.program_code.toLowerCase().includes(searchItem?.toLowerCase())) {
      return student
    }
  })

  const renderStudents = displayedStudents?.map((s) => (
      <StudentListItem
        key={s.id}
        firstName={s.data.first_name}
        lastName={s.data.last_name}
        major={
          s.data.programs?.map((program) => {
            if (program.program_type === "major") {
              return program.program_code
            }
          })
        }
        minor={
          s.data.programs?.map((program) => {
            if (program.program_type === "minor") {
              return program.program_code
            }
          })
        }
        id={s.data.uga_my_id}
        student={s}
        studentId={s.id}
        ugaId={s.data.uga_my_id}
      />
    ));


  return (
    <React.Fragment>
      <MainNav />
      <Row>
        <Col>
          <Card style={{ padding: "0" }}>
            <Card.Header>
              <h2>Students</h2>
              <FormControl type="text" placeholder="search" value={searchItem} onChange={(e) => onSearchChange(e.target.value)}/>
            </Card.Header>
            <Card.Body>
              <Table striped borderless size="sm">
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>UGA MyID</th>
                    <th>View</th>
                  </tr>
                </thead>
                <tbody>
                  {renderStudents}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default StudentList;
