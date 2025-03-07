import {useEffect, useState} from 'react'
import DetailWrapper from "../detail-wrapper";
import {Spin} from "antd";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {handleGetSingleContactDetail} from "../../../../services/contact-details.service";
import {unwrapResult} from "@reduxjs/toolkit";

function ContactDetails() {
    const contactDetail = useAppSelector(state => state.contactDetails.contactDetail);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()
    const {info_update} = contactDetail
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(handleGetSingleContactDetail(employeeId)).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <Spin spinning={loading}>
            <DetailWrapper
                oldData={contactDetail} newData={info_update}
                fields={[
                    'address',
                    'city',
                    'region',
                    'country',
                    'nationality',
                    'zip_code',
                    'telephone',
                    'work_telephone',
                    'work_email',
                    'other_email',
                ]}/>
        </Spin>
    )
}

export default ContactDetails
