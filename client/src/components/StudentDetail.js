import React from 'react';
import StudentPlanList from './StudentPlanList';
import StudentInfoForm from './StudentInfoForm';

function StudentDetail({ onEditStudent, plans, onSelectPlan, onDeletePlan, studentId }) {
    return (
        <React.Fragment>
            <StudentInfoForm studentId={studentId} onEditStudent={onEditStudent} />
            <StudentPlanList studentId={studentId} plans={plans} onSelectPlan={onSelectPlan} onDeletePlan={onDeletePlan} />
        </React.Fragment>
    )
}

export default StudentDetail;