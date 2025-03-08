import {Col, Form, Input, Row, Select} from "antd";
import {useLocation} from "react-router-dom";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import {useParams} from "react-router";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import {nationalities, regions} from "../../../../utils/nationalities";
import {handleUpdateContactDetail} from "../../../../services/contact-details.service";

function ContactDetailsForm() {
    const {id} = useParams()

    const { state } = useLocation();

    const formValues = {
        id: 0,
        address: '',
        city: '',
        country: '',
        nationality: '',
        telephone: '',
        work_telephone: '',
        zip_code: '',
        work_email: '',
        other_email: '',
        employee_id: id,
        ...state.data,
        ...state?.data?.info_update?.new_info
    };

    return (
        <TlaFormWrapper
            initialValues={formValues}
            onSubmit={handleUpdateContactDetail}
            formTitle={`Edit Contact Details`}>
            <Row gutter={10}>
                <Col span={24}>
                    <Form.Item
                        name="address"
                        label="Address">
                        <Input.TextArea size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="city"
                        label="City">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="country"
                        label="Country">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <TlaSelect label={'Region'} name={'region'} optionKey={'name'} options={regions}/>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="nationality" label="Nationality"
                    >
                        <Select size={'large'} placeholder="Select Nationality" allowClear showSearch>
                            {
                                nationalities.map((nationality) => {
                                    return Object.keys(nationality).map((initial) => {
                                        return (
                                            <Select.OptGroup key={initial} label={initial}>
                                                {
                                                    Object.keys(nationality[initial]).map((country) => {
                                                        return (
                                                            <Select.Option
                                                                key={country + initial}
                                                                value={nationality[initial][country]}>
                                                                {nationality[initial][country]}
                                                            </Select.Option>
                                                        )
                                                    })
                                                }
                                            </Select.OptGroup>
                                        )
                                    })
                                })
                            }
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={12} xs={12} md={12}>
                    <Form.Item
                        name="telephone"
                        label="Telephone">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12} xs={12} md={12}>
                    <Form.Item
                        name="work_telephone"
                        label="Work Telephone">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                {/*<Col span={12} xs={12} md={8}>
                    <Form.Item
                        name="zip_code"
                        label="Zip Code">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>*/}
                <Col span={24} xs={24} md={12}>
                    <Form.Item
                        name="work_email"
                        label="Work Email">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={24} xs={24} md={12}>
                    <Form.Item
                        name="other_email"
                        label="Other Email">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item
                        hidden
                        name="id"
                        label="ID"
                        rules={[
                            {
                                required: true,
                                message: "Required",
                            },
                        ]}
                    >
                        <Input size={"large"} />
                    </Form.Item>
                    <Form.Item
                        hidden
                        name="employee_id"
                        label="employee_id"
                        rules={[
                            {
                                required: true,
                                message: "Required",
                            },
                        ]}
                    >
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    );
}

export default ContactDetailsForm;
