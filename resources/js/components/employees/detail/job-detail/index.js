import {Spin} from "antd";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetSingleJobDetail} from "../../../../actions/employee/job-details/JobDetailsAction";
import DetailWrapper from "../detail-wrapper";


function Job(props) {
    const {getJobDetails, employeeId, jobDetail} = props
    const {info_update} = jobDetail

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getJobDetails(employeeId).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={loading} tip={'Please wait'}>
            <DetailWrapper
                oldData={jobDetail}
                newData={info_update}
                fields={[
                    'job_title', 'joined_date', 'location',
                    'job_category', 'contract_start_date', 'contract_end_date', 'sub_unit'
                ]}/>
        </Spin>
    )
}

Job.propTypes = {
    getJobDetails: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    jobDetail: PropTypes.object,
}

const mapStateToProps = (state) => ({
    jobDetail: state.jobDetailsReducer.jobDetail,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    getJobDetails: (id) => dispatch(handleGetSingleJobDetail(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Job)
