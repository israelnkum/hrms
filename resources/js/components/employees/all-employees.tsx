import {Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaImage from "../../commons/tla-image";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchEmployees} from "../../services/employee.service";
import {unwrapResult} from "@reduxjs/toolkit";

const {Column} = Table

function AllEmployees() {
    const dispatch = useAppDispatch()
    const {employees, filter} = useAppSelector(state => state.employee)
    const {data, meta} = employees
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        dispatch(fetchEmployees(new URLSearchParams()))
            .then(unwrapResult)
            .then((res) => {
                console.log(res)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }, [])

    return (
        <div className={ 'pb-10' }>
            {/*<FilterEmployees/>*/}
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={fetchEmployees}
                data={data} meta={meta} hasSelection numberColumn>
                <Column title="Name" render={ (_, {id, name, staff_id, rank}) => (
                    <Link to={ `/employees/${ id }/${ name }/personal-details` } state={ {staffId: id} }>
                        <Space>
                            <TlaImage size={ 40 } src={ 'Avatar' } name={ name }/>
                            <Space direction={ 'vertical' } size={ 1 }>
                                { name }
                                { `Staff ID: ${ staff_id }` }
                                { rank }
                            </Space>
                        </Space>
                    </Link>
                ) }/>
                <Column title="Department" dataIndex={ 'department' }/>
                <Column title="D.o.B" render={ (_, {dob, age}) => (
                    <Space direction={ 'vertical' } size={ 1 }>
                        { dob } { `Age: ${ age }` }
                    </Space>
                ) }/>
                <Column title="Contact" render={ (_, {telephone, work_telephone, work_email, other_email}) => (
                    <Space direction={ 'vertical' } size={ 1 }>
                        <a href={ `mailto:${ work_email }` }>{ work_email }</a>
                        <a href={ `mailto:${ other_email }` }>{ other_email }</a>
                        <a href={ `tel:${ telephone }` }>{ telephone }</a>
                        <a href={ `tel:${ work_telephone }` }>{ work_telephone }</a>
                    </Space>
                ) }/>
            </TlaTableWrapper>
        </div>
    )
}

export default AllEmployees
