import {Col, Form, Input, Row} from 'antd'
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import {relationships} from "../../../../utils/nationalities";
import {useAppSelector} from "../../../../hooks";
import {
    handleAddEmergencyContact,
    handleUpdateEmergencyContact
} from "../../../../services/emergency-contact.service";

function EmergencyContactForm () {
    const employeeId = useAppSelector(state => state.employee.employee.id)

    const { state } = useLocation()
    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        ...state?.data?.info_update?.new_info
    }

    return (
        <TlaFormWrapper
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? handleAddEmergencyContact : handleUpdateEmergencyContact}
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
                                       type: "email",
                                       message: 'Not a valid email'
                                   }
                               ]}>
                        <Input size={'large'}/>
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

export default EmergencyContactForm
