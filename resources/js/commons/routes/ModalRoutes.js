import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeForm from "../../components/employees/employee-form";
import QualificationsForm from "../../components/employees/detail/qualifications/qualifications-form";

export const ModalRoutes = () => {
    return (
        <Routes>
            <Route exact path="pim">
                <Route exact path="add" element={<EmployeeForm />} />
            </Route>
            <Route exact path="qualifications">
                <Route exact path="/add" element={<QualificationsForm />} />
            </Route>
        </Routes>
    );
};
