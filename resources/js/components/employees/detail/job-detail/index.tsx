import {Spin} from "antd";
import {useEffect, useState} from 'react'
import DetailWrapper from "../detail-wrapper";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {handleGetSingleJobDetail} from "../../../../services/job-details.service";
import {unwrapResult} from "@reduxjs/toolkit";


function Job() {
    const jobDetail = useAppSelector(state => state.jobDetails.jobDetail);
    const employeeId = useAppSelector(state => state.employee.employee.id);
    const dispatch = useAppDispatch()
    const {info_update} = jobDetail

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(handleGetSingleJobDetail(employeeId)).then(unwrapResult).then(() => {
            setLoading(false)
        })
    }, [])
    return (
        <Spin spinning={loading} tip={'Please wait'}>
            <DetailWrapper
                oldData={jobDetail}
                newData={info_update}
                fields={[
                    'job_title', 'joined_date', 'location',
                    'job_category', 'contract_start_date',
                    'contract_end_date', 'sub_unit', 'position_id', 'job_category_id'
                ]}/>
        </Spin>
    )
}

export default Job
