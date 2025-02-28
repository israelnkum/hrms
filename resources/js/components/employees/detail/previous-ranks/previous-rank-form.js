import React from 'react'
import PropTypes from 'prop-types'
import { Col, Form, Input, Row } from 'antd'
import { connect } from 'react-redux'
import { useLocation } from "react-router-dom";
import {
    handleAddPreviousRank,
    handleUpdatePreviousRank
} from "../../../../actions/employee/previous-ranks/Action";
import TlaFormWrapper from "../../../../commons/tla-form-wrapper";
import TlaSelect from "../../../../commons/tla/TlaSelect";

function PreviousRankForm(props) {
    const {addPreviousRank, updatePreviousRank, employeeId, ranks} = props
    const {state} = useLocation()

    const formValues = {
        id: 0, employee_id: employeeId, ...state.data
    }

    return (
        <TlaFormWrapper
            initialValues={ formValues }
            onSubmit={ formValues.id === 0 ? addPreviousRank : updatePreviousRank }
            formTitle={ (formValues.id === 0 ? 'New' : 'Edit') + ' Position' }>
            <Row gutter={ 10 }>
                <Col span={ 24 }>
                    <TlaSelect name={ 'rank_id' }
                               label={ 'Rank' }
                               options={ ranks } optionKey={ 'name' }
                               required/>
                </Col>
                <Col span={ 12 }>
                    <Form.Item name="start" label="Start Date">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col span={ 12 }>
                    <Form.Item name="end" label="Start End">
                        <Input size={ 'large' }/>
                    </Form.Item>
                </Col>
                <Col>
                    <Form.Item hidden
                               name="id"
                               label="ID"
                               rules={ [
                                   {
                                       required: true,
                                       message: 'Required'
                                   }
                               ] }>
                        <Input size={ 'large' }/>
                    </Form.Item>
                    <Form.Item hidden
                               name="employee_id"
                               label="employee_id"
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

PreviousRankForm.propTypes = {
    addPreviousRank: PropTypes.func.isRequired,
    updatePreviousRank: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    ranks: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    employeeId: state.employeeReducer.employee.id,
    ranks: state.commonReducer.commons.ranks
})

const mapDispatchToProps = (dispatch) => ({
    addPreviousRank: (payload) => dispatch(handleAddPreviousRank(payload)),
    updatePreviousRank: (payload) => dispatch(handleUpdatePreviousRank(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousRankForm)
