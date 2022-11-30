import React from 'react';
import StudentPlanList from './StudentPlanList';
import StudentInfoForm from './StudentInfoForm';
import MainNav from './MainNav';

function StudentDetail({ onEditStudent, plans, onSelectPlan, onDeletePlan, studentId, onPageChange }) {

    return (
        <React.Fragment>
            {/* <MainNav /> */}
            <StudentInfoForm onPageChange={onPageChange} studentId={studentId} onEditStudent={onEditStudent} />
            <StudentPlanList studentId={studentId} plans={plans} onSelectPlan={onSelectPlan} onDeletePlan={onDeletePlan} />
        </React.Fragment>
    )
}

export default StudentDetail;