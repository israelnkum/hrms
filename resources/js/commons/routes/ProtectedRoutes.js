import {Spin} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {Outlet, useLocation} from 'react-router'
import {Route, Routes} from 'react-router-dom'
import {handleGetHolidays} from "../../actions/time-off/TimeOffAction";
import Configs from "../../components/admin/config";
import Departments from "../../components/admin/config/departments";
import TerminationReasons from "../../components/admin/config/termination-reasons";
import Users from "../../components/admin/config/users";
import PageWrapper from "../../components/admin/page-wrapper";
import Announcements from "../../components/announcements";
import Dashboard from "../../components/dashboard";
import AllEmployees from "../../components/employees/all-employees";
import CommunityServices from "../../components/employees/detail/community-services";
import ContactDetails from "../../components/employees/detail/contact-details";
import Dependants from "../../components/employees/detail/dependants";
import EmergencyContact from "../../components/employees/detail/emergency-contact";
import EmployeeDetail from "../../components/employees/detail/employee-detail";
import PersonalDetail from "../../components/employees/detail/personal-details";
import Qualifications from "../../components/employees/detail/qualifications";
import ReportsTo from "../../components/employees/detail/reports-to";
import Salary from "../../components/employees/detail/salary";
import AllTimeOffs from "../../components/time-off/all-time-offs";
import AllLeaveRequests from "../../pages/leave-management/leave-request/all-leave-requests";
import LeaveTypes from "../../pages/leave-management/leave-types";
import People from "../../pages/people";
import {ModalRoutes} from "./ModalRoutes";
import notificationsRoute from "./notifications-route";
import NextOfKin from "../../components/employees/detail/next-of-kin";
import JobDetailWrapper from "../../components/employees/detail/job-detail/job-detail-wrapper";
import Job from "../../components/employees/detail/job-detail";
import PreviousPositions from "../../components/employees/detail/previous-positions";
import PreviousRanks from "../../components/employees/detail/previous-ranks";

const ProtectedRoutes = ({getHolidays}) => {
    const [loading, setLoading] = useState(true)

    const location = useLocation()
    const background = location.state && location.state.background

    useEffect(() => {
        getHolidays().then(() => {
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    return (
        <Spin spinning={loading} tip={'Please wait'}>
            {background && (<React.Fragment><ModalRoutes/> <Outlet/></React.Fragment>)}
            <Routes location={background || location}>
                <Route exact element={<Dashboard/>} path='home'/>
                <Route exact element={<Dashboard/>} path='/'/>
                <Route exact element={<Dashboard/>} path='/js/*'/>
                <Route path='pim' element={<PageWrapper/>}>
                    <Route path='employees' element={<AllEmployees/>}/>
                </Route>
                <Route path='employees/:id/:name' element={<EmployeeDetail/>}>
                    <Route index element={<PersonalDetail/>}/>
                    <Route path='personal-details' element={<PersonalDetail/>}/>
                    <Route path='next-of-kin' element={<NextOfKin/>}/>
                    <Route path='contact-details' element={<ContactDetails/>}/>
                    <Route path='emergency-contacts' element={<EmergencyContact/>}/>
                    <Route path='dependents' element={<Dependants/>}/>
                    <Route path='job' element={<JobDetailWrapper/>}>
                        <Route index element={<Job/>}/>
                        <Route index path={'previous-positions'} element={<PreviousPositions/>}/>
                        <Route index path={'previous-ranks'} element={<PreviousRanks/>}/>
                    </Route>
                    <Route path='salary' element={<Salary/>}/>
                    <Route path='direct-reports' element={<ReportsTo/>}/>
                    <Route path='qualifications' element={<Qualifications/>}/>
                    <Route path='community-services' element={<CommunityServices/>}/>
                </Route>
                <Route element={<PageWrapper/>}>
                    <Route path='time-offs' element={<AllTimeOffs/>}/>
                    <Route path={'announcements'} element={<Announcements/>}/>
                    <Route path={'people'} element={<People/>}/>
                    <Route path={'leave-management'}>
                        <Route path={'leave-types'} element={<LeaveTypes/>}/>
                        <Route path={'leave-requests'} element={<AllLeaveRequests/>}/>\
                    </Route>
                    {notificationsRoute}
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
        </Spin>
    )
}

ProtectedRoutes.propTypes = {
    activeRoles: PropTypes.array.isRequired,
    getHolidays: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    activeRoles: state.userReducer.activeRoles
})

const mapDispatchToProps = (dispatch) => ({
    getHolidays: () => dispatch(handleGetHolidays()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes)
