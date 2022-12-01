import React from "react";
import { Button, Card, Col, Row, Table} from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import AcademicPlan from "./AcademicPlan";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function StudentPlanList({ plans, onDeletePlan }) {
  const params = useParams();
  const studentPlans = plans.filter((p) => p.student.id === parseInt(params.id));
  
  const planList = studentPlans.map((p) => {
    return <AcademicPlan key={p.id} id={p.id} current_term={p.data.current_term} advising_term={p.data.advising_term} onDeletePlan={onDeletePlan} />
  });

    return (
        <React.Fragment>
            <Row>
                <Col>
                  <Card className="rounded-0" style={{ padding: "0" }}>
                    <CardHeader>
                      <h2 className="float-start">Academic Plans</h2>
                      <Link to={`/students/${params.id}/new_plan`}>
                        <Button size="sm" className="float-end rounded-0" variant="outline-success">New Plan</Button>
                      </Link>
                    </CardHeader>
                    <Card.Body>
                      <Table striped borderless size="sm">
                        <thead>
                          <tr>
                            <th>Term Created</th>
                            <th>Term Advised For</th>
                            <th>View Plan</th>
                            <th>Edit Plan</th>
                            <th>Delete Plan</th>
                          </tr>
                        </thead>
                        <tbody>
                          {planList}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
        </React.Fragment>
    )
}

export default StudentPlanList;