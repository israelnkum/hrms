import {Button, Space, Spin, Table, Typography} from 'antd'
import {useEffect, useState} from 'react'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {unwrapResult} from "@reduxjs/toolkit";
import {
    handleDeleteCommunityService,
    handleGetAllCommunityServices
} from "../../../../services/community-service.service";

const {Paragraph} = Typography;
const {Column} = Table

function CommunityService() {
    const communityServices = useAppSelector(state => state.communityService.communityServices);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()

    const {data, meta} = communityServices

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(handleGetAllCommunityServices(`employeeId=${ employeeId }`)).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={ loading }>
            {/*<FilterQualification/>*/ }
            <TlaTableWrapper meta={ meta } extra={
                <TlaAddNew link={ 'form' }>
                    <Button>Add Service</Button>
                </TlaAddNew>
            } callbackFunction={ handleGetAllCommunityServices } data={ data }>
                <Column title="Start Date" dataIndex={ 'start_date' }/>
                <Column title="End Date" dataIndex={ 'end_date' }/>

                <Column title="Description" render={ (value) => (
                   <Paragraph ellipsis className={'w-[200px]'}>{ value.description }</Paragraph>
                ) }/>
                <Column title="Action" render={ (value) => (
                    <Space size={ 0 }>
                        <TlaEdit icon data={ value } link={ 'form' } type={ 'text' }/>
                        <TlaConfirm title={ 'CommunityService' } callBack={ () => {
                            dispatch(handleDeleteCommunityService(value.id)).then(unwrapResult).then(() => TlaSuccess('Record Deleted'))
                        } }/>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </Spin>
    )
}


export default CommunityService
