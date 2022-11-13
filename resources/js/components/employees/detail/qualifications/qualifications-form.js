import React, {useState} from "react";
import PropTypes from "prop-types";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {
    handleAddQualification,
    handleUpdateQualification,
} from "../../../../actions/employee/qualification/QualificationAction";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import ChangePicture from "../../../commons/change-picture";
import {useParams} from "react-router";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import moment from "moment";

function QualificationsForm(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const {id} = useParams()
    const { addQualification, updateQualification, educationalLevels } = props;

    const { state } = useLocation();

    const formValues = {
        id: 0,
        employee_id: id,
        ...state.data,
        date: [
            state?.data ? moment(state?.data.start_date) : '',
            state?.data ? moment(state?.data.end_date) : '',
        ]
    };

    return (
        <TlaFormWrapper
            file={selectedFile}
            initialValues={formValues}
            onSubmit={formValues.id === 0 ? addQualification : updateQualification}
            formTitle={`${(formValues.id === 0 ? "New" : "Edit")} Qualification`}
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
