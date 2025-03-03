import PropTypes from "prop-types";
import React from 'react'
import {connect, useSelector} from "react-redux";
import AdminDashboard from "./admin";
import EmployeeDashboard from "./employee-dashboard";

function Dashboard({activeRoles}) {
    const user = useSelector(state => state.userReducer.loggedInUser)
    return (
        <div className={'mt-1.5'}>
            {
                activeRoles.includes('staff') &&
                <EmployeeDashboard/>
            }

            {
                (activeRoles.includes('admin') || activeRoles.includes('super-admin') || user.username === "support") &&
                <AdminDashboard/>
            }
        </div>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles: state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(Dashboard)
