import {Button, Space, Spin, Table} from 'antd'
import {useEffect, useState} from 'react'
import TlaTableWrapper from "../../../../commons/table/tla-table-wrapper";
import TlaAddNew from "../../../../commons/tla-add-new";
import TlaEdit from "../../../../commons/tla-edit";
import TlaConfirm from "../../../../commons/TlaConfirm";
import {TlaSuccess} from "../../../../utils/messages";
import {formatLabel} from "../../../../utils";
import TableContent from "../TableContent";
import {Link} from "react-router-dom";
import {FiFile} from "react-icons/fi";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {handleDeleteQualification, handleGetAllQualifications} from "../../../../services/qualification.service";
import {unwrapResult} from "@reduxjs/toolkit";

const {Column} = Table

function Qualifications() {
    const qualifications = useAppSelector(state => state.qualification.qualifications);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()
    const {data, meta} = qualifications

    const [loading, setLoading] = useState(true)


    useEffect(() => {
        dispatch(handleGetAllQualifications(`employeeId=${employeeId}`)).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <TlaAddNew link={'form'}>
                <Button>Add Qualification</Button>
            </TlaAddNew>
            {/*<FilterQualification/>*/}
            <TlaTableWrapper meta={meta} callbackFunction={handleGetAllQualifications} data={data}>
                {
                    ['institution', 'qualification', 'date']
                        .map((item, index) => (
                            <Column key={index} title={formatLabel(item)} render={(contact) => (
                                <TableContent newData={contact?.info_update?.new_info?.[item]}
                                              oldData={contact?.[item]}/>
                            )}/>
                        ))
                }
                <Column title={'certificate'} render={({photo}) => (
                    <Space size={0} direction={'vertical'}>
                        {
                            photo?.file_name ?
                                <Link target={'_blank'}
                                      className={'flex gap-2 text-decoration-none items-center !underline'}
                                      to={`${photo?.filepath + photo?.file_name}`}>
                                    <FiFile/> File
                                </Link>
                                : '-'
                        }


                        {
                            photo?.info_update &&
                            <Link target={'_blank'}
                                  className={'flex gap-2 text-success-700 text-decoration-none items-center !underline'}
                                  to={`${photo?.filepath + photo.info_update?.new_info.file_name}`}>
                                <FiFile/> New File
                            </Link>
                        }
                    </Space>
                )}/>
                <Column title="Action" render={(value) => (
                    <Space size={0}>
                        <TlaEdit data={value} link={'form'}/>
                        <TlaConfirm title={'Qualification'} callBack={() => {
                            dispatch(handleDeleteQualification(value.id)).then(unwrapResult).then(() => TlaSuccess('Record Deleted'))
                        }}/>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </Spin>
    )
}

export default Qualifications
