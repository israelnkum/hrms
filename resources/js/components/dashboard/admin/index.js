import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";

function AdminDashboard () {
    return (
        <div>
            Admin Dashboard
        </div>
    )
}

AdminDashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles : state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(AdminDashboard)
