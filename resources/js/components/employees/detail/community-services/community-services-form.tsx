import {Col, DatePicker, Form, Input, Row} from 'antd'
import dayjs from "dayjs";
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import {useAppSelector} from "../../../../hooks";
import {handleAddCommunityService, handleUpdateCommunityService} from "../../../../services/community-service.service";

function CommunityServicesForm() {
    const employeeId = useAppSelector((state) => state.employee.employee.id)

    const {state} = useLocation()
    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        date: state?.data ? [
            state?.data ? dayjs(state?.data.start_date) : '',
            state?.data ? dayjs(state?.data.end_date) : '',
        ] : null
    }

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? handleAddCommunityService : handleUpdateCommunityService }
            formTitle={ (formValues.id === 0 ? 'New' : 'Edit') + ' Community Service' }>
            <Row gutter={ 10 }>
                <Col span={ 24 }>
                    <Form.Item name="date" label="Duration">
                        <DatePicker.RangePicker format={'YYYY-MM-DD'} className={'!w-full'} size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        rules={ [{required: true, message: "Description Required"}] }
                        name="description"
                        label="Description">
                        <Input.TextArea rows={ 10 } size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden name="id" label="ID"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                    <Form.Item hidden name="employee_id" label="employee_id"
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

export default CommunityServicesForm
