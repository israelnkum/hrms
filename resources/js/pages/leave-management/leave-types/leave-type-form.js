import { Row } from 'antd'
import moment from "moment/moment";
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import { handleAddLeaveType, handleUpdateLeaveType } from "../../../actions/leave-management/leave-types/leave-management-action";
import TlaFormWrapper from "../../../commons/tla-form-wrapper";

function LeaveTypeForm(props) {
    const {addLeaveType, updateLeaveType} = props

    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        dob: state?.data ? (state?.data.dob ? moment(state?.data.dob) : null) : null,
    }


    return (
        <TlaFormWrapper
            width={ 520 }
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addLeaveType : updateLeaveType }
            formTitle={ `${ (formValues.id === 0 ? "New" : "Edit") } Leave Type` }>
            <Row gutter={ 10 }>

                <h1>Coming Soon</h1>
                {/*<Col span={8}>
                    <Form.Item name="first_name" label="First Name"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'First Name is Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>*/}
            </Row>
        </TlaFormWrapper>
    )
}

LeaveTypeForm.propTypes = {
    addLeaveType: PropTypes.func.isRequired,
    updateLeaveType: PropTypes.func.isRequired,
    departments: PropTypes.array.isRequired,
    ranks: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    departments: state.commonReducer.commons.departments,
    ranks: state.commonReducer.commons.ranks
});

const mapDispatchToProps = (dispatch) => ({
    addLeaveType: (payload) => dispatch(handleAddLeaveType(payload)),
    updateLeaveType: (payload) => dispatch(handleUpdateLeaveType(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveTypeForm)
