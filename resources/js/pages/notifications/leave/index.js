import {List, Spin} from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useLocation } from "react-router";
import { handleGetAllLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import { TlaError } from "../../../utils/messages";
import {Link} from "react-router-dom";
import TlaImage from "../../../commons/tla-image";
import NotificationHeader from "../notification-header";
import {capitalize} from "../../../utils";

function Leave({getLeaveRequests, leaveRequests}) {
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()
    const status = pathname.split('/').pop()
    useEffect(() => {
        getLeaveRequests(new URLSearchParams(`hr_status=${ status }`))
            .then(() => setLoading(false))
            .catch((err) => {
                TlaError(err.response.data.message)
                setLoading(false)
            })
    }, [pathname])

    return (
        <div>
            <NotificationHeader title={`${capitalize(status)} Leave  Requests`}/>
            <div className={'p-3'}>
                <Spin spinning={ loading }>
                    <List
                        itemLayout="horizontal"
                        dataSource={ leaveRequests?.data || [] }
                        renderItem={ (item) => (
                            <Link className={'!no-underline'} to={ `/notifications/leave-request/${item.id}/details` } state={ {id: item.id} }>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={ <TlaImage size={ 45 } name={ item.employee } preview={ false } src={ '' }/> }
                                        title={
                                            <>
                                                <span>{ `${ item.employee } requested` }</span>&nbsp;
                                                <b>{ item.startDate + ' - ' + item.endDate }</b>&nbsp;
                                                <span>off</span>
                                            </>
                                        }
                                        description={ item.date_requested }
                                    />
                                    <p className={ 'text-xs text-gray-500' }>{ item?.created_at }</p>
                                </List.Item>
                            </Link>
                        ) }
                    />
                </Spin>
            </div>
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
