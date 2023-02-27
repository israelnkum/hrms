import { Button, Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useLocation, useOutletContext } from "react-router";
import { handleGetLeaveRequest } from "../../actions/time-off/TimeOffAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import ViewAllWrapper from "../../commons/view-all-wrapper";

const {Column} = Table

function AllTimeOffs(props) {
    const {setPageInfo, setExtra} = useOutletContext();
    const {getLeaveRequests, leaveRequests} = props
    const {data, meta} = leaveRequests
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()

    const status = pathname === '/time-off/pending' ? 'pending' : 'approved'

    useEffect(() => {
        setPageInfo({title: 'All Time Offs', addLink: '/pim/employees/form', buttonText: 'Employee'})
        getLeaveRequests(new URLSearchParams(`status=${ status }`)).then(() => {
            setLoading(false)
        })
    }, [pathname])

    const bgColors = {
        'pending': 'bg-blue-500',
        'approved': 'bg-success-700'
    }

    return (
        <div>
            <ViewAllWrapper loading={ loading } noData={ data.length === 0 }>
                <TlaTableWrapper filterObj={ {} } callbackFunction={ getLeaveRequests } data={ data } meta={ meta }>
                    <Column title="Leave Type" render={ (_, {leave_type}) => (
                        <>
                            <Space direction={ 'vertical' }>
                                <p className={'leading-none'}>{ leave_type }</p>
                                <div
                                    className={ `${ bgColors[status] } text-white py-px px-1 rounded-lg capitalize w-fit` }>
                                    { status }
                                </div>
                            </Space>
                        </>
                    ) }/>
                    <Column title="Employee" dataIndex={ 'employee' }/>
                    <Column title="Duration" render={ (_, {start_date, end_date, days_requested}) => (
                        <>
                            <Space className={'leading-none'} direction={ 'vertical' }>
                                <p>From: { start_date }</p>
                                <p>To: { end_date }</p>
                                <p>Days: { days_requested }</p>
                            </Space>
                        </>
                    ) }/>
                    <Column title="Approver" render={ (_, {approver}) => (
                        <>
                            <Space className={'leading-none'} direction={ 'vertical' }>
                                <p>{ approver }</p>
                                <Space>
                                    <Button size={'small'} className={'btn-primary'} >Approve</Button>
                                    <Button size={'small'} className={'btn-primary'} >Reject</Button>
                                </Space>
                            </Space>
                        </>
                    ) }/>
                    <Column title="" dataIndex={ '' }/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </div>
    )
}

AllTimeOffs.propTypes = {
    getLeaveRequests: PropTypes.func,
    leaveRequests: PropTypes.object
}

const mapStateToProps = (state) => ({
    leaveRequests: state.timeOffReducer.leaveRequests
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveRequests: (payload) => dispatch(handleGetLeaveRequest(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllTimeOffs)
