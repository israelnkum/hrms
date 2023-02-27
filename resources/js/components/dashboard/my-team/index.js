import { Card, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { FiUsers } from "react-icons/fi";
import { connect } from "react-redux";
import { handleGetLeaveTypes } from "../../../actions/time-off/TimeOffAction";

function MyTeam({getLeaveTypes}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLeaveTypes().then(() => setLoading(false))
    }, [])

    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <FiUsers className={ 'text-2xl' }/>
                    <p>My Team</p>
                </div>
            }
            className={ 'border px-4 rounded-lg border-none shadow-sm' }>
            <Spin spinning={ loading }>

            </Spin>
        </Card>
    )
}

MyTeam.propTypes = {
    getLeaveTypes: PropTypes.func.isRequired,
    leaveTypes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    leaveTypes: state.timeOffReducer.leaveTypes
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveTypes: () => dispatch(handleGetLeaveTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(MyTeam)
