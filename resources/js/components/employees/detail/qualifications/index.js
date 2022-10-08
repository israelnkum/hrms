import React, {useEffect, useState} from 'react'
import {Button, Space, Table} from 'antd'
import {connect} from "react-redux";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {handleGetAllQualifications} from "../../../../actions/qualification/QualificationAction";
import PropTypes from "prop-types";
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import FilterQualification from "./filter-qualification";

const { Column } = Table

function Qualifications (props) {
    const { getQualifications, qualifications } = props
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
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper meta={meta} extra={
                    <TlaAddNew link={'add'}>
                        <Button>Add Qualification</Button>
                    </TlaAddNew>
                } callbackFunction={() => {}} data={data}>
                    <Column title="Institute" dataIndex={'institute'}/>
                    <Column title="Major" dataIndex={'major'}/>
                    <Column title="Start Date" dataIndex={'start_date'}/>
                    <Column title="End Date" dataIndex={'end_date'}/>
                    <Column  title="Action" render={() => (
                        <Space size={0}>
                            <TlaEdit icon data={{}} link={'#'} type={'text'}/>
                            <TlaConfirm title={'Dependant'} callBack={()=>{}}/>
                        </Space>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
        </>
    )
}

Qualifications.propTypes = {
    getQualifications: PropTypes.func.isRequired,
    qualifications: PropTypes.object,
}
const mapStateToProps = (state) => ({
    qualifications: state.qualificationReducer.qualifications
})

const mapDispatchToProps = (dispatch) => ({
    getQualifications: (params) => dispatch(handleGetAllQualifications(params))
})

export default connect(mapStateToProps, mapDispatchToProps)(Qualifications)
