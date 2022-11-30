import React from "react";
import { Button, Card, CardGroup, Col, Container, Row, Tab, Table } from "react-bootstrap";
import { useParams, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands, light, thin, duotone, icon } from '@fortawesome/fontawesome-svg-core/import.macro';

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

  const [student, setStudent] = useState({
  data: { first_name: "",
    last_name: "",
    uga_my_id: "",
    programs: [
        {
            program_name: "",
            program_code: "",
            credit_hrs: ""
        }
    ],
    pre_professional: "",
    matriculation_term: "",
    graduation_term: ""
  }});

  useEffect(() => {
    fetch(`/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan.data)
        setStudent(plan.student)});
  }, [params.id]);

  if (!plan || !student) {
    <h1>Loading...</h1>;
  }

  return (

    <Row>
        <Col>
            <Row className="mx-0 px-0">
                
                <Col>
                    <Table responsive borderless size="sm">
                        <thead className="table-light">
                            <tr>
                                <Card className="mx-0 px-0 bg-danger text-white rounded-0">
                                    <Card.Header className="px-0 mx-0 rounded-0 bg-danger">
                                        <h1 className="font-weight-bold px-5">Academic Advising Notice</h1>
                                    </Card.Header>
                                </Card>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="bg-danger text-white px-5">
                                    <a href="http://bulletin.uga.edu/Bulletin_Files/acad/Advising.html"><strong>From the UGA Bulletin:</strong></a> <em>Students are expected to be full participants in academic advising and thus to be 
                                    both prepared for and engaged in the advising experience. The academic landscape is always subject to change, 
                                    and although advisors can provide advice,</em> <strong>each student is ultimately responsible for knowing and understanding 
                                    the degree requirements and policies related to his/her own academic progress.</strong>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="py-0 my-0 mx-0 px-0">
                <Col className="py-0 my-0">
                    <Table borderless className="bg-light">
                        <tbody>
                            <div className="jumbotron jumbotron-fluid py-0 my-0">
                                <div className="container my-0 py-0">
                                    <h2 className="display-4 font-weight-bold">{plan.advising_term} Academic Plan</h2>
                                </div>
                            </div>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="py-0 my-0 mx-0 px-0">
                <Col className="py-0 my-0">
                    <CardGroup className="rounded-0">
                        <Card className="rounded-0 mx-0 px-0">
                            <Card.Header className="rounded-0">
                                <h3 className="font-weight-bold"><FontAwesomeIcon icon={icon({ name: 'id-card', style: 'solid', family: 'sharp' })} /> Student Info</h3>
                            </Card.Header>
                            <Card.Body className="mx-0 px-0 my-0 py-0">
                                <Table responsive size="sm">
                                    <tbody>
                                        <tr>
                                            <td><strong>Name</strong></td>
                                            <td>{student.data.first_name} {student.data.last_name}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Advising Term</strong></td>
                                            <td><strong className="text-success">{plan.advising_term}</strong></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Matriculation Term</strong></td>
                                            <td><strong className="text-primary">{student.matriculation_term}</strong></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Graduation Term</strong></td>
                                            <td><strong className="text-danger">{student.data.graduation_term}</strong></td>
                                        </tr>
                                        <tr>
                                            <td><strong>Primary Program</strong></td>
                                            <td><strong className="text-danger">{student.data.programs[0].program_name}</strong></td>
                                        </tr>

                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                        <Card className="rounded-0">
                            <Card.Header className="rounded-0">
                                <h3 className="font-weight-bold"><FontAwesomeIcon icon={icon({ name: 'graduation-cap', style: 'solid', family: 'sharp' })} /> Academic Programs</h3>
                            </Card.Header>
                            <Card.Body className="mx-0 px-0 my-0 py-0">
                                <Table responsive size="sm">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Type</th>
                                            <th>Name</th>
                                            <th>Hrs</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {student.data.programs.map((program, idx) => (
                                            <tr key={idx}>
                                                <td>{program.program_type}</td>
                                                <td>{program.program_name}</td>
                                                <td>{program.credit_hrs}</td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
            <Row className="mx-0 px-0">
                <Col>
                    <Card className="rounded-0">
                        <Card.Header className="bg-success text-white rounded-0">
                            <h2 className="font-weight-bold"><FontAwesomeIcon icon={icon({name: 'memo-pad', style: 'solid', family: 'sharp'})} /> Notes</h2>
                        </Card.Header>
                        <Card.Body className="">
                                <Table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <MarkdownPreview source={plan.notes} />
                                            </td>
                                        </tr>
                                    </tbody>
                                </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            
            <Row className="mx-0 px-0 py-2">
                <Col className="py-0 my-0">
                    <Card className="rounded-0">
                        <Card.Header className="rounded-0 mx-0">
                           <h2 className="font-weight-bold"><FontAwesomeIcon icon={icon({name: 'diploma', style: 'solid', family: 'sharp'})} /> Course Recommendations</h2>
                        </Card.Header>
                        <Card.Body className="mx-0 px-0 py-0">
                            <div className="table-responsive-lg">
                                <table className="table table-sm py-0">
                                    <thead className="thead-light">
                                        <tr>
                                            <th className="font-weight-bold small">Register for <FontAwesomeIcon icon={icon({ name: 'circle-arrow-down', style: 'regular' })} /></th>
                                            <th className="font-weight-bold small">which fulfills requirement <FontAwesomeIcon icon={icon({ name: 'circle-arrow-down', style: 'regular' })} /></th>
                                            <th className="font-weight-bold small"> or </th>
                                            <th className="font-weight-bold small">pick option from list below </th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-hover py-0">
                                        {plan.recommendations.map((recommendation, idx) => (
                                            <tr key={idx} className="py-0 my-0">
                                                <td className="py-3 font-weight-bold bg-primary text-white"><FontAwesomeIcon className="float-left mt-1 pr-1 fa-1xs" icon={icon({ name: 'chalkboard-user', style: 'light' })} /> <MarkdownPreview source={recommendation.course} className="bg-primary text-white"/></td>
                                                <td className="py-3 font-weight-bold bg-success text-white"><MarkdownPreview className="bg-success text-white" source={recommendation.requirement} /></td>
                                                <td className="py-3 font-weight-bold bg-warning text-white">or</td>
                                                <td className="py-3 font-weight-bold text-end text-white bg-danger"><MarkdownPreview className="bg-danger text-white text-end" source={recommendation.alt_course} /></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>   
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Col>
    </Row>
    );
}

export default PrintPlan;
