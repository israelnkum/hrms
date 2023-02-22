import { Col, DatePicker, Form, Input, InputNumber, Row } from 'antd'
import moment from "moment/moment";
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import { handleRequestTimeOff } from "../../actions/time-off/TimeOffAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import Employees from "../commons/form/employees";

function TimeOffForm(props) {
    const {requestTimeOff} = props
    const [form] = Form.useForm();
    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        start_date: state?.data ? (state?.data.start_date ? moment(state?.data.start_date) : null) : null,
    }

    return (
        <TlaFormWrapper
            width={ 520 }
            customForm={form}
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? requestTimeOff : requestTimeOff }
            formTitle={ `${ (formValues.id === 0 ? "Request" : "Edit") } a Time off` }>
            <Row gutter={ 10 }>
                <Col span={24}>
                    <Employees  label={'Supervisor'} form={form}/>
                </Col>
                <Col span={12}>
                    <Form.Item name="number_of_days" label="Number of days"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <InputNumber
                            min={0.5}
                            style={{ width: '100%', borderRadius: 10 }}
                            step={ 0.5 } size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item name="start_date" label="Starting date">
                        <DatePicker style={ {width: '100%'} } size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Form.Item hidden name="id" label="ID"
                           rules={[
                               {
                                   required: true,
                                   message: 'Required'
                               }
                           ]}>
                    <Input size={ 'large' }/>
                </Form.Item>
            </Row>
        </TlaFormWrapper>
    )
}

TimeOffForm.propTypes = {
    requestTimeOff: PropTypes.func.isRequired
}

const mapStateToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
    requestTimeOff: (data) => dispatch(handleRequestTimeOff(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeOffForm)
