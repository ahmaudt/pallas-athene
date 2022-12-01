import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";


function AcademicPlan({ id, current_term, advising_term, onDeletePlan }) {
    function handleDelete(id) {
        fetch(`/plans/${id}/delete`, {
            method: "DELETE"
        })
        .then((r) => r.json())
        .then(() => {
            onDeletePlan(id);
        });
    }

    return (
        <tr>
            <td>{current_term}</td>
            <td>{advising_term}</td>
            <td>
                <Link to={`/plans/${id}/view`} target="_blank" >
                    <Button size="sm" className="rounded-0" variant="outline-secondary">View</Button>
                </Link>
            </td>
            <td>
                <Link to={`/plans/${id}/edit`}>
                    <Button size="sm" className="rounded-0" variant="outline-primary">Edit</Button>
                </Link>
            </td>
            <td>
                <Button size="sm" className="rounded-0" variant="outline-danger" onClick={() => handleDelete(id)}>Delete</Button>
            </td>
      </tr>
    )
}

export default AcademicPlan;
