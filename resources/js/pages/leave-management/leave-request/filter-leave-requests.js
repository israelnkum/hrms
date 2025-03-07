import { Col, Row, Spin } from "antd";
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleExportAllLeaveRequest,
    handleGetAllLeaveRequest,
    handleGetFilterParams
} from "../../../actions/leave-management/leave-requests/Actions";
import FilterWrapper from "../../../commons/filter/filter-wrapper";
import TlaSelect from "../../../commons/tla/TlaSelect";
import { hrStatuses } from "../../../utils";

function FilterLeaveRequests(props) {
    const {submitFilter, filter, exportFilter, getFilterParams, filterParams, leaveTypes} = props
    const [fetched, setFetched] = useState(true)
    const initials = {
        ...filter,
        export: false
    }

    useEffect(() => {
        Object.keys(filterParams).length === 0 ?
            getFilterParams().then(() => setFetched(false)) :
            setFetched(false)
    }, [])

    return (
        <Spin spinning={ fetched }>
            <FilterWrapper
                print excel initialValue={ initials }
                submitFilter={ submitFilter }
                exportFilter={ exportFilter }>
                <Row gutter={ 10 }>
                    <Col span={ 6 } xs={ 24 } sm={ 24 } md={ 6 } lg={ 6 } xl={ 6 }>
                        <TlaSelect name={ 'hr_status' } optionKey={ 'self' } options={ hrStatuses } label={ 'status' }/>
                    </Col>
                    <Col span={ 6 } xs={ 24 } sm={ 24 } md={ 6 } lg={ 6 } xl={ 6 }>
                        <TlaSelect
                            name={ 'leave_type_id' } hasAll
                            optionKey={ 'name' }
                            options={ leaveTypes }
                            label={ 'leave type' }/>
                    </Col>
                    {
                        Object.keys(filterParams).length > 0 &&
                        <>
                            <Col span={ 6 } xs={ 24 } sm={ 24 } md={ 6 } lg={ 6 } xl={ 6 }>
                                <TlaSelect
                                    name={ 'supervisor_id' } hasAll
                                    optionKey={ 'name' }
                                    options={ filterParams?.supervisors }
                                    label={ 'Supervisor' }/>
                            </Col>
                            <Col span={ 6 } xs={ 24 } sm={ 24 } md={ 6 } lg={ 6 } xl={ 6 }>
                                <TlaSelect
                                    name={ 'hr_id' } hasAll
                                    optionKey={ 'name' }
                                    options={ filterParams?.hrs }
                                    label={ 'HR' }/>
                            </Col>
                        </>
                    }
                </Row>
            </FilterWrapper>
        </Spin>
    )
}

FilterLeaveRequests.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    getFilterParams: PropTypes.func,
    filter: PropTypes.object,
    filterParams: PropTypes.object,
    leaveTypes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    filter: state.leaveManagement.filter,
    filterParams: state.leaveManagement.filterParams,
    leaveTypes: state.timeOffReducer.leaveTypes
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllLeaveRequest(params)),
    exportFilter: (params) => dispatch(handleExportAllLeaveRequest(params)),
    getFilterParams: (params) => dispatch(handleGetFilterParams(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterLeaveRequests)
