import { Col, DatePicker, Form, Input, Row } from 'antd'
import dayjs from "dayjs";
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import {
    handleAddCommunityService,
    handleUpdateCommunityService
} from "../../../../actions/employee/community-services/CommunityServicesAction";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";

function CommunityServicesForm(props) {
    const {addCommunityService, updateCommunityService, employeeId} = props
    const {state} = useLocation()
    const formValues = {
        id: 0,
        employee_id: employeeId,
        ...state.data,
        date: state?.data ? [
            state?.data ? dayjs(state?.data.start_date) : '',
            state?.data ? dayjs(state?.data.end_date) : '',
        ] : null
    }

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addCommunityService : updateCommunityService }
            formTitle={ (formValues.id === 0 ? 'New' : 'Edit') + ' Community Service' }>
            <Row gutter={ 10 }>
                <Col span={ 24 }>
                    <Form.Item name="date" label="Duration">
                        <DatePicker.RangePicker format={'YYYY-MM-DD'} className={'!w-full'} size={"large"} />
                    </Form.Item>
                </Col>
                <Col span={ 24 }>
                    <Form.Item
                        rules={ [{required: true, message: "Description Required"}] }
                        name="description"
                        label="Description">
                        <Input.TextArea rows={ 10 } size={ 'large' }/>
                    </Form.Item>
                </Col>
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
                    <Form.Item hidden name="employee_id" label="employee_id"
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

CommunityServicesForm.propTypes = {
    addCommunityService: PropTypes.func.isRequired,
    updateCommunityService: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
}

const mapStateToProps = (state) => ({
    employeeId: state.employeeReducer.employee.id,
})

const mapDispatchToProps = (dispatch) => ({
    addCommunityService: (payload) => dispatch(handleAddCommunityService(payload)),
    updateCommunityService: (payload) => dispatch(handleUpdateCommunityService(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(CommunityServicesForm)
