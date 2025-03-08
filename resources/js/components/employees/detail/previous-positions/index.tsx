import {Button, Space, Spin, Table} from 'antd'
import {useEffect, useState} from 'react'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchPreviousPositions, removePreviousPosition} from "../../../../services/previous-position.service";
import {unwrapResult} from "@reduxjs/toolkit";

const { Column } = Table

function PreviousPositions () {
    const {previousPositions} = useAppSelector(state => state.previousPosition);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()


    const { data, meta } = previousPositions

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchPreviousPositions(`employeeId=${employeeId}`)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaTableWrapper meta={meta} extra={
                <TlaAddNew link={'form'}>
                    <Button>Add Previous Position</Button>
                </TlaAddNew>
            } callbackFunction={fetchPreviousPositions} data={data}>
                <Column title="Position" dataIndex={'name'}/>
                <Column title="start" dataIndex={'relationship'}/>
                <Column title="end" dataIndex={'email'}/>

                <Column  title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit data={value} link={'form'}/>
                        <TlaConfirm title={'Position'} callBack={()=>{
                            dispatch(removePreviousPosition(value.id)).then(unwrapResult).then(() => TlaSuccess('Position Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}


export default PreviousPositions
