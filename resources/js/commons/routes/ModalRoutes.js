import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeForm from "../../components/employees/employee-form";
import QualificationsForm from "../../components/employees/detail/qualifications/qualifications-form";
import EmergencyContactForm from "../../components/employees/detail/emergency-contact/emergency-contact-form";
import ContactDetailsForm from "../../components/employees/detail/contact-details/contact-details-form";
import DependantsForm from "../../components/employees/detail/dependants/dependants-form";

export const ModalRoutes = () => {
  return (
        <Routes>
            <Route exact path="pim">
                <Route exact path="add" element={<EmployeeForm/>}/>
                <Route exact path="edit" element={<EmployeeForm/>}/>
                <Route exact path="employees/:id/:name">
                    <Route exact path="personal-details/edit" element={<EmployeeForm/>}/>
                    <Route exact path="qualifications">
                        <Route exact path="form" element={<QualificationsForm />} />
                    </Route>
                    <Route exact path="emergency-contacts">
                        <Route exact path="form" element={<EmergencyContactForm />} />
                    </Route>
                    <Route exact path="contact-details">
                        <Route exact path="form" element={<ContactDetailsForm />} />
                    </Route>
                    <Route exact path="dependents">
                        <Route exact path="form" element={<DependantsForm />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
  )
}
