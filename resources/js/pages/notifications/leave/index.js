import { Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { handleGetAllLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import { TlaError } from "../../../utils/messages";
import LeaveItem from "./leave-item";

function Leave({getLeaveRequests, leaveRequests}) {
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()
    useEffect(() => {
        getLeaveRequests(new URLSearchParams(`hr_status=${ pathname.split('/').pop() }`))
            .then(() => setLoading(false))
            .catch((err) => {
                TlaError(err.response.data.message)
                setLoading(false)
            })
    }, [pathname])

    return (
        <div>
            <Spin spinning={ loading }>
                <LeaveItem data={ leaveRequests?.data || [] }/>
            </Spin>
        </div>
    )
}

Leave.propTypes = {
    getLeaveRequests: PropTypes.func,
    leaveRequests: PropTypes.object,
}

const mapStateToProps = (state) => ({
    leaveRequests: state.leaveManagementReducer.leaveRequests,
    permissions: state.userReducer.permissions
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveRequests: (payload) => dispatch(handleGetAllLeaveRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(Leave)
