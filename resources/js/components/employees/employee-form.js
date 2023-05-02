import { Col, DatePicker, Form, Input, Row, Select } from 'antd'
import dayjs from "dayjs";
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import { handleAddEmployee, handleUpdateEmployee } from "../../actions/employee/EmployeeAction";
import TlaFormWrapper from "../../commons/tla-form-wrapper";
import TlaSelect from "../../commons/tla/TlaSelect";


function EmployeeForm(props) {
    const [selectedFile, setSelectedFile] = useState(null)
    const {addEmployee, updateEmployee, departments, ranks} = props

    const {state} = useLocation()

    const formValues = {
        id: 0, create_account: false,
        staff_id: null,
        marital_status: null,
        ...state.data,
        dob: state?.data ? (state?.data.dob ? dayjs(state?.data.dob) : null) : null,
    }

    const Render = ({children, editing = true}) => (
        (editing === false ? formValues.id !== 0 : formValues === 0) && children
    )

    return (
        <TlaFormWrapper
            width={ formValues.id === 0 ? 520 : 700 }
            file={ selectedFile }
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addEmployee : updateEmployee }
            formTitle={ `${ (formValues.id === 0 ? "New" : "Edit") } Employee` }>
            <Row gutter={ 10 }>
                <Render editing={ false }>
                    <Col span={ 8 }>
                        <Form.Item name="ssnit_number" label="ssnit number">
                            <Input size={ 'large' }/>
                        </Form.Item>
                    </Col>
                </Render>

                <Col span={ formValues.id === 0 ? 12 : 8 }>
                    <Form.Item name="first_name" label="First Name"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'First Name is Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ formValues.id === 0 ? 12 : 8 }>
                    <Form.Item name="middle_name" label="Middle Name">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ formValues.id === 0 ? 12 : 8 }>
                    <Form.Item name="last_name" label="Last Name"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Last Name is Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ formValues.id === 0 ? 12 : 8 }>
                    <Form.Item name="staff_id" label="Staff ID">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Render editing={ false }>
                    <Col span={ 8 }>
                        <Form.Item name="gender" label="gender">
                            <Select size={ 'large' } showSearch>
                                <Select.Option value={ 'Male' }>Male</Select.Option>
                                <Select.Option value={ 'Female' }>Female</Select.Option>
                                <Select.Option value={ 'Rather not say' }>Rather not say</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={ 8 }>
                        <Form.Item name="marital_status" label="marital status">
                            <Select size={ 'large' } showSearch>
                                <Select.Option value={ 'Single' }>Single</Select.Option>
                                <Select.Option value={ 'Married' }>Married</Select.Option>
                                <Select.Option value={ 'Divorced' }>Divorced</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={ 8 }>
                        <TlaSelect label={ 'Department' } name={ 'department_id' } optionKey={ 'name' }
                                   options={ departments }/>
                    </Col>
                    <Col span={ 8 }>
                        <TlaSelect label={ 'rank' } name={ 'rank_id' } optionKey={ 'name' } options={ ranks }/>
                    </Col>
                    <Col span={ 8 }>
                        <TlaSelect label={ 'gtec placement' } name={ 'gtec_placement' } optionKey={ 'name' }
                                   options={ ranks }/>
                    </Col>
                    <Col span={ 8 }>
                        <Form.Item name="dob" label="date of birth">
                            <DatePicker style={ {width: '100%'} } size={ 'large' }/>
                        </Form.Item>
                    </Col>
                    {/*<Col span={24}>
                     <Form.Item name="create_account" valuePropName="checked">
                     <Checkbox>Create user account</Checkbox>
                     </Form.Item>
                     </Col>*/ }
                </Render>
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
                </Col>
            </Row>
        </TlaFormWrapper>
    )
}

EmployeeForm.propTypes = {
    addEmployee: PropTypes.func.isRequired,
    updateEmployee: PropTypes.func.isRequired,
    departments: PropTypes.array.isRequired,
    ranks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    departments: state.commonReducer.commons.departments,
    ranks: state.commonReducer.commons.ranks
});

const mapDispatchToProps = (dispatch) => ({
    addEmployee: (payload) => dispatch(handleAddEmployee(payload)),
    updateEmployee: (payload) => dispatch(handleUpdateEmployee(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeForm)
