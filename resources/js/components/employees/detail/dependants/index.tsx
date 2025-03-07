import {Button, Space, Spin, Table} from 'antd'
import {useEffect, useState} from 'react'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {formatLabel} from "../../../../utils";
import TableContent from "../TableContent";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {handleDeleteDependant, handleGetAllDependants} from "../../../../services/dependant.service";

const {Column} = Table

function Dependant() {
    const dependants = useAppSelector(state => state.dependant.dependants);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()
    const {data, meta} = dependants

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(handleGetAllDependants(`employeeId=${ employeeId }`)).then(unwrapResult).then(() => {
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
            } callbackFunction={ handleGetAllDependants } data={ data }>
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
                            dispatch(handleDeleteDependant(value.id)).then(unwrapResult).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}

export default Dependant
