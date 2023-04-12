import { Button, Space, Spin, Table } from 'antd'
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleDeletePreviousRank,
    handleGetAllPreviousRanks
} from "../../../../actions/employee/previous-ranks/Action";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import { TlaSuccess } from "../../../../utils/messages";

const { Column } = Table

function PreviousRanks (props) {
    const { getPreviousRanks, deletePreviousRanks, previousRanks, employeeId } = props

    const { data, meta }= previousRanks

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPreviousRanks(`employeeId=${employeeId}`).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'ranks/form'}>
                    <Button>Add Previous Rank</Button>
                </TlaAddNew>
            } callbackFunction={getPreviousRanks} data={data}>
                <Column title="Rank" dataIndex={'name'}/>
                <Column title="start" dataIndex={'relationship'}/>
                <Column title="end" dataIndex={'email'}/>

                <Column  title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit icon data={value} link={'ranks/form'} type={'text'}/>
                        <TlaConfirm title={'Contact'} callBack={()=>{
                            deletePreviousRanks(value.id).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}

PreviousRanks.propTypes = {
    getPreviousRanks: PropTypes.func.isRequired,
    deletePreviousRanks: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    previousRanks: PropTypes.object
}

const mapStateToProps = (state) => ({
    previousRanks: state.previousRankReducer.previousRanks,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getPreviousRanks: (params) => dispatch(handleGetAllPreviousRanks(params)),
    deletePreviousRanks: (id) => dispatch(handleDeletePreviousRank(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousRanks)
