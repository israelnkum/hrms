import React, {useState} from "react";
import PropTypes from "prop-types";
import {Button, Col, DatePicker, Form, Input, notification, Row} from "antd";
import {connect} from "react-redux";
import {TlaModal} from "../../../../commons/tla-modal";
import {useLocation, useNavigate} from "react-router-dom";
import CloseModal from "../../../../commons/close-modal";
import {
    handleAddQualification,
    handleUpdateQualification,
} from "../../../../actions/qualification/QualificationAction";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import ChangePicture from "../../../commons/change-picture";
import {useParams} from "react-router";
import moment from "moment";

function QualificationsForm(props) {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null)
    const {id} = useParams()
    const { addQualification, updateQualification, educationalLevels } = props;
    const [form] = Form.useForm();
    const { state } = useLocation();
    const formValues = {
        id: 0,
        ...state.data,
    };

    const submit = (values) => {
        const formData = new FormData();
        values.id !== 0 && formData.append("_method", "PUT");
        formData.append('employee_id', id)
        formData.append('start_date', moment(values.date[0]).format('YYYY-MM-DD'))
        formData.append('end_date', moment(values.date[1]).format('YYYY-MM-DD'))
        formData.append('file', selectedFile)
        for (const key in values) {
            if (Object.prototype.hasOwnProperty.call(values, key)) {
                formData.append(key, values[key]);
            }
        }
        (values.id === 0 ? addQualification(formData) : updateQualification(formData))
            .then(() => {
                notification.success({
                    message: "Success",
                    description:
                        "Qualification " + (values.id === 0 ? "Created" : "Updated"),
                });
                form.resetFields();
                navigate(-1);
            })
            .catch((error) => {
                notification.warning({
                    message: "Warning",
                    description: error.response.data.message,
                });
            });
    };
    return (
        <TlaModal title={(formValues.id === 0 ? "New" : "Edit") + " Qualification"}>
            <Form
                form={form}
                onFinish={submit}
                layout="vertical"
                name="createQualificationForm"
                initialValues={formValues}
            >
                <Row gutter={10}>

                    <Col span={12} style={{ marginBottom: 15 }}>
                        <p>Certificate</p>
                        <ChangePicture
                            isDocument={true}
                            hasFile={selectedFile === null}
                            setFile={setSelectedFile}/>
                    </Col>
                    <Col span={24}>
                        <TlaSelect label={'Education Level'} name={'education_level_id'} optionKey={'name'} options={educationalLevels}/>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="institute"
                            label="Institute"
                            rules={[
                                {
                                    required: true,
                                    message: "Institute is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="major"
                            label="Major"
                            rules={[
                                {
                                    required: true,
                                    message: "Major is Required",
                                },
                            ]}
                        >
                            <Input size={"large"} />
                        </Form.Item>
                    </Col>
                    <Col span={24}>
                        <Form.Item
                            name="date"
                            label="Duration"
                            rules={[
                                {
                                    required: true,
                                    message: "Date is Required",
                                },
                            ]}
                        >
                            <DatePicker.RangePicker size={"large"} />
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
                    </Col>
                </Row>
                <Form.Item>
                    <div align={"right"}>
                        <CloseModal />
                        &nbsp;
                        <Button size={"large"} type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </TlaModal>
    );
}
QualificationsForm.propTypes = {
    addQualification: PropTypes.func.isRequired,
    updateQualification: PropTypes.func.isRequired,
    educationalLevels: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    educationalLevels: state.commonReducer.commons.educationalLevels
});
const mapDispatchToProps = (dispatch) => ({
    addQualification: (payload) => dispatch(handleAddQualification(payload)),
    updateQualification: (payload) => dispatch(handleUpdateQualification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualificationsForm);
