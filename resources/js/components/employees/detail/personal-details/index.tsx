import {useEffect, useState} from 'react'
import {useParams} from "react-router";
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import DetailWrapper from "../detail-wrapper";
import {useAppDispatch, useAppSelector} from "../../../../hooks";
import {fetchEmployee} from "../../../../services/employee.service";
import {unwrapResult} from "@reduxjs/toolkit";

function PersonalDetails() {
    const employee = useAppSelector(state => state.employee.employee)
    const dispatch = useAppDispatch()
    const {id} = useParams()
    const {info_update} = employee
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        dispatch(fetchEmployee(Number(id))).then(unwrapResult).then(() => setLoading(false))
    }, [])

    return (
        <ViewAllWrapper loading={loading} noData={false}>
            <DetailWrapper
                editLink={`/employees/${id}/${employee.name}/edit`}
                oldData={employee}
                newData={info_update}
                fields={[
                    'staff_id', 'first_name', 'middle_name', 'last_name', 'gender', 'marital_status', 'dob',
                    'department', 'gtec_placement_name', 'qualification', 'rank', 'ssnit_number'
                ]}/>
        </ViewAllWrapper>
    )
}

export default PersonalDetails
