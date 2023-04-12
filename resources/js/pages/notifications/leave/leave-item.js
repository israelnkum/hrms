import { List } from "antd";
import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { handleChangeLeaveRequestStatus } from "../../../actions/time-off/TimeOffAction";
import TlaImage from "../../../commons/tla-image";

function LeaveItem({data, changeLeaveStatus}) {
    return (
        <List
            itemLayout="horizontal"
            dataSource={ data }
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
    )
}

LeaveItem.propTypes = {
    data: PropTypes.array.isRequired,
    changeLeaveStatus: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    changeLeaveStatus: (payload) => dispatch(handleChangeLeaveRequestStatus(payload, true))
})

export default connect(null, mapDispatchToProps)(LeaveItem)