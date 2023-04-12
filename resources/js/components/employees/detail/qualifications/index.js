import { Button, Space, Spin, Table } from 'antd'
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleDeleteQualification,
    handleGetAllQualifications
} from "../../../../actions/employee/qualification/QualificationAction";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import { TlaSuccess } from "../../../../utils/messages";

const {Column} = Table

function Qualifications(props) {
    const {getQualifications, deleteQualifications, qualifications, employeeId} = props

    const {data, meta} = qualifications

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        getQualifications(`employeeId=${ employeeId }`).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={ loading }>
            {/*<FilterQualification/>*/ }
            <TlaTableWrapper meta={ meta } extra={
                <TlaAddNew link={ 'form' }>
                    <Button>Add Qualification</Button>
                </TlaAddNew>
            } callbackFunction={ () => {
            } } data={ data }>
                <Column title="Institution" dataIndex={ 'institution' }/>
                <Column title="Qualification" dataIndex={ 'qualification' }/>
                <Column title="Date" dataIndex={ 'date' }/>
                <Column title="Action" render={ (value) => (
                    <Space size={ 0 }>
                        <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'Qualification' } callBack={ () => {
                            deleteQualifications(value.id).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}

Qualifications.propTypes = {
    getQualifications: PropTypes.func.isRequired,
    deleteQualifications: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    qualifications: PropTypes.object
}
const mapStateToProps = (state) => ({
    qualifications: state.qualificationReducer.qualifications,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getQualifications: (params) => dispatch(handleGetAllQualifications(params)),
    deleteQualifications: (id) => dispatch(handleDeleteQualification(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Qualifications)
