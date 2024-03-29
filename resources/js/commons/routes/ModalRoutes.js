import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CommunityServicesForm from "../../components/employees/detail/community-services/community-services-form";
import ContactDetailsForm from "../../components/employees/detail/contact-details/contact-details-form";
import DependantsForm from "../../components/employees/detail/dependants/dependants-form";
import EmergencyContactForm from "../../components/employees/detail/emergency-contact/emergency-contact-form";
import JobDetailsForm from "../../components/employees/detail/job-detail/job-details-form";
import NextOfKinForm from "../../components/employees/detail/next-of-kin/next-of-kin-form";
import PreviousPositionForm from "../../components/employees/detail/previous-positions/previous-position-form";
import PreviousRankForm from "../../components/employees/detail/previous-ranks/previous-rank-form";
import QualificationsForm from "../../components/employees/detail/qualifications/qualifications-form";
import EmployeeForm from "../../components/employees/employee-form";
import TimeOffForm from "../../components/time-off/time-off-form";
import LeaveTypeForm from "../../pages/leave-management/leave-types/leave-type-form";
import PreviewFile from "../preview-file";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="employees">
                <Route exact path="form" element={<EmployeeForm/>}/>
                <Route exact path=":id/:name">
                    <Route exact path="edit" element={<EmployeeForm/>}/>
                    <Route exact path="next-of-kin/form" element={<NextOfKinForm />} />
                    <Route exact path="qualifications/form" element={<QualificationsForm />} />
                    <Route exact path="emergency-contacts/form" element={<EmergencyContactForm />} />
                    <Route exact path="contact-details/form" element={<ContactDetailsForm />} />
                    <Route exact path="job">
                        <Route exact path="form" element={<JobDetailsForm />} />
                        <Route exact path="previous-positions/form" element={<PreviousPositionForm />} />
                        <Route exact path="previous-ranks/form" element={<PreviousRankForm />} />
                    </Route>
                    <Route exact path="dependents/form" element={<DependantsForm />} />
                    <Route exact path="community-services/form" element={<CommunityServicesForm />} />
                </Route>
            </Route>
            <Route exact path="time-off/form" element={<TimeOffForm/>}/>
            <Route exact path="leave-management/leave-types/form" element={<LeaveTypeForm/>}/>
            <Route exact path="preview/:fileName" element={<PreviewFile/>}/>
        </Routes>
    )
}
