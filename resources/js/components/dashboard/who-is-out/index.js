import { Spin, Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { BsCalendar3 } from "react-icons/bs";
import { connect } from "react-redux";
import { handleGetLeaveTypes } from "../../../actions/time-off/TimeOffAction";

function WhoIsOut({getLeaveTypes}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getLeaveTypes().then(() => setLoading(false))
    }, [])


    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <BsCalendar3 className={ 'text-2xl' }/>
                    <p>Who&rsquo;s out?</p>
                </div>
            }
            className={ 'border px-4 rounded-lg border-none shadow-sm' }>
            <Spin spinning={ loading }>

            </Spin>
        </Card>
    )
}

WhoIsOut.propTypes = {
    getLeaveTypes: PropTypes.func.isRequired,
    leaveTypes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    leaveTypes: state.timeOffReducer.leaveTypes
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveTypes: () => dispatch(handleGetLeaveTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(WhoIsOut)
