import { Space, Table } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { useOutletContext } from 'react-router'
import { Link } from "react-router-dom";
import { handleGetAllEmployees } from "../../actions/employee/EmployeeAction";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import TlaImage from "../../commons/tla-image";
import Permissions from "../config/permissions";
import FilterEmployees from "./filter-employees";

const {Column} = Table

function AllEmployees(props) {
    const {getEmployees, employees, filter} = props
    const {data, meta} = employees
    const [loading, setLoading] = useState(true)
    const {setPageInfo, setExtra} = useOutletContext();
    useEffect(() => {
        setPageInfo({title: 'Employees', addLink: '/employees/form', buttonText: 'Employee'})

        getEmployees(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div className={ 'pb-10' }>
            <FilterEmployees/>
            <TlaTableWrapper
                formLoading={ loading }
                filterObj={ filter }
                callbackFunction={ getEmployees }
                data={ data } meta={ meta }>
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
                <Column title="Permissions" render={ (_, {permissions, id}) => (
                    <Permissions staffPermissions={ permissions ?? [] } employeeId={ id }/>
                ) }/>
            </TlaTableWrapper>
        </div>
    )
}

AllEmployees.propTypes = {
    pageInfo: PropTypes.object,
    getEmployees: PropTypes.func,
    employees: PropTypes.object,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employees: state.employeeReducer.employees,
    filter: state.employeeReducer.filter,
})

const mapDispatchToProps = (dispatch) => ({
    getEmployees: (payload) => dispatch(handleGetAllEmployees(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(AllEmployees)
