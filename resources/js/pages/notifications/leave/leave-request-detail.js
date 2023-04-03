import { Button, Col, DatePicker, Divider, Form, Input, Radio, Row, Space, Spin } from "antd";
import dayjs from 'dayjs';
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react';
import { FiArrowRight } from "react-icons/fi";
import { connect } from 'react-redux';
import { useLocation, useNavigate } from "react-router-dom";
import { handleApproveLeaveRequest } from "../../../actions/leave-management/leave-requests/Actions";
import { handleChangeLeaveRequestStatus, handleGetTimeOff } from "../../../actions/time-off/TimeOffAction";
import TlaImage from "../../../commons/tla-image";
import { TlaError, TlaSuccess } from "../../../utils/messages";

function LeaveRequestDetail({getTimeOff, changeHrLeaveStatus, changeLeaveStatus, timeOff, holidays}) {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const {state} = useLocation()

    const [form] = Form.useForm();

    const navigate = useNavigate();

    useEffect(() => {
        getTimeOff(state.id).then(() => setLoading(false))
    }, [])

    const formValues = {
        id: 0,
        ...timeOff,
        hr_reason: '',
        days_requested: timeOff?.days_approved > 0 ? timeOff?.days_approved : timeOff?.days_requested,
        start_date: timeOff ? dayjs(timeOff.start_date) : '',
        end_date: timeOff ? dayjs(timeOff?.end_date) : ''
    };

    const onFinish = (values) => {
        setUpdating(true);
        (timeOff?.status === 'approved' ? changeHrLeaveStatus(values) :
            changeLeaveStatus({
                ...values,
                status: values.hr_status_update,
                sup_reason: values.hr_reason
            })).then(() => {
            setUpdating(false)
            navigate('/notifications/leave-request')
            TlaSuccess()
        }).catch(() => TlaError())
    };

    // eslint-disable-next-line react/prop-types
    const DurationItem = ({date}) => (
        <div className={ 'border-2 w-fit' }>
            <p className={ 'bg-gray-800 text-white uppercase text-xs py-1 px-2' +
                ' text-center' }>
                { dayjs(date).format('MMM') }
            </p>
            <div className={ 'py-2 px-3' }>
                <h3 className={ 'text-xl' }>
                    { dayjs(date).format('Do') }
                </h3>
            </div>
        </div>
    )

    const disabledDate = (current) => {
        if (!current) {
            return false;
        }

        // Can not select days before today and today
        const saturdayAndSunday = (dayjs(current).day() === 0 || dayjs(current).day() === 6)

        const months = current < dayjs().add(-1, 'days');
        return saturdayAndSunday || months || holidays.includes(dayjs(current).format('YYYY-MM-DD'))
    }

    const ApprovalForm = () => (
        <React.Fragment>
            <div className={ 'mt-2' }>
                <Row gutter={ 10 }>
                    <Col span={ 12 }>
                        <Form.Item
                            hidden
                            rules={ [{required: true}] }
                            name={ 'id' } label={ 'ID' }>
                            <Input/>
                        </Form.Item>
                        <Form.Item
                            rules={ [{required: true}] }
                            name={ 'start_date' } label={ 'Start Date' }>
                            <DatePicker
                                disabledDate={ disabledDate }
                                placement={ 'bottomLeft' }
                                size={ 'large' }
                                style={ {width: '100%'} }/>
                        </Form.Item>
                    </Col>
                    <Col span={ 12 }>
                        <Form.Item
                            rules={ [{required: true}] }
                            name={ 'days_requested' } label={ 'Approved Days' }>
                            <Input min={ 1 } size={ 'large' } type={ 'number' }/>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Form.Item name={ 'hr_reason' } label={ 'NOTES' }>
                            <Input.TextArea rows={ 3 }/>
                        </Form.Item>
                    </Col>
                </Row>
            </div>
            <div className={ 'flex flex-col items-start gap-2' }>
                <Form.Item name={ 'hr_status_update' } rules={ [{required: true, message: 'Choose an option'}] }>
                    <Radio.Group>
                        <Radio value="approved"> Approve </Radio>
                        <Radio value="rejected"> Decline </Radio>
                    </Radio.Group>
                </Form.Item>
                <Button size={ 'large' } className={ 'btn-primary uppercase' } block
                        htmlType={ 'submit' }>Submit</Button>
            </div>
        </React.Fragment>
    )

    const LeaveDetail = () => (
        <div className={ 'mt-5' }>
            <h3 className={ 'text-success-700 text-2xl text-center font-bold' }>Leave Approved</h3>
        </div>
    )
    return (
        <div className={ 'w-full' }>
            <div className={ ' mx-auto' }>
                <Spin spinning={ loading || updating }>
                    {
                        !loading &&
                        <Form onFinish={ onFinish } layout="vertical" initialValues={ formValues } form={ form }>
                            <div className={ 'shadow-lg bg-white' }>
                                <div className={ 'p-3 flex justify-between gap-3' }>
                                    <div>
                                        <Space direction={ 'vertical' }>
                                            <Space>
                                                <TlaImage size={ 65 } src={ 'a' } name={ timeOff?.employee }/>
                                                <div>
                                                    <h3 className={ 'text-lg' }>
                                                        { timeOff?.employee }
                                                    </h3>
                                                    <h5>{ timeOff?.department }</h5>
                                                </div>
                                            </Space>
                                            <Space direction={ 'vertical' }>
                                                <p>{ timeOff?.reason }</p>
                                            </Space>
                                        </Space>
                                        <Divider className={ '!my-1' }/>
                                        {
                                            timeOff?.hr_approval ? <LeaveDetail/> : <ApprovalForm/>
                                        }
                                    </div>
                                    <div className={ 'w-[350px] border-l pl-2' }>
                                        <div>
                                            <div className={ 'flex gap-x-2 justify-start items-center mb-2' }>
                                                <DurationItem date={ timeOff?.start_date }/>
                                                <FiArrowRight className={ 'text-xl' }/>
                                                <DurationItem date={ timeOff?.end_date }/>
                                            </div>
                                            <p>{ timeOff?.days_approved > 0 ? timeOff?.days_approved : timeOff?.days_requested } Days
                                                Time Off</p>
                                        </div>
                                        <Divider className={ '!my-2' }/>
                                        <div className={ 'flex justify-between' }>
                                            <h3>Supervisor Approval</h3>
                                            <p>{ timeOff?.sup_approval ?? <span
                                                className={ 'bg-danger rounded-lg p-1 text-white' }>Pending</span> }</p>
                                        </div>
                                        <Divider className={ '!my-2' }/>
                                        <div className={ 'flex justify-between' }>
                                            <h3>HR Approval</h3>
                                            <p>
                                                {
                                                    timeOff?.hr_approval ??
                                                    <span
                                                        className={ 'bg-danger rounded-lg p-1 text-white' }>Pending</span>
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }
                </Spin>
            </div>
        </div>
    )
}

LeaveRequestDetail.propTypes = {
    getTimeOff: PropTypes.func.isRequired,
    changeLeaveStatus: PropTypes.func.isRequired,
    changeHrLeaveStatus: PropTypes.func.isRequired,
    timeOff: PropTypes.object.isRequired,
    holidays: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => ({
    timeOff: state.timeOffReducer.leaveRequest,
    holidays: state.timeOffReducer.holidays
})

const mapDispatchToProps = (dispatch) => ({
    getTimeOff: (id) => dispatch(handleGetTimeOff(id)),
    changeHrLeaveStatus: (data) => dispatch(handleApproveLeaveRequest(data)),
    changeLeaveStatus: (payload) => dispatch(handleChangeLeaveRequestStatus(payload, true))
})

export default connect(mapStateToProps, mapDispatchToProps)(LeaveRequestDetail)
