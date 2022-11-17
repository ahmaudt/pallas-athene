import React from 'react';
import { Link } from 'react-router-dom';

function StudentListItem({ studentId, firstName, lastName, major }) {
    // should pass in student_id as a prop down to the link

    return (
        <React.Fragment>
            <tr>
                <td>{lastName}</td>
                <td>{firstName}</td>
                <td>{ major }</td>
                <td>{studentId}</td>
                <td>
                    <Link to={`/students/${studentId}`}>
                        <button type='button'>
                            View
                        </button>
                    </Link>
                </td>
            </tr>   
        </React.Fragment>
    )
}

export default StudentListItem;