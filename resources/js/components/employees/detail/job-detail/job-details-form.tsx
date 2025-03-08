import {Card, Col, DatePicker, Form, Input, Row, Select} from "antd";
import {useLocation} from "react-router-dom";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import dayjs from "dayjs";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {handleUpdateJobDetail} from "../../../../services/job-details.service";

function JobDetailsForm() {
    const dispatch = useAppDispatch()
    const jobCategories = useAppSelector(state => state.common.commons.jobCategories)
    const positions = useAppSelector(state => state.common.commons.positions)
    const subUnits = useAppSelector(state => state.common.commons.subUnits)
    const employeeId = useAppSelector(state => state.employee.employee.id)

    const {state} = useLocation();


    const newInfo = state?.data?.info_update?.new_info;

    const update = {
        ...newInfo,
        joined_date: newInfo?.joined_date ? dayjs(newInfo?.joined_date) : (state?.data ? dayjs(state?.data.joined_date) : null),
        contract_start_date: newInfo?.contract_start_date ? dayjs(newInfo?.contract_start_date) : (state?.data ? dayjs(state?.data.contract_start_date) : null),
        contract_end_date: newInfo?.contract_end_date ? dayjs(newInfo?.contract_end_date) : (state?.data ? dayjs(state?.data.contract_end_date) : null),
    }
    const onFinish = async (values: any) => {
        await dispatch(handleUpdateJobDetail(values))
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
            onSubmit={onFinish}
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

export default JobDetailsForm
