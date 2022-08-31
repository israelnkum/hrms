import React from 'react'
import { Route, Routes } from 'react-router-dom'
import EmployeeForm from "../../components/employees/employee-form";

export const ModalRoutes = () => {
  return (
        <Routes>
            <Route exact path="pim">
                <Route exact path="add" element={<EmployeeForm/>}/>
            </Route>
        </Routes>
  )
}
