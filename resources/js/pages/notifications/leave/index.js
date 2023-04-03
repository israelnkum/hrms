import { Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { handleGetAllLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import LeaveItem from "./leave-item";

function Leave({ getLeaveRequests, leaveRequests }) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLeaveRequests(new URLSearchParams(`status=pending`)).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <div>
            <div>

            </div>
           <Spin spinning={loading}>
               <LeaveItem data={leaveRequests?.data || [] }/>
           </Spin>
        </div>
    )
}


Leave.defaultProps = {}

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
