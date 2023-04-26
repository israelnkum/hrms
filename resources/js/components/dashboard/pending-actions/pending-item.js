import { Button, List, Popover, Space, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useState } from 'react'
import { FiCheckCircle } from "react-icons/fi";
import { IoIosCloseCircleOutline, IoMdClose } from "react-icons/io";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleChangeLeaveRequestStatus } from "../../../actions/time-off/TimeOffAction";
import TlaImage from "../../../commons/tla-image";
import ValidateComponent from "../../../commons/validate-component";
import { TlaError, TlaSuccess } from "../../../utils/messages";

function PendingItem({data, changeLeaveStatus}) {
    const [saving, setSaving] = useState(false)

    const approveOrDisapprove = (leaveData, status) => {
        setSaving(true)

        const data = {
            id: leaveData.id,
            days_requested: leaveData.days_requested,
            start_date: leaveData.start_date,
            sup_reason: null,
            status: status
        }

        changeLeaveStatus(data).then(() => {
            TlaSuccess('Leave Request ' + status)
            setSaving(false)
        }).catch(() => {
            TlaError('Something went wrong')
            setSaving(false)
        })
    }

    // eslint-disable-next-line react/prop-types
    const Content = ({leaveData}) => (
        <Space size={ 'small' }>
            <ValidateComponent permissions={ ['approve-leave-request', 'approve-leave'] }>
                <Button
                    onClick={ () => {
                        approveOrDisapprove(leaveData, 'approved')
                    } }
                    title={ 'Approve Request' }
                    icon={ <FiCheckCircle className={ 'text-base' }/> }
                    className={ 'btn-success  h-8 !w-8' }/>
            </ValidateComponent>
            <ValidateComponent permissions={ ['decline-leave-request', 'disapprove-leave'] }>
                <Button
                    onClick={ () => {
                        approveOrDisapprove(leaveData, 'rejected')
                    } }
                    title={ 'Deny Request' }
                    icon={ <IoIosCloseCircleOutline className={ 'text-base' }/> }
                    className={ 'btn-danger  h-8 !w-8' }/>
            </ValidateComponent>
            <Button
                onClick={ () => {
                    approveOrDisapprove(leaveData, 'viewed')
                } }
                title={ 'Remove notification' }
                icon={ <IoMdClose className={ 'text-base' }/> }
                className={ 'h-8 !w-8' }/>
        </Space>
    )

    return (
        <Spin spinning={ saving }>
            <List
                itemLayout="horizontal"
                dataSource={ data }
                renderItem={ (item) => (

                    <List.Item>
                        <List.Item.Meta
                            avatar={ <TlaImage size={ 45 } name={ item.employee } preview={ false } src={ '' }/> }
                            title={
                                <Link to={ `/notifications/leave-request/${ item.id }/details` }
                                      state={ {id: item.id} }>
                                    <span>{ `${ item.employee } requested` }</span>&nbsp;
                                    <b>{ item.startDate + ' - ' + item.endDate }</b>&nbsp;
                                    <span>off</span>
                                </Link>
                            }
                            description={ item.date_requested }
                        />
                        <Popover content={ <Content leaveRequestId={ item.id }/> }>
                            <Content leaveData={ item }/>
                        </Popover>
                    </List.Item>
                ) }
            />
        </Spin>
    )
}

PendingItem.propTypes = {
    data: PropTypes.array.isRequired,
    changeLeaveStatus: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
    data: state.commonReducer.pendingActions.leaveRequest,
})

const mapDispatchToProps = (dispatch) => ({
    changeLeaveStatus: (payload) => dispatch(handleChangeLeaveRequestStatus(payload, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingItem)