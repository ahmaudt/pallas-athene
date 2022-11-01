import React from "react";
import { Button, Card, Col, Container, Row, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

function PrintPlan() {
  const params = useParams();

  const [plan, setPlan] = useState({
    student_id: "",
    advising_term: "",
    current_term: "",
    recommendations: [
      {
        course: "",
        requirement: "",
        alt_course: ""
      }
    ],
    notes: ""
  });

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan.data)
        setStudent(plan.student)});
  }, [params.id]);

  console.log(plan);

  if (!plan || !student) {
    <h1>Loading...</h1>;
  }

  return (
    <Container>
        <Row>
            <Col>
                <Row>
                    <Col>
                        <Table className="borderless">
                            <thead>
                                <tr>
                                    <Card className="rounded-0">
                                        <Card.Header className="bg-danger text-white rounded-0">
                                            <Card.Text>
                                            <a href="http://bulletin.uga.edu/Bulletin_Files/acad/Advising.html">
                                                    <strong>
                                                    From the UGA Bulletin:
                                                    <i class="fa fa-external-link-alt" aria-hidden="true"></i>
                                                    </strong>
                                                </a>{" "}
                                                <em>
                                                    Students are expected to be full participants in academic
                                                    advising and thus to be both prepared for and engaged in the
                                                    advising experience. The academic landscape is always
                                                    subject to change, and although advisors can provide advice,
                                                </em>{" "}
                                                <strong>
                                                    each student is ultimately responsible for knowing and
                                                    understanding the degree requirements and policies related
                                                    to his/her own academic progress.
                                                </strong>
                                            </Card.Text>
                                        </Card.Header>
                                    </Card>
                                </tr>
                            </thead>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Table className="borderless">
                            <thead>
                                <Card className="rounded-0">
                                    <Card.Header className="rounded-0">
                                        <Card.Title>Notes</Card.Title>
                                    </Card.Header>
                                </Card>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <MarkdownPreview source={plan.notes} />
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Card className="rounded-0">
                            <Card.Header className="rounded-0">
                                <Card.Title>Term Recommendations</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Table size="sm">
                                    <thead>
                                        <tr>
                                            <th>requirement</th>
                                            <th>course</th>
                                            <th>alt course</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {plan?.recommendations.map((r) => (
                                        <>
                                            <tr key={r.id}>
                                            <td className="bg-success text-white">{r.requirement}</td>
                                            <td className="bg-primary text-white text-center">{r.course}</td>
                                            <td className="bg-warning text-white text-center">{r.alt_course}</td>
                                            </tr>
                                        </>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
    );
}

export default PrintPlan;
