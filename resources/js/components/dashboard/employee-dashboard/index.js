import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";
import MyTeam from "../my-team";
import PendingActions from "../pending-actions";
import TimeOff from "../time-off";

function EmployeeDashboard() {
    return (
        <div className={ 'mx-1' }>
            <div className={ 'flex flex-wrap w-full gap-2 mb-2' }>
                <div className={ 'w-full sm:w-full md:w-[372px]' }>
                    <TimeOff/>
                </div>
                <div className={ 'grow' }>
                    <PendingActions/>
                </div>
            </div>
            <div className={ 'mb-2' }>
                <MyTeam/>
            </div>
            {/*<div className={ 'flex flex-wrap w-full gap-2' }>
                <div className={ 'flex-1' }>
                    <WhoIsOut/>
                </div>
                <div className={ 'flex-1' }>
                    <Celebrations/>
                </div>
                <div className={ 'flex-1' }>
                    <Celebrations/>
                </div>
            </div>*/}
        </div>
    )
}

EmployeeDashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles: state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(EmployeeDashboard)
