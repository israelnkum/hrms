import {Spin} from "antd";
import React, {useEffect, useState} from 'react'
import DetailWrapper from "../detail-wrapper";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchNextOfKin} from "../../../../services/next-of-kin.service";
import {unwrapResult} from "@reduxjs/toolkit";

function NextOfKin() {
    const nextOfKin = useAppSelector(state => state.nextOfKins.nextOfKin)
    const employeeId = useAppSelector(state => state.employee.employee.id)
    const dispatch = useAppDispatch()
    const {info_update} = nextOfKin
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(fetchNextOfKin(Number(employeeId))).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading} tip={'Please wait'}>
            <DetailWrapper
                oldData={nextOfKin}
                newData={info_update}
                fields={['name', 'phone_number', 'alt_phone_number', 'email', 'address']}/>
        </Spin>
    )
}

export default NextOfKin
