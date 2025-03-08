import {Col, Form, Input, Row} from "antd";
import {useLocation} from "react-router-dom";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import {useAppSelector} from "../../../../hooks";
import {updateNextOfKin} from "../../../../services/next-of-kin.service";

function NextOfKinForm() {
    const employeeId = useAppSelector((state) => state.employee.employee.id)

    const {state} = useLocation();

    const formValues = {
        id: 0,
        name: '',
        phone_number: '',
        alt_phone_number: '',
        address: '',
        email: '',
        employee_id: employeeId,
        ...state.data,
        ...state?.data?.info_update?.new_info
    };

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ updateNextOfKin }
            formTitle={ `Edit Next Of Kin` }>
            <Row gutter={ 10 }>
                <Col span={24} sm={24} md={12}>
                    <Form.Item
                        rules={ [
                            {
                                required: true,
                                message: 'Required'
                            }
                        ] }
                        name="name"
                        label="name">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} md={12}>
                    <Form.Item
                        rules={ [
                            {
                                required: true,
                                message: 'Required'
                            }
                        ] }
                        name="phone_number"
                        label="phone number">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} md={12}>
                    <Form.Item
                        name="alt_phone_number"
                        label="Alt phone number">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} md={12}>
                    <Form.Item
                        name="email"
                        label="email">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={24} sm={24} md={12}>
                    <Form.Item
                        name="address"
                        label="address">
                        <Input.TextArea size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        hidden
                        name="employee_id"
                        label="employee_id"
                        rules={ [
                            {
                                required: true,
                                message: "Required",
                            },
                        ] }>
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    );
}

export default NextOfKinForm;
