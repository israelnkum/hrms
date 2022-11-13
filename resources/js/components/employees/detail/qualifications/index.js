import React, {useEffect, useState} from 'react'
import {Button, Space, Table} from 'antd'
import {connect} from "react-redux";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {
    handleDeleteQualification,
    handleGetAllQualifications
} from "../../../../actions/employee/qualification/QualificationAction";
import PropTypes from "prop-types";
import FilterQualification from "./filter-qualification";
import {TlaSuccess} from "../../../../utils/messages";

const { Column } = Table

function Qualifications (props) {
    const { getQualifications, deleteQualifications, qualifications } = props
    const { data, meta }= qualifications
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getQualifications().then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <>
            <FilterQualification/>
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'form'}>
                    <Button>Add Qualification</Button>
                </TlaAddNew>
            } callbackFunction={() => {}} data={data}>
                <Column title="Institute" dataIndex={'institute'}/>
                <Column title="Major" dataIndex={'major'}/>
                <Column title="Start Date" dataIndex={'start_date'}/>
                <Column title="End Date" dataIndex={'end_date'}/>
                <Column  title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit icon data={value} link={'form'} type={'text'}/>
                        <TlaConfirm title={'Dependant'} callBack={()=>{
                            deleteQualifications(value.id).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </>
    )
}

Qualifications.propTypes = {
    getQualifications: PropTypes.func.isRequired,
    deleteQualifications: PropTypes.func.isRequired,
    qualifications: PropTypes.object,
}
const mapStateToProps = (state) => ({
    qualifications: state.qualificationReducer.qualifications
})

const mapDispatchToProps = (dispatch) => ({
    getQualifications: (params) => dispatch(handleGetAllQualifications(params)),
    deleteQualifications: (id) => dispatch(handleDeleteQualification(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Qualifications)
