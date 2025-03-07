import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input, Row } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import {
    handleAddPreviousPosition,
    handleUpdatePreviousPosition
} from "../../../../actions/employee/previous-positions/Action";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import TlaSelect from "../../../../commons/tla/TlaSelect";

function PreviousPositionForm(props) {
    const {addPreviousPosition, updatePreviousPosition, employeeId, positions} = props
    const {state} = useLocation()

    const formValues = {
        id: 0, employee_id: employeeId, ...state.data
    }

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addPreviousPosition : updatePreviousPosition }
            formTitle={ (formValues.id === 0 ? 'New' : 'Edit') + ' Position' }>
            <Row gutter={ 10 }>
                <Col span={ 24 }>
                    <TlaSelect name={ 'position_id' }
                               label={ 'Position' }
                               options={ positions } optionKey={ 'name' }
                               required/>
                </Col>
                <Col span={ 12 }>
                    <Form.Item name="start" label="Start Date">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item name="end" label="Start End">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden
                               name="id"
                               label="ID"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                    <Form.Item hidden
                               name="employee_id"
                               label="employee_id"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

PreviousPositionForm.propTypes = {
    addPreviousPosition: PropTypes.func.isRequired,
    updatePreviousPosition: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    positions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    employeeId: state.employeeReducer.employee.id,
    positions: state.commonReducer.commons.positions
})

const mapDispatchToProps = (dispatch) => ({
    addPreviousPosition: (payload) => dispatch(handleAddPreviousPosition(payload)),
    updatePreviousPosition: (payload) => dispatch(handleUpdatePreviousPosition(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousPositionForm)
