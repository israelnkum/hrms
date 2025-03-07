import React from "react";
import PropTypes from "prop-types";
import {Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import {handleUpdateJobDetail} from "../../../../actions/employee/job-details/JobDetailsAction";
import dayjs from "dayjs";

function JobDetailsForm(props) {
    // const [selectedFile, setSelectedFile] = useState(null)
    const {updateJobDetail, jobCategories, subUnits, employeeId, positions} = props;

    const {state} = useLocation();


    const newInfo = state?.data?.info_update?.new_info;

    const update = {
        ...newInfo,
        joined_date: newInfo?.joined_date ? dayjs(newInfo?.joined_date) : (state?.data ? dayjs(state?.data.joined_date) : null),
        contract_start_date: newInfo?.contract_start_date ? dayjs(newInfo?.contract_start_date) : (state?.data ? dayjs(state?.data.contract_start_date) : null),
        contract_end_date: newInfo?.contract_end_date ? dayjs(newInfo?.contract_end_date) : (state?.data ? dayjs(state?.data.contract_end_date) : null),
    }


    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        ...update
    };

    return (
        <TlaFormWrapper
            width={900}
            file={null}
            initialValues={formValues}
            onSubmit={updateJobDetail}
            formTitle={`Edit Job Details`}>
            <div className={'flex sm:flex-wrap flex-nowrap'}>
                <Row gutter={10}>
                    <Col span={24}>
                        <TlaSelect label={'Position'} name={'position_id'} optionKey={'name'} options={positions}/>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="location"
                            label="Location">
                            <Select size={'large'} placeholder="Select" showSearch>
                                <Select.Option value={'Main Campus'}>Main Campus</Select.Option>
                                <Select.Option value={'Business Campus'}>Business Campus</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            name="joined_date"
                            label="Joined Date">
                            <DatePicker placement={'bottomLeft'} size={"large"}/>
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <TlaSelect label={'Job Category'} name={'job_category_id'} optionKey={'name'}
                                   options={jobCategories}/>
                    </Col>
                    <Col span={12}>
                        <TlaSelect label={'Sub Unit'} name={'sub_unit_id'} optionKey={'name'} options={subUnits}/>
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
                            <Input size={"large"}/>
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
                            <Input size={"large"}/>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className={'mb-2'}>
                    <Col>
                        <Card size={'small'} title={'Employment Contract'}>
                            <Row gutter={10}>
                                <Col span={24}>
                                    <Form.Item
                                        name="contract_start_date"
                                        label="Start Date">
                                        <DatePicker className={'!w-full'} size={"large"}/>
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item
                                        name="contract_end_date"
                                        label="end date">
                                        <DatePicker className={'!w-full'} size={"large"}/>
                                    </Form.Item>
                                </Col>
                                {/*<Col span={ 24 }>
                                    <Space wrap>
                                        <Typography.Text>
                                            Contract details
                                        </Typography.Text>
                                        <ChangePicture
                                            isDocument={ true }
                                            hasFile={ selectedFile === null }
                                            setFile={ setSelectedFile }/>
                                    </Space>
                                </Col>*/}
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </div>
        </TlaFormWrapper>
    );
}

JobDetailsForm.propTypes = {
    updateJobDetail: PropTypes.func.isRequired,
    jobCategories: PropTypes.array.isRequired,
    positions: PropTypes.array.isRequired,
    subUnits: PropTypes.array.isRequired,
    employeeId: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
    jobCategories: state.commonReducer.commons.jobCategories,
    positions: state.commonReducer.commons.positions,
    subUnits: state.commonReducer.commons.subUnits,
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    updateJobDetail: (payload) => dispatch(handleUpdateJobDetail(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(JobDetailsForm);
