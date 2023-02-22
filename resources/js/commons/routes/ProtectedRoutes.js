import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";
import { Outlet, useLocation } from 'react-router'
import { Route, Routes } from 'react-router-dom'
import Configs from "../../components/admin/config";
import Departments from "../../components/admin/config/departments";
import TerminationReasons from "../../components/admin/config/termination-reasons";
import Users from "../../components/admin/config/users";
import PageWrapper from "../../components/admin/page-wrapper";
import Dashboard from "../../components/dashboard";
import AllEmployees from "../../components/employees/all-employees";
import ContactDetails from "../../components/employees/detail/contact-details";
import Dependants from "../../components/employees/detail/dependants";
import EmergencyContact from "../../components/employees/detail/emergency-contact";
import EmployeeDetail from "../../components/employees/detail/employee-detail";
import Job from "../../components/employees/detail/job-detail";
import PersonalDetail from "../../components/employees/detail/personal-details";
import Qualifications from "../../components/employees/detail/qualifications";
import ReportsTo from "../../components/employees/detail/reports-to";
import Salary from "../../components/employees/detail/salary";
import { ModalRoutes } from "./ModalRoutes";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background

    return (
        <>
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='home'/>
                <Route exact element={<Dashboard/>} path='/'/>
                <Route exact element={<Dashboard/>} path='/js/*'/>
                <Route path='pim' element={<PageWrapper/>}>
                    <Route path='employees' element={<AllEmployees/>}/>
                    <Route path='employees/:id/:name' element={<EmployeeDetail/>}>
                        <Route path='' element={<PersonalDetail/>}/>
                        <Route path='personal-details' element={<PersonalDetail/>}/>
                        <Route path='contact-details' element={<ContactDetails/>}/>
                        <Route path='emergency-contacts' element={<EmergencyContact/>}/>
                        <Route path='dependents' element={<Dependants/>}/>
                        <Route path='job' element={<Job/>}/>
                        <Route path='salary' element={<Salary/>}/>
                        <Route path='reports-to' element={<ReportsTo/>}/>
                        <Route path='qualifications' element={<Qualifications/>}/>
                    </Route>
                </Route>
                <Route path='app/configs' element={<Configs/>}>
                    <Route element={<PageWrapper/>}>
                        <Route path='departments' element={<Departments/>}/>
                        <Route path='users' element={<Users/>}/>
                        <Route path='termination-reasons' element={<TerminationReasons/>}/>
                    </Route>
                </Route>
                <Route exact>
                    <>not found</>
                </Route>
            </Routes>
            {background && (<><ModalRoutes/> <Outlet /></>)}
        </>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired
}
const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})
export default connect(mapStateToProps)(ProtectedRoutes)
