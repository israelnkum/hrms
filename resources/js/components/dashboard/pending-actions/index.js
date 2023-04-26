import { Card, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { AiOutlineNotification } from "react-icons/ai";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleGetPendingActions } from "../../../actions/commons/CommonAction";
import PendingItem from "./pending-item";

function PendingActions({getPendingActions, employeeId}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPendingActions(employeeId).then(() => setLoading(false))
    }, [])

    return (
        <Card actions={ [
            <Link key={ 'notifications' } to={ '/notifications/leave-request' }>
                View all notifications
            </Link>] }
              title={
                  <div className={ 'flex items-center justify-between gap-x-2' }>
                      <div className={ 'flex gap-2 items-center' }>
                          <AiOutlineNotification className={ 'text-3xl' }/>
                          What is happening in TTU?
                      </div>
                      <div>
                          <Link to={ '/announcements' } className={ 'bg-blue-800 text-white p-1 text-sm rounded-lg' }>
                              Announcements
                          </Link>
                      </div>
                  </div>
              }
              className={ 'rounded-lg border-none shadow-sm h-full' }>
            <Spin spinning={ loading }>
                <div className={ 'overflow-auto max-h-[200px]' }>
                    <PendingItem/>
                </div>
            </Spin>
        </Card>
    )
}

PendingActions.propTypes = {
    getPendingActions: PropTypes.func.isRequired,
    employeeId: PropTypes.any
}

const mapStateToProps = (state) => ({
    employeeId: state.userReducer.loggedInUser.employee_id
})


const mapDispatchToProps = (dispatch) => ({
    getPendingActions: (supervisorId) => dispatch(handleGetPendingActions(supervisorId))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingActions)
