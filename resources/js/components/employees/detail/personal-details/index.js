import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router";
import {handleGetSingleEmployee} from "../../../../actions/employee/EmployeeAction";
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import DetailWrapper from "../detail-wrapper";

function PersonalDetails(props) {
    const {getEmployee, employee} = props
    const {id} = useParams()
    const {info_update} = employee
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEmployee(id).then(() => setLoading(false))
    }, [])
    return (
        <ViewAllWrapper loading={loading} noData={false}>
            <DetailWrapper
                oldData={employee}
                newData={info_update}
                fields={[
                    'staff_id', 'first_name', 'middle_name', 'last_name', 'gender', 'marital_status', 'dob',
                    'department', 'gtec_placement_name', 'qualification', 'rank', 'ssnit_number'
                ]} editLink={`/employees/${id}/${employee.name}/edit`}/>
        </ViewAllWrapper>
    )
}

PersonalDetails.propTypes = {
    getEmployee: PropTypes.func,
    employee: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee
})

const mapDispatchToProps = (dispatch) => ({
    getEmployee: (payload) => dispatch(handleGetSingleEmployee(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)
