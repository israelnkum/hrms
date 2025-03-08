import {Form, Input, Space, Table} from 'antd'
import {useEffect, useState} from 'react'
import {Link} from "react-router-dom";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaImage from "../../commons/tla-image";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchEmployees} from "../../services/employee.service";
import {unwrapResult} from "@reduxjs/toolkit";
import TlaAddNew from "../../commons/tla-add-new";
import {IoFilterOutline} from "react-icons/io5";
import {BiSearch} from "react-icons/bi";

const {Column} = Table

function AllEmployees() {
    const dispatch = useAppDispatch()
    const {employees, filter} = useAppSelector(state => state.employee)
    const {data, meta} = employees
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getData()
    }, [])

    const getData = (values? : any) => {
        dispatch(fetchEmployees(new URLSearchParams(values)))
            .then(unwrapResult)
            .then((res) => {
                console.log(res)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setLoading(false)
            })
    }
    const handleSearch = (values) => {
        getData(values)
    }

    return (
        <div className={'pb-10'}>
            <div className={'flex items-center mb-5'}>
                <div className={'flex items-center w-1/2 justify-between'}>
                    <Form onFinish={handleSearch} className={'w-full'} size={'large'} >
                        <div className={'flex items-center gap-2'}>
                            <Form.Item noStyle name={'search'} rules={[ { required: true }]}>
                                <Input
                                    onClear={() => getData()}
                                    prefix={<BiSearch/>}
                                    placeholder={'Search by staff id, phone number, lastname or firstname'}
                                    className={'!h-11 !rounded-full pl-5'}
                                    allowClear
                                    suffix={<button type={'submit'} className={'w-fit !rounded-full'}>Search</button>}
                                />
                            </Form.Item>
                        </div>
                    </Form>
                </div>
                <div className={'ml-auto'}>
                    <TlaAddNew link={"/employees/filter"}>
                        <p className={'flex justify-center items-center text-sm gap-2 border w-fit rounded-lg px-3 py-2 border-gray-300'}>
                            <IoFilterOutline /> Filter
                        </p>
                    </TlaAddNew>
                </div>
            </div>
            <TlaTableWrapper
                formLoading={loading}
                filterObj={filter}
                callbackFunction={fetchEmployees}
                data={data} meta={meta} hasSelection numberColumn>
                <Column title="Name" render={(_, {id, name, staff_id, rank}) => (
                    <Link to={`/employees/${id}/${name}/personal-details`} state={{staffId: id}}>
                        <Space>
                            <TlaImage size={40} src={'Avatar'} name={name}/>
                            <Space direction={'vertical'} size={1}>
                                {name}
                                {`Staff ID: ${staff_id}`}
                                {rank}
                            </Space>
                        </Space>
                    </Link>
                )}/>
                <Column title="Department" dataIndex={'department'}/>
                <Column title="D.o.B" render={(_, {dob, age}) => (
                    <Space direction={'vertical'} size={1}>
                        {dob} {`Age: ${age}`}
                    </Space>
                )}/>
                <Column title="Contact" render={(_, {telephone, work_telephone, work_email, other_email}) => (
                    <Space direction={'vertical'} size={1}>
                        <a href={`mailto:${work_email}`}>{work_email}</a>
                        <a href={`mailto:${other_email}`}>{other_email}</a>
                        <a href={`tel:${telephone}`}>{telephone}</a>
                        <a href={`tel:${work_telephone}`}>{work_telephone}</a>
                    </Space>
                )}/>
            </TlaTableWrapper>
        </div>
    )
}

export default AllEmployees
