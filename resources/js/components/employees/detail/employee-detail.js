import { Affix, Divider } from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import { BiEnvelope, BiPhone } from "react-icons/bi";
import { connect } from "react-redux";
import { Outlet } from 'react-router'
import Navs from "./navs";

function EmployeeDetail({employee}) {

    // eslint-disable-next-line react/prop-types
    const Title = ({title, text}) => (
        <div>
            <h5 className={ 'text-primary-800 font-bold' }>{ title }</h5>
            <p>{ text }</p>
        </div>
    )
    return (
        <div>
            <Affix offsetTop={ 60 }>
                <Navs/>
            </Affix>
            <div className={ 'bg-white flex pr-4' }>
                <div className={ 'w-[200px]' }>
                    {/*<div className={ 'bg-gray-100 mb-2 py-4 text-center' }>
                     <h3>Out Until Feb 28</h3>
                     <h5>Annual Leave</h5>
                     </div>*/ }

                    <div className={ 'bg-gray-100 pt-3 px-2 flex flex-col gap-3 text-gray-500' }>
                        <div>
                            <p className={ 'flex items-center' }><BiPhone/>&nbsp;
                                <a href={ `tel:${ employee?.telephone }` }>{ employee?.telephone }</a>
                            </p>
                            <p className={ 'flex items-center' }><BiEnvelope/>&nbsp;
                                <a href={ `mailto:${ employee?.work_email }` }>{ employee?.work_email }</a>
                            </p>
                        </div>
                        <Divider className={ '!m-2' }/>
                        <div>
                            <Title text={ employee?.job?.hire_date } title={ 'Hire Date' }/>
                            <Divider className={ '!m-2' }/>
                            <Title text={ `#${ employee?.staff_id }` } title={ 'Staff ID' }/>
                            <Divider className={ '!m-2' }/>
                            <Title text={ employee?.department } title={ 'Department' }/>
                            <Divider className={ '!m-2' }/>
                            <Title text={ employee?.job?.location } title={ 'Job Location' }/>
                        </div>
                        <Divider className={ '!m-2' }/>
                        <div className={ 'pb-5' }>
                            <Title text={ employee?.supervisor ?? '-' } title={ 'Manager' }/>
                        </div>
                    </div>
                </div>
                <div className={ 'grow pt-4 pl-4 bg-white' }>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

EmployeeDetail.propTypes = {
    pageInfo: PropTypes.object,
    employee: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee
})

export default connect(mapStateToProps)(EmployeeDetail)
