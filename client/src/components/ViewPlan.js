import React from "react";
import { Button, Card, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";

function ViewPlan() {
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
  });

  const [student, setStudent] = useState(null);

  useEffect(() => {
    fetch(`/api/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan.data)
        setStudent(plan.student)});
  }, [params.id]);

  if (!plan || !student) {
    <h1>Loading...</h1>;
  }

  return (
    <Table borderless>
      <tbody>
        <tr>
          <td>
            <Card bg="danger" text="light" className="rounded-0">
              <Card.Header className="rounded-0">
                <Card.Title>Header</Card.Title>
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
          </td>
        </tr>
        <tr>
          <td>
            <Card style={{ marginTop: "0" }} className="rounded-0">
              <Card.Header style={{ marginTop: "0" }}>
                <Card.Title>Recommendations</Card.Title>
              </Card.Header>
              <Card.Body style={{ marginTop: "0" }}>
                <Table className="" bordered striped hover style={{ marginTop: "0" }}>
                  <thead style={{ marginTop: "0" }}>
                    <tr>
                      <th>Requirement</th>
                      <th>Course</th>
                      <th>Alt Course</th>
                    </tr>
                  </thead>
                  <tbody style={{ marginTop: "0" }}>
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
            <Table borderless style={{ marginTop: "0" }}>
              <Card style={{ marginTop: "0" }} className="rounded-0">
                <Card.Header style={{ marginTop: "0" }}>
                  <Card.Title>Notes</Card.Title>
                </Card.Header>
                <Card.Body>
                  <tr className="justify-content-center">
                    <td className="justify-content-center" colSpan={3}>
                      <MarkdownPreview source={plan.notes} />
                    </td>
                  </tr>
                </Card.Body>
                <Card.Footer>
                  <Link to={`/plans/${plan?.id}/edit`}>
                    <Button variant="danger" type="button">
                      Edit
                    </Button>
                  </Link>
                  <Link to={`/students/${student?.id}`}>
                    <Button variant="secondary" type="button">
                      Cancel
                    </Button>
                  </Link>
              </Card.Footer>
              </Card>
            </Table>
          </td>
        </tr>
      </tbody>
    </Table>
  );
}

export default ViewPlan;
