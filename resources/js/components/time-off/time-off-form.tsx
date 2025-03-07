import {Col, DatePicker, Form, Input, InputNumber, Row, Select, Spin} from 'antd'
import dayjs from 'dayjs'
import {AiOutlineFieldTime} from "react-icons/ai";
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import Employees from "../commons/form/employees.tsx";
import {useAppSelector} from "../../hooks";
import {handleRequestTimeOff} from "../../services/time-off.service";

function TimeOffForm() {
    const holidays = useAppSelector(state => state.timeOff.holidays)
    const leaveTypes = useAppSelector(state => state.timeOff.leaveTypes)

    const [form] = Form.useForm();
    const {state} = useLocation()

    const formValues = {
        id: 0,
        ...state.data,
        start_date: state?.data ? (state?.data.start_date ? dayjs(state?.data.start_date) : null) : null,
    }

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
            onSubmit={ formValues.id === 0 ? handleRequestTimeOff : handleRequestTimeOff }
            formTitle={
                <div className={ 'flex gap-x-2 items-center' }>
                    <AiOutlineFieldTime className={ 'text-3xl' }/>
                    { `${ (formValues.id === 0 ? "Request" : "Edit") } Leave` }
                </div>
            }>
            <Spin spinning={ false }>
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
                            <Select size={ 'large' }
                                    placeholder={ 'Select Leave Type' }
                                    className={ 'rounded-lg' }>
                                {
                                    leaveTypes.map(({id, name}) => (
                                        <Select.Option value={ id } key={ id }>{ name }</Select.Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
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
                                max={ 45 }
                                min={ 1 }
                                style={ {width: '100%', borderRadius: 10} }
                                size={ 'large' } placeholder={'Number of days'}/>
                        </Form.Item>
                    </Col>
                    <Col span={ 12 }>
                        <Form.Item name="start_date" label="Starting date" rules={ [
                            {
                                required: true,
                                message: 'Required'
                            }
                        ] }>
                            <DatePicker placement={'bottomRight'} disabledDate={ disabledDate } style={ {width: '100%'} } size={ 'large' }/>
                        </Form.Item>
                    </Col>
                    <Col span={ 24 }>
                        <Employees label={ 'Approved by' } form={ form }/>
                    </Col>

                    <Col span={ 24 }>
                        <Form.Item name="reason" label="Reason" rules={ [
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

export default TimeOffForm
