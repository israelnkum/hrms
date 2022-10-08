import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Button, Select, Col, Form, Input, notification, Row} from 'antd'
import {connect} from 'react-redux'
import {useLocation, useNavigate} from "react-router-dom";
import {
    handleAddEmergencyContact,
    handleUpdateEmergencyContact
} from "../../../../actions/employee/emergency-contacts/EmergencyContactAction";
import CloseModal from "../../../../commons/close-modal";
import {TlaModal} from "../../../../commons/tla-modal";

function EmergencyContactForm (props) {
    const navigate = useNavigate()
    const { addEmergencyContact, updateEmergencyContact } = props
    const [form] = Form.useForm()
    const { state } = useLocation()
    const formValues = {
        id: 0, create_account: false, staff_id: null, ...state.data
    } 
 
    const submit = (values) => {

        const formData = new FormData()
        values.id !== 0 && formData.append('_method', 'PUT')
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key])
            }
        }
        (values.id === 0 ? addEmergencyContact(formData) : updateEmergencyContact(formData)).then(() => {
            notification.success({
                message: 'Success',
                description: 'EmergencyContact ' + (values.id === 0 ? 'Created' : 'Updated')
            })
            form.resetFields()
            navigate(-1)
        }).catch((error) => {
            notification.warning({
                message: 'Warning',
                description: error.response.data.message
            })
        })
    }
    return (
        <TlaModal title={(formValues.id === 0 ? 'New' : 'Edit') + ' Emergency Contact'}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createEmergencyContactForm"
                initialValues={formValues}>
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
                        <Form.Item name="relationship" label="Relationship"
                                   rules={[
                                       {
                                           required: true,
                                           message: 'Relationship is Required'
                                       }
                                   ]}>
                            <Select size={'large'}>
                                <Select.Option value='parent'>Parent</Select.Option>
                                <Select.Option value='sibling'>Sibling</Select.Option>
                                <Select.Option value='partner'>Partner</Select.Option>
                                <Select.Option value='friend'>Friend</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}> 
                        <Form.Item name="phone" label="Phone"
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
                        <Form.Item name="alt_phone" label="Alt Phone">
                            <Input size={'large'}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}> 
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
                    </Col>
                </Row>
                <Form.Item>
                    <div align={'right'}>
                        <CloseModal/>&nbsp;
                        <Button size={'large'} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </TlaModal>
    )
}
EmergencyContactForm.propTypes = {
    addEmergencyContact: PropTypes.func.isRequired,
    updateEmergencyContact: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
    addEmergencyContact: (payload) => dispatch(handleAddEmergencyContact(payload)),
    updateEmergencyContact: (payload) => dispatch(handleUpdateEmergencyContact(payload))
})

export default connect(null, mapDispatchToProps)(EmergencyContactForm)
