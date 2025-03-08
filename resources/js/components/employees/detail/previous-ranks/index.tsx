import {Button, Space, Spin, Table} from 'antd'
import {useEffect, useState} from 'react'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchPreviousRanks, removePreviousRank} from "../../../../services/previous-rank.service";
import {unwrapResult} from "@reduxjs/toolkit";

const {Column} = Table

function PreviousRanks() {
    const {previousRanks} = useAppSelector(state => state.previousRank);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()

    const {data, meta} = previousRanks

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchPreviousRanks(`employeeId=${employeeId}`)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'form'}>
                    <Button>Add Previous Rank</Button>
                </TlaAddNew>
            } callbackFunction={fetchPreviousRanks} data={data}>
                <Column title="Rank" dataIndex={'name'}/>
                <Column title="start" dataIndex={'relationship'}/>
                <Column title="end" dataIndex={'email'}/>

                <Column title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit data={value} link={'form'}/>
                        <TlaConfirm title={'Contact'} callBack={() => {
                            dispatch(removePreviousRank(value.id)).then(unwrapResult).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}

export default PreviousRanks
