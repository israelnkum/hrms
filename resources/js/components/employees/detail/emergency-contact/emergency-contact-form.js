import React from 'react'
import PropTypes from 'prop-types'
import {Col, Form, Input, Row} from 'antd'
import {connect} from 'react-redux'
import {useLocation} from "react-router-dom";
import {
    handleAddEmergencyContact,
    handleUpdateEmergencyContact
} from "../../../../actions/employee/emergency-contacts/EmergencyContactAction";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import {relationships} from "../../../../utils/nationalities";

function EmergencyContactForm (props) {
    const { addEmergencyContact, updateEmergencyContact, employeeId } = props
    const { state } = useLocation()
    const formValues = {
        id: 0, employee_id: employeeId, ...state.data
    }

    return (
        <TlaFormWrapper
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addEmergencyContact : updateEmergencyContact}
            formTitle={(formValues.id === 0 ? 'New' : 'Edit') + ' Emergency Contact'}>
            <Row gutter={10}>
                <Col span={12}>
                    <Form.Item name="name" label="Name"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Name is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <TlaSelect name={'relationship'} label={'Relationship'} options={relationships} optionKey={'name'} required/>
                </Col>
                <Col span={12}>
                    <Form.Item name="phone_number" label="Phone"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Phone is Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="alt_phone_number" label="Alt Phone">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item name="email" label="Email"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Email is Required'
                                   }
                               ]}>
                        <Input htmlType={'email'} size={'large'}/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden name="id" label="ID"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                    <Form.Item hidden name="employee_id" label="employee_id"
                               rules={[
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ]}>
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

EmergencyContactForm.propTypes = {
    addEmergencyContact: PropTypes.func.isRequired,
    updateEmergencyContact: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    addEmergencyContact: (payload) => dispatch(handleAddEmergencyContact(payload)),
    updateEmergencyContact: (payload) => dispatch(handleUpdateEmergencyContact(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmergencyContactForm)
