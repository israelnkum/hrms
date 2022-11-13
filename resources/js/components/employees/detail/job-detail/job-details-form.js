import React, {useState} from "react";
import PropTypes from "prop-types";
import {Card, Col, DatePicker, Form, Input, Row, Space, Typography} from "antd";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import {handleUpdateJobDetail} from "../../../../actions/employee/job-details/JobDetailsAction";
import moment from "moment/moment";
import ChangePicture from "../../../commons/change-picture";

function JobDetailsForm(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const { updateJobDetail, jobCategories, subUnits, employeeId } = props;

    const { state } = useLocation();

    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        joined_date: state?.data ? moment(state?.data.joined_date) : '',
        contract_start_date: state?.data ? moment(state?.data.contract_start_date) : '',
        contract_end_date: state?.data ? moment(state?.data.contract_end_date) : '',
    };

    return (
        <TlaFormWrapper
            file={selectedFile}
            initialValues={formValues}
            onSubmit={updateJobDetail}
            formTitle={`Edit Job Details`}
        >
            <Row gutter={10}>
                <Col span={24}>
                    <Form.Item
                        name="job_title"
                        label="Job Title">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="location"
                        label="Location">
                        <Input size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <TlaSelect label={'Job Category'} name={'job_category_id'} optionKey={'name'} options={jobCategories}/>
               </Col>
                <Col span={12}>
                    <TlaSelect label={'Sub Unit'} name={'sub_unit_id'} optionKey={'name'} options={subUnits}/>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="joined_date"
                        label="Joined Date">
                        <DatePicker size={"large"} />
                    </Form.Item>
                </Col>
                <Row>
                    <Col>
                        <Card size={'small'} title={'Employment Contract'}>
                            <Row gutter={10}>
                                <Col span={12}>
                                    <Form.Item
                                        name="contract_start_date"
                                        label="Start Date">
                                        <DatePicker size={"large"} />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item
                                        name="contract_end_date"
                                        label="end date">
                                        <DatePicker size={"large"} />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Space wrap>
                                        <Typography.Text>
                                            Contract details
                                        </Typography.Text>
                                        <ChangePicture
                                            isDocument={true}
                                            hasFile={selectedFile === null}
                                            setFile={setSelectedFile}/>
                                    </Space>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
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

JobDetailsForm.propTypes = {
    updateJobDetail: PropTypes.func.isRequired,
    jobCategories: PropTypes.array.isRequired,
    subUnits: PropTypes.array.isRequired,
    employeeId: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
    jobCategories: state.commonReducer.commons.jobCategories,
    subUnits: state.commonReducer.commons.subUnits,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    updateJobDetail: (payload) => dispatch(handleUpdateJobDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsForm);
