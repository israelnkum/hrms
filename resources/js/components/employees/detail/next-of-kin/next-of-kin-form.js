import { Col, Form, Input, Row } from "antd";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { useLocation } from "react-router-dom";
import { handleUpdateNextOfKin } from "../../../../actions/employee/next-of-kin/Action";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";

function NextOfKinForm(props) {
    const {updateNextOfKin, employeeId} = props;

    const {state} = useLocation();

    const formValues = {
        id: 0,
        name: '',
        phone_number: '',
        alt_phone_number: '',
        address: '',
        email: '',
        employee_id: employeeId,
        ...state.data
    };

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ updateNextOfKin }
            formTitle={ `Edit Next Of Kin` }>
            <Row gutter={ 10 }>
                <Col span={ 12 }>
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
                <Col span={ 12 }>
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
                <Col span={ 12 }>
                    <Form.Item
                        name="alt_phone_number"
                        label="Alt phone number">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item
                        name="email"
                        label="email">
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
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
                        ] }
                    >
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
            </Row>
        </TlaFormWrapper>
    );
}

NextOfKinForm.propTypes = {
    updateNextOfKin: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    updateNextOfKin: (payload) => dispatch(handleUpdateNextOfKin(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NextOfKinForm);
