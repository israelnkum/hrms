import React from "react";
import PropTypes from "prop-types";
import {Col, DatePicker, Form, Input, Row} from "antd";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";
import {
    handleAddQualification,
    handleUpdateQualification
} from "../../../../actions/employee/qualification/QualificationAction";
import TlaSelect from "../../../../commons/tla/TlaSelect";
import {useParams} from "react-router";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import dayjs from 'dayjs';

function QualificationsForm(props) {
    const {id} = useParams()
    const {addQualification, updateQualification, educationalLevels} = props;

    const {state} = useLocation();

    const newInfo = state?.data?.info_update?.new_info;

    const update = {...newInfo, date: newInfo?.date ? dayjs(newInfo?.date) : (state?.data ? dayjs(state?.data.date) : null)}


    const formValues = {
        id: 0,
        employee_id: id,
        ...state.data,
        ...update
    };

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addQualification : updateQualification }
            formTitle={ `${ (formValues.id === 0 ? "New" : "Edit") } Qualification` }>
            <Row gutter={ 10 }>
                <Col span={ 12 } style={ {marginBottom: 15} }>
                    <Form.Item
                        name="cert_number"
                        label="Certificate Number"
                        rules={ [
                            {
                                required: true,
                                message: "Certificate Number is Required",
                            },
                        ] }
                    >
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item
                        name="date"
                        label="Date"
                        rules={ [
                            {
                                required: true,
                                message: "Date is Required",
                            },
                        ] }>
                        <DatePicker size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <TlaSelect label={ 'Education Level' } name={ 'education_level_id' } optionKey={ 'name' }
                               options={ educationalLevels }/>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        name="institution"
                        label="Institution"
                        rules={ [
                            {
                                required: true,
                                message: "Institution is Required",
                            },
                        ] }
                    >
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        name="qualification"
                        label="Qualification"
                        rules={ [
                            {
                                required: true,
                                message: "Qualification is Required",
                            },
                        ] }>
                        <Input size={ "large" }/>
                    </Form.Item>
                </Col>

                <Col>
                    <Form.Item
                        hidden
                        name="id"
                        label="ID"
                        rules={ [
                            {
                                required: true,
                                message: "Required",
                            },
                        ] }>
                        <Input size={ "large" }/>
                    </Form.Item>
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

QualificationsForm.propTypes = {
    addQualification: PropTypes.func.isRequired,
    updateQualification: PropTypes.func.isRequired,
    educationalLevels: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    educationalLevels: state.commonReducer.commons.educationalLevels
});
const mapDispatchToProps = (dispatch) => ({
    addQualification: (data) => dispatch(handleAddQualification(data)),
    updateQualification: (payload) => dispatch(handleUpdateQualification(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(QualificationsForm);
