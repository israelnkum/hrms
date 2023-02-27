import { Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin } from 'antd'
import moment from "moment/moment";
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { AiOutlineFieldTime } from "react-icons/ai";
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import { handleGetHolidays, handleRequestTimeOff } from "../../actions/time-off/TimeOffAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import Employees from "../commons/form/employees";

function TimeOffForm(props) {
    const [loading, setLoading] = useState(true)
    const {requestTimeOff, getHolidays, holidays, leaveTypes} = props
    const [form] = Form.useForm();
    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        start_date: state?.data ? (state?.data.start_date ? moment(state?.data.start_date) : null) : null,
    }

    useEffect(() => {
        getHolidays().then(() => {
            setLoading(false)
        }).catch(() => setLoading(false))
    }, [])

    const disabledDate = (current) => {
        if (!current) {
            return false;
        }

        // Can not select days before today and today
        const saturdayAndSunday = (dayjs(current).day() === 0 || dayjs(current).day() === 6)

        const months = current < dayjs().add(-1, 'days');
        return saturdayAndSunday || months || holidays.includes(dayjs(current).format('YYYY-MM-DD'))
    }

    return (
        <TlaFormWrapper
            width={ 520 }
            customForm={ form }
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? requestTimeOff : requestTimeOff }
            formTitle={
                <div className={ 'flex gap-x-2 items-center' }>
                    <AiOutlineFieldTime className={ 'text-3xl' }/>
                    { `${ (formValues.id === 0 ? "Request" : "Edit") } a Time off` }
                </div>
            }>
            <Spin spinning={ loading }>
                <Row gutter={ 10 }>
                    <Col span={ 24 }>
                        <Form.Item
                            name={ 'leave_type_id' }
                            label={ 'Leave Type' }
                            rules={ [
                                {
                                    required: true,
                                    message: 'Required'
                                }
                            ] }>
                            <Select size={ 'large' } placeholder={ 'Select Leave Type' } className={ 'rounded-lg' }>
                                {
                                    leaveTypes.map(({id, name}) => (
                                        <Select.Option value={ id } key={ id }>{ name }</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Employees label={ 'Supervisor' } form={ form }/>
                    </Col>
                    <Col span={ 12 }>
                        <Form.Item name="number_of_days" label="Number of days"
                                   rules={ [
                                       {
                                           required: true,
                                           message: 'Required'
                                       }
                                   ] }>
                            <InputNumber
                                min={ 0.5 }
                                style={ {width: '100%', borderRadius: 10} }
                                step={ 0.5 } size={ 'large' }/>
                        </Form.Item>
                    </Col>
                    {
                        !loading &&
                        <Col span={ 12 }>
                            <Form.Item name="start_date" label="Starting date" rules={ [
                                {
                                    required: true,
                                    message: 'Required'
                                }
                            ] }>
                                <DatePicker disabledDate={ disabledDate } style={ {width: '100%'} } size={ 'large' }/>
                            </Form.Item>
                        </Col>
                    }

                    <Col span={ 24 }>
                        <Form.Item name="reason" label="Notes" rules={ [
                            {
                                required: true,
                                message: 'Required'
                            }
                        ] }>
                            <Input.TextArea placeholder={ 'Why do you want a time off?' }/>
                        </Form.Item>
                    </Col>
                    <Form.Item hidden name="id" label="ID"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Row>
            </Spin>
        </TlaFormWrapper>
    )
}

TimeOffForm.propTypes = {
    requestTimeOff: PropTypes.func.isRequired,
    holidays: PropTypes.array.isRequired,
    leaveTypes: PropTypes.array.isRequired,
    getHolidays: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    holidays: state.timeOffReducer.holidays,
    leaveTypes: state.timeOffReducer.leaveTypes
});

const mapDispatchToProps = (dispatch) => ({
    requestTimeOff: (data) => dispatch(handleRequestTimeOff(data)),
    getHolidays: () => dispatch(handleGetHolidays()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeOffForm)
