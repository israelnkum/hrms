import {Button, Space, Spin, Table} from 'antd'
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleDeleteDependant, handleGetAllDependants} from "../../../../actions/employee/dependants/DependantsAction";
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {formatLabel} from "../../../../utils";
import TableContent from "../TableContent";

const {Column} = Table

function Dependant(props) {
    const {getDependants, deleteDependant, dependants, employeeId} = props

    const {data, meta} = dependants

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getDependants(`employeeId=${ employeeId }`).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={ loading }>
            {/*<FilterQualification/>*/ }
            <TlaTableWrapper meta={ meta } extra={
                <TlaAddNew link={ 'form' }>
                    <Button>Add Dependant</Button>
                </TlaAddNew>
            } callbackFunction={ getDependants } data={ data }>
                {
                    ['name', 'relationship', 'dob', 'phone_number', 'alt_phone_number']
                        .map((item, index) => (
                            <Column key={index} title={formatLabel(item)} render={(contact) => (
                                <TableContent newData={contact?.info_update?.new_info?.[item]}
                                              oldData={contact?.[item]}/>
                            )}/>
                        ))
                }
                <Column title="Action" render={ (value) => (
                    <Space size={ 0 }>
                        <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'Dependant' } callBack={ () => {
                            deleteDependant(value.id).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}

Dependant.propTypes = {
    getDependants: PropTypes.func.isRequired,
    deleteDependant: PropTypes.func.isRequired,
    employeeId: PropTypes.number.isRequired,
    dependants: PropTypes.object,
}
const mapStateToProps = (state) => ({
    dependants: state.dependantReducer.dependants,
    employeeId: state.employeeReducer.employee.id
})

const mapDispatchToProps = (dispatch) => ({
    getDependants: (params) => dispatch(handleGetAllDependants(params)),
    deleteDependant: (id) => dispatch(handleDeleteDependant(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dependant)
