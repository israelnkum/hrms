import { Space, Spin, Table, Typography } from 'antd'
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import {
    handleDeleteDirectReport,
    handleGetAllDirectReports
} from "../../../../actions/employee/direct-reports/DirectReportAction";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import { TlaSuccess } from "../../../../utils/messages";

const {Column} = Table

function Subordinates({getDirectReports, directReports, deleteDeleteDirectReport, employeeId}) {
    const [loading, setLoading] = useState(true)
    const {data, meta} = directReports

    useEffect(() => {
        getDirectReports(`supervisorId=${ employeeId }`).then(() => setLoading(false))
    }, [])
    return (
        <Spin spinning={ loading } tip={ 'Please wait' }>
            <TlaTableWrapper
                extra={ <Typography.Text>SUBORDINATES</Typography.Text> }
                callbackFunction={ () => {getDirectReports(`supervisorId=${ employeeId }`)} }
                meta={ meta } data={ data }>
                <Column title="Name" dataIndex={ ['employee', 'name'] }/>
                <Column title="Email" dataIndex={ ['employee', 'email'] }/>
                <Column title="Reporting Method" dataIndex={ 'method' }/>
                <Column title="Action" render={ (value) => (
                    <Space size={ 0 }>
                        <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'Subordinate' } callBack={ () => {
                            deleteDeleteDirectReport(value.id).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}

Subordinates.propTypes = {
    getDirectReports: PropTypes.func.isRequired,
    directReports: PropTypes.object.isRequired,
    deleteDeleteDirectReport: PropTypes.object.isRequired,
    employeeId: PropTypes.number.isRequired
}

const mapStateToProps = (state) => ({
    directReports: state.directReportReducer.directReports,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getDirectReports: (params) => dispatch(handleGetAllDirectReports(params)),
    deleteDeleteDirectReport: (id) => dispatch(handleDeleteDirectReport(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Subordinates)
