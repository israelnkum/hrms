import PropTypes from "prop-types";
import React from 'react'
import { BsBriefcase } from "react-icons/bs";
import { FiPhoneCall, FiUser, FiUsers } from "react-icons/fi";
import { TbCertificate, TbReportAnalytics } from "react-icons/tb";
import { connect } from "react-redux";
import { Link, useMatch } from "react-router-dom";
import TlaImage from "../../../commons/tla-image";

function Navs({employee}) {
    const modules = [
        {
            title: 'Personal Details',
            icon: <FiUser/>,
        },
        {
            title: 'Contact Details',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Emergency Contacts',
            icon: <FiPhoneCall/>,
        },
        {
            title: 'Dependents',
            icon: <FiUsers/>,
        },
        {
            title: 'Job',
            icon: <BsBriefcase/>,
        },
        // {
        //     title: 'Salary',
        //     icon: <BiCoinStack/>,
        // },
        {
            title: 'Direct Reports',
            icon: <TbReportAnalytics/>,
        },
        {
            title: 'Qualifications',
            icon: <TbCertificate/>,
        },
        {
            title: 'Community Services',
            icon: <TbCertificate/>,
        }
    ]

    function formatUrl(text) {
        return text.toLowerCase().replace(' ', '-')
    }

    return (
        <div className={ 'bg-primary-800 px-4 rounded-t-lg' }>
            <div className={ 'relative flex gap-3 items-center' }>
                <div className={'absolute top-[30px]'}>
                    <TlaImage size={ 130 } src={ employee.photo } name={ employee.name }/>
                </div>
                <div className={ 'flex flex-col justify-between ml-[176px]' }>
                    <div className={'mt-3 flex justify-between items-center'}>
                        <div>
                            <h3 className={ 'text-2xl text-white font-bold leading-1 mb-0' }>{ employee.name }</h3>
                            <p className={ 'text-base text-white' }>{ employee.rank }</p>
                        </div>
                        <div>
                            {/*<Button type={'default'} className={'text-white hover:text-white'}>Request Change</Button>*/}
                        </div>
                    </div>
                    <div className={ 'flex gap-3 mt-8' }>
                        {
                            modules.map((item) => {
                                const to = formatUrl(item.title)
                                const match = useMatch(`/employees/:id/:name/${ to }`)

                                return (
                                    <div key={ item.title } className={ `${match ? 'bg-white' : ''} pt-3 pb-2 rounded-t-lg` }>
                                        <Link className={ `${ match ? 'text-black' : 'text-white' } text-[13px] px-2` }
                                              to={ to }>
                                            { item.title }
                                        </Link>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

Navs.propTypes = {
    employee: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee,
})

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Navs);
