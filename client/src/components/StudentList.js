import React from "react";
import { useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useParams } from "react-router-dom";
import StudentListItem from "./StudentListItem";

function StudentList({ students, onSelectStudent }) {
  const renderStudents = students.map((s) => (
      <StudentListItem
        key={s.id}
        firstName={s.data.first_name}
        lastName={s.data.last_name}
        major={
          s.data.programs.map((program) => {
            if (program.program_type === "major") {
              return program.program_code
            }
          })
        }
        minor={
          s.data.programs.map((program) => {
            if (program.program_type === "minor") {
              return program.program_code
            }
          })
        }
        id={s.data.uga_my_id}
        student={s}
        studentId={s.id}
      />
    ));


  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card style={{ padding: "0" }}>
            <Card.Header>
              <h2>Students</h2>
            </Card.Header>
            <Card.Body>
              <Table striped borderless size="sm">
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Major</th>
                    <th>Minor</th>
                    <th>Student ID</th>
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
