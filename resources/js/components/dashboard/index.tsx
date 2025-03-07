import React from 'react'
import AdminDashboard from "./admin";
import EmployeeDashboard from "./employee-dashboard";
import {useAppSelector} from "../../hooks";

function Dashboard() {
    const {loggedInUser, activeRoles } = useAppSelector((state) => state.user)

    return (
        <div className={'mt-1.5'}>
            {
                activeRoles.includes('staff') &&
                <EmployeeDashboard/>
            }

            {
                (activeRoles.includes('admin') || activeRoles.includes('super-admin') || loggedInUser.username === "support") &&
                <AdminDashboard/>
            }
        </div>
    )
}

export default Dashboard
