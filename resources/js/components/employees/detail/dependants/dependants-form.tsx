import {Col, DatePicker, Form, Input, Row} from 'antd'
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import {relationships} from "../../../../utils/nationalities";
import dayjs from "dayjs";
import {useAppSelector} from "../../../../hooks";
import {handleAddDependant, handleUpdateDependant} from "../../../../services/dependant.service";

function DependantsForm() {
    const employeeId = useAppSelector(state => state.employee.employee.id)
    const {state} = useLocation()

    const newInfo = state?.data?.info_update?.new_info;

    const update = {...newInfo, dob: newInfo?.dob ? dayjs(newInfo?.dob) : (state?.data ? dayjs(state?.data.dob) : null)}

    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        ...update
    }

    return (
        <TlaFormWrapper
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? handleAddDependant : handleUpdateDependant}
            formTitle={(formValues.id === 0 ? 'New' : 'Edit') + ' Dependant'}>
            <Row gutter={10}>
                <Col span={24} sm={24} md={12}>
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
                <Col span={24} sm={24} md={12}>
                    <TlaSelect name={'relationship'} label={'Relationship'} options={relationships} optionKey={'name'}
                               required/>
                </Col>
                <Col span={24} sm={24} md={12}>
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
                <Col span={24} sm={24} md={12}>
                    <Form.Item name="alt_phone_number" label="Alt Phone">
                        <Input size={'large'}/>
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} md={12}>
                    <Form.Item name="dob" label="Date Of Birth">
                        <DatePicker size={'large'}/>
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

export default DependantsForm
