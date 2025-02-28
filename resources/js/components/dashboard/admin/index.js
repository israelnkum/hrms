import PropTypes from "prop-types";
import React, {useState} from 'react'
import {connect} from "react-redux";
import {Button, Form, Input} from "antd";
import api from "../../../utils/api";
import {TlaError, TlaSuccess} from "../../../utils/messages";

function AdminDashboard() {
    const [data, setData] = useState(null)
    const onSearch = (values) => {
        setData(null)
        api().get(`search-staff-id?staffId=${values.staffId}`).then((res) => {
            setData(res.data)
        }).catch((err) => {
            TlaError(err?.response?.data?.message ?? 'Employee not found')
        })
    }

    const updateMail = (values) => {
        api().post(`update-mail`, values).then((res) => {
            setData(null)
            TlaSuccess(res.data.message)
        }).catch((err) => {
            TlaError(err?.message ?? 'Something went wrong')
        })
    }

    return (
        <div>
            Admin Dashboard
            <div className={'flex justify-center items-center'}>

                <div className={'w-full md:w-1/2 p-5 bg-white'}>
                    {
                        !data &&
                        <div>
                            <Form onFinish={onSearch} layout={'vertical'}>
                                <Form.Item label={'Search'} name={'staffId'} rules={[{required: true}]}>
                                    <Input/>
                                </Form.Item>
                                <Button htmlType={'submit'}>Search</Button>
                            </Form>
                        </div>
                    }
                    {
                        data &&
                        <Form onFinish={updateMail} initialValues={data?.contact_detail} layout={'vertical'}>
                            <div>
                                <p>First Name(s): {data?.first_name} {data?.middle_name}</p>
                                <p>Last Name: {data?.last_name}</p>
                            </div>
                            <Form.Item label={'Email'} name={'work_email'} rules={[{type: 'email'}, {required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item hidden label={'EmployeeId'} name={'employee_id'} rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <Form.Item hidden label={'id'} name={'id'} rules={[{required: true}]}>
                                <Input/>
                            </Form.Item>
                            <div className={'flex justify-center gap-3'}>
                                <Button htmlType={'button'} onClick={() => setData(null)}>Cancel</Button>
                                <Button type={'primary'} htmlType={'submit'}>Update</Button>
                            </div>
                        </Form>
                    }
                </div>
            </div>
        </div>
    )
}

AdminDashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles: state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(AdminDashboard)
