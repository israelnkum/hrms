import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";
import AdminDashboard from "./admin";
import EmployeeDashboard from "./employee";

function Dashboard({activeRoles}) {
    return (
        <div className={'mt-1.5 w-full'}>
            {
                activeRoles.includes('staff') &&
                <EmployeeDashboard/>
            }

            {
                (activeRoles.includes('admin') || activeRoles.includes('super-admin')) &&
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
