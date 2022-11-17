import React from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  Row,
  Tab,
  Table,
} from "react-bootstrap";
import { useParams, useMatch } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  light,
  thin,
  duotone,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

function Print({ onPageChange }) {
  const params = useParams();

  const [plan, setPlan] = useState({
    student_id: "",
    advising_term: "",
    current_term: "",
    recommendations: [
      {
        course: "",
        requirement: "",
        alt_course: "",
      },
    ],
    notes: "",
  });

  const [student, setStudent] = useState({
    first_name: "",
    last_name: "",
    uga_my_id: "",
    programs: [
      {
        program_name: "",
        program_code: "",
        credit_hrs: "",
      },
    ],
    pre_professional: "",
    matriculation_term: "",
    graduation_term: "",
  });

  useEffect(() => {
    fetch(`/plans/${params.id}`)
      .then((r) => r.json())
      .then((plan) => {
        setPlan(plan.data);
        setStudent(plan.student.data);
      });
    onPageChange(`/plans/${params.id}/view`);
  }, [params.id]);

  if (!plan || !student) {
    <h1>Loading...</h1>;
  }

  return (
      <div className="col">
        <div className="row">
          <div className="col">
            <div className="table-responsive">
              <table className="table table-borderless table-sm">
                <thead>
                  <tr>
                    <div className="card text-white bg-danger rounded-0">
                      <div className="card-header px-0 mx-0">
                        <h2 className="card-heading font-weight-bold">
                          {/* <FontAwesomeIcon
                            icon={{
                              name: "triangle-exclamation",
                              style: "solid",
                            }}
                            aria-hidden="true"
                          ></FontAwesomeIcon>{" "} */}
                          Academic Advising Notice
                        </h2>
                      </div>
                    </div>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="bg-danger text-white">
                      <a href="http://bulletin.uga.edu/Bulletin_Files/acad/Advising.html">
                        <strong>
                          From the UGA Bulletin:
                          {/* <FontAwesomeIcon
                            icon="fa fa-external-link-alt"
                            aria-hidden="true"
                          ></FontAwesomeIcon> */}
                        </strong>
                      </a>{" "}
                      <em>
                        Students are expected to be full participants in
                        academic advising and thus to be both prepared for and
                        engaged in the advising experience. The academic
                        landscape is always subject to change, and although
                        advisors can provide advice,
                      </em>{" "}
                      <strong>
                        each student is ultimately responsible for knowing and
                        understanding the degree requirements and policies
                        related to his/her own academic progress.
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row py-0 my-0">
          <div className="col py-0 my-0">
            <table className="table table-borderless py-0 my-0 bg-light">
              <tbody className=" py-0 my-0">
                <tr>
                  <div className="jumbotron jumbotron-fluid py-0 my-0">
                    <div className="container py-0 my-0">
                      <h1 className="display-4 fw-weight-bold">
                        {plan.advising_term} Academic Plan
                      </h1>
                    </div>
                  </div>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="row py-0 my-0">
          <div className="col py-0 my-0">
            <div className="card-group mx-0 px-0">
              <div className="card rounded-0 mx-0 px-0">
                <div className="card-header">
                  <h3 className="fw-bold">
                    {/* <FontAwesomeIcon
                      icon={icon({
                        name: "id-card",
                        style: "solid",
                        family: "sharp",
                      })}
                    />{" "} */}
                    Student Info
                  </h3>
                </div>
                <div className="card-body mx-0 px-0 py-0">
                  <div className="table-responsive">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <td>
                            <strong>Name</strong>
                          </td>
                          <td>
                            {student.first_name} {student.last_name}
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Advising Term</strong>
                          </td>
                          <td>
                            <strong className="text-success">
                              {plan.advising_term}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Matriculation Term</strong>
                          </td>
                          <td>
                            <strong className="text-primary">
                              {student.matriculation_term}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Graduation Term</strong>
                          </td>
                          <td>
                            <strong className="text-danger">
                              {student.graduation_term}
                            </strong>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <strong>Primary Program</strong>
                          </td>
                          <td>
                            <strong className="text-danger">
                              {student.programs[0].program_name}
                            </strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="card rounded-0">
                <div className="card-header">
                  <h3 className="fw-bold">
                    {/* <FontAwesomeIcon
                      icon={icon({
                        name: "graduation-cap",
                        style: "solid",
                        family: "sharp",
                      })}
                    />{" "} */}
                    Academic Programs
                  </h3>
                </div>
                <div className="card-body mx-0 px-0 my-0 py-0">
                  <div className="table-responsive-lg">
                    <table className="table table-sm">
                      <thead className="thead-light">
                        <tr>
                          <th>Type</th>
                          <th>Name</th>
                          <th>Hrs</th>
                        </tr>
                      </thead>
                      <tbody className="table-hover">
                        {student.programs.map((program) => (
                          <tr>
                            <td>{program.program_type}</td>
                            <td>{program.program_name}</td>
                            <td>{program.credit_hrs}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card rounded-0">
          <div className="card-header bg-success text-white rounded-0">
          {/* <FontAwesomeIcon icon={icon({name: 'memo-pad', style: 'solid', family: 'sharp'})} /> */}
            <h2 className="fw-bold"> Notes</h2>
          </div>
          <div className="card-body mx-0 px-0 py-0">
            <div className="table-responsive-lg">
              <table className="table table-sm">
                <tbody>
                    <MarkdownPreview source={plan.notes} />
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="row mx-0 px-0">
          <div className="col mx-0 px-0 my-0 py-0">
            <div className="card rounded-0 mx-0 px-0 my-0 py-0">
              <div className="card-header bg-danger text-white rounded-0">
              {/* <FontAwesomeIcon icon={icon({name: 'diploma', style: 'solid', family: 'sharp'})} />  */}
              <h2 className="fw-bold">Degree Notifications</h2>
              </div>
              <div className="card-body mx-0 px-0 py-0">
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>University Requirements to Complete</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>Campus Referrals</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
                <table className="table table-sm">
                  <thead className="table-light">
                    <tr>
                      <th>General Advising Items</th>
                    </tr>
                  </thead>
                  <tbody></tbody>
                </table>
              </div>
            </div>
            <div className="card rounded-0 mx-0 px-0">
              <div className="card-header bg-warning text-white rounded-0">
                <h3 className="font-weight-bold">
                  {/* <FontAwesomeIcon icon={icon({ name: "user-graduate", style: "solid" })}/> */}
                    {" "}
                  Academic Notifications
                </h3>
              </div>
              <div className="card-body mx-0 px-0">
                <div className="table-responsive-lg">
                  <table className="table table-sm">
                    <tbody></tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row mx-0 px-0 py-2">
          <div className="col px-0 mx-0">
            <div className="card rounded-0 mx-0 px-0">
              <div className="card-header mx-0">
                <h3 className="fw-bold"></h3>
                    {/* <FontAwesomeIcon icon={icon({name: 'book', style: 'solid', family: 'sharp'})} /> Term Recommendations */}
              </div>
              <div className="card-body mx-0 px-0 py-0">
                <div className="table-responsive-lg">
                  <table className="table table-sm">
                    <thead className="thead-light">
                      <tr>
                        <th className="font-weight-bold small">
                          Register for{" "}
                          
                        </th>
                        <th className="font-weight-bold small">
                          which fulfills requirement{" "}
                          
                        </th>
                        <th className="text-center font-weight-bold small">
                          {" "}
                          or{" "}
                          
                        </th>
                        <th className="font-weight-bold small">
                          pick option from list below{" "}
                          
                        </th>
                      </tr>
                    </thead>
                    <tbody className="table-hover">
                      {plan.recommendations.map((recommendation) => (
                        <tr key={recommendation.id} className="py-0 my-0">
                          <td
                            className="py-3 fw-bold bg-primary text-light"
                            
                          >
                            {" "}
                            <MarkdownPreview
                              source={recommendation.course}
                              className="bg-primary text-light"
                            />
                          </td>
                          <td
                            className="py-3 fw-bold bg-success text-light"
                           
                          >
                            <MarkdownPreview
                              className="bg-success text-white"
                              source={recommendation.requirement}
                            />
                          </td>
                          <td
                            className="py-3 fw-bold bg-warning text-white"
                          >
                            or
                          </td>
                          <td
                            className="py-3 fw-bold text-end text-white bg-danger"
                           
                          >
                            <MarkdownPreview
                              className="bg-danger text-white text-end"
                              source={recommendation.alt_course}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Print;
