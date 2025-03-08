import {Route, Routes} from "react-router-dom";
import AppLayout from "../app-layout";
import Dashboard from "../../components/dashboard";
import AllEmployees from "../../components/employees/all-employees";
import EmployeeDetail from "../../components/employees/detail/employee-detail";
import PersonalDetail from "../../components/employees/detail/personal-details";
import NextOfKin from "../../components/employees/detail/next-of-kin";
import ContactDetails from "../../components/employees/detail/contact-details";
import EmergencyContact from "../../components/employees/detail/emergency-contact";
import Dependants from "../../components/employees/detail/dependants";
import JobDetailWrapper from "../../components/employees/detail/job-detail/job-detail-wrapper";
import Job from "../../components/employees/detail/job-detail";
import PreviousPositions from "../../components/employees/detail/previous-positions";
import PreviousRanks from "../../components/employees/detail/previous-ranks";
import Salary from "../../components/employees/detail/salary";
import ReportsTo from "../../components/employees/detail/reports-to";
import Qualifications from "../../components/employees/detail/qualifications";
import CommunityServices from "../../components/employees/detail/community-services";
import {ModalRoutes} from "./ModalRoutes";
import {Outlet, useLocation} from "react-router";
import {useEffect, useState} from "react";
import {useAppDispatch} from "../../hooks";
import {handleGetCommonData} from "../../services/common.service";
import {unwrapResult} from "@reduxjs/toolkit";
import People from "../../pages/people";
import Loading from "../../components/loading";

const ProtectedRoutes = () => {
    const location = useLocation()
    const background = location.state && location.state.background
    const [loading, setLoading] = useState(true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(handleGetCommonData()).then(unwrapResult).then(() => setLoading(false)).catch(() => setLoading(false))
    }, []);

    if (loading) return <Loading/>

    return (
        <>
            <Routes location={background || location}>
                <Route element={<AppLayout/>}>
                    <Route index element={<Dashboard/>} path='/'/>
                    <Route index element={<Dashboard/>} path='home'/>
                    <Route element={<Dashboard/>} path='/js/*'/>
                    <Route path='pim'>
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
                    <Route path={'people'} element={<People/>}/>
                </Route>
            </Routes>
            {background && (<><ModalRoutes/> <Outlet/></>)}
        </>
    )
}

export default ProtectedRoutes
