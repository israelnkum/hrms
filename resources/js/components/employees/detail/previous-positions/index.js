import { Button, Space, Spin, Table } from 'antd'

import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleDeletePreviousPosition,
    handleGetAllPreviousPositions
} from "../../../../actions/employee/previous-positions/Action";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import { TlaSuccess } from "../../../../utils/messages";

const { Column } = Table

function PreviousPositions (props) {
    const { getPreviousPositions, deletePreviousPositions, previousPositions, employeeId } = props

    const { data, meta } = previousPositions

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getPreviousPositions(`employeeId=${employeeId}`).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'form'}>
                    <Button>Add Previous Position</Button>
                </TlaAddNew>
            } callbackFunction={getPreviousPositions} data={data}>
                <Column title="Position" dataIndex={'name'}/>
                <Column title="start" dataIndex={'relationship'}/>
                <Column title="end" dataIndex={'email'}/>

                <Column  title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit icon data={value} link={'positions/form'} type={'text'}/>
                        <TlaConfirm title={'Position'} callBack={()=>{
                            deletePreviousPositions(value.id).then(() => TlaSuccess('Position Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}

PreviousPositions.propTypes = {
    getPreviousPositions: PropTypes.func.isRequired,
    deletePreviousPositions: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    previousPositions: PropTypes.object
}
const mapStateToProps = (state) => ({
    previousPositions: state.previousPositionReducer.previousPositions,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getPreviousPositions: (params) => dispatch(handleGetAllPreviousPositions(params)),
    deletePreviousPositions: (id) => dispatch(handleDeletePreviousPosition(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PreviousPositions)
