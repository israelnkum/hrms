import {Route, Routes} from 'react-router-dom'
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
import FilterEmployees from "../../components/employees/filter-employees";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route path="employees">
                <Route path="filter" element={<FilterEmployees/>}/>
                <Route path="form" element={<EmployeeForm/>}/>
                <Route path=":id/:name">
                    <Route path="edit" element={<EmployeeForm/>}/>
                    <Route path="next-of-kin/form" element={<NextOfKinForm />} />
                    <Route path="qualifications/form" element={<QualificationsForm />} />
                    <Route path="emergency-contacts/form" element={<EmergencyContactForm />} />
                    <Route path="contact-details/form" element={<ContactDetailsForm />} />
                    <Route path="job">
                        <Route path="form" element={<JobDetailsForm />} />
                        <Route path="previous-positions/form" element={<PreviousPositionForm />} />
                        <Route path="previous-ranks/form" element={<PreviousRankForm />} />
                    </Route>
                    <Route path="dependents/form" element={<DependantsForm />} />
                    <Route path="community-services/form" element={<CommunityServicesForm />} />
                </Route>
            </Route>
            <Route path="time-off/form" element={<TimeOffForm/>}/>
            {/*<Route path="leave-management/leave-types/form" element={<LeaveTypeForm/>}/>*/}
        </Routes>
    )
}
