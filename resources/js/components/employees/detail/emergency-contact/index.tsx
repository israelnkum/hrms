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
import {
    handleDeleteEmergencyContact,
    handleGetAllEmergencyContacts
} from "../../../../services/emergency-contact.service";

const {Column} = Table

function EmergencyContacts() {
    const emergencyContacts = useAppSelector(state => state.emergencyContact.emergencyContacts);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()

    const {data, meta} = emergencyContacts

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(handleGetAllEmergencyContacts(`employeeId=${employeeId}`)).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaAddNew link={'form'}>
                <Button>Add Contact</Button>
            </TlaAddNew>
            {/*<FilterQualification/>*/}
            <TlaTableWrapper meta={meta} callbackFunction={handleGetAllEmergencyContacts} data={data}>
                {
                    ['name', 'relationship', 'email', 'phone_number', 'alt_phone_number']
                        .map((item, index) => (
                            <Column key={index} title={formatLabel(item)} render={(contact) => (
                                <TableContent newData={contact?.info_update?.new_info?.[item]}
                                              oldData={contact?.[item]}/>
                            )}/>
                        ))
                }
                <Column title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit data={value} link={'form'}/>
                        <TlaConfirm title={'Contact'} callBack={() => {
                            dispatch(handleDeleteEmergencyContact(value.id)).then(unwrapResult).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}

export default EmergencyContacts
