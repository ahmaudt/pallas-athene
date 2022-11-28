import React from 'react';
import StudentPlanList from './StudentPlanList';
import StudentInfoForm from './StudentInfoForm';

function StudentDetail({ onEditStudent, plans, onSelectPlan, onDeletePlan, studentId, onPageChange }) {

    return (
        <React.Fragment>
            <StudentInfoForm onPageChange={onPageChange} studentId={studentId} onEditStudent={onEditStudent} />
            <StudentPlanList studentId={studentId} plans={plans} onSelectPlan={onSelectPlan} onDeletePlan={onDeletePlan} />
        </React.Fragment>
    )
}

export default StudentDetail;