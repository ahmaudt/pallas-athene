import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function StudentListItem({ ugaId, studentId, firstName, lastName, major, minor }) {
    // should pass in student_id as a prop down to the link

    return (
        <React.Fragment>
            <tr>
                <td>{lastName}</td>
                <td>{firstName}</td>
                <td>{major}</td>
                <td>{minor}</td>
                <td>{ugaId}</td>
                <td>
                    <Link to={`/students/${studentId}`}>
                        <Button size='sm' className='rounded-0' variant='outline-primary'>
                            View
                        </Button>
                    </Link>
                </td>
            </tr>   
        </React.Fragment>
    )
}

export default StudentListItem;