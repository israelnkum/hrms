import React, {useEffect, useState} from 'react'
import {Space, Table} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import TlaTableWrapper from "../../commons/table/tla-table-wrapper";
import {useOutletContext} from 'react-router'
import TlaImage from "../../commons/tla-image";
import {Link} from "react-router-dom";
import {handleGetAllEmployees} from "../../actions/employee/EmployeeAction";
import ViewAllWrapper from "../../commons/view-all-wrapper";
import FilterEmployees from "./filter-employees";

const { Column } = Table
function AllEmployees (props) {
    const { getEmployees, employees, filter } = props
    const { data, meta }= employees
    const [loading, setLoading] = useState(true)
    const { setPageInfo, setExtra } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: 'Employees', addLink: '/pim/employees/form', buttonText: 'Employee' })

        getEmployees(new URLSearchParams(filter)).then(() => {
            setLoading(false)
        })
    }, [])

    return (
        <div>
            <FilterEmployees/>
            <ViewAllWrapper loading={loading} noData={data.length === 0}>
                <TlaTableWrapper filterObj={filter}  callbackFunction={getEmployees} data={data} meta={meta}>
                    <Column title="Name" render={(_, {id, name, staff_id}) => (
                        <Link to={`${id}/${name}`} state={{ staffId: id }}>
                            <Space>
                                <TlaImage size={40} src={'Avatar'} name={name}/>
                                <Space direction={'vertical'} size={1}>
                                    {name}
                                    {`Staff ID: ${staff_id}`}
                                </Space>
                            </Space>
                        </Link>
                    )}/>
                    <Column title="Department" dataIndex={'department'}/>
                    <Column title="D.o.B" render={(_, {dob, age}) => (
                        <Space direction={'vertical'} size={1}>
                            {dob}  {`Age: ${age}`}
                        </Space>
                    )}/>
                    <Column title="Phone" render={(_, {telephone, work_telephone}) => (
                        <Space direction={'vertical'} size={1}>
                            <a href={`tel:${telephone}`}>{telephone}</a>
                            <a href={`tel:${work_telephone}`}>{work_telephone}</a>
                        </Space>
                    )}/>
                    <Column title="Email" render={(_, {work_email, other_email}) => (
                        <Space direction={'vertical'} size={1}>
                            <a href={`tel:${work_email}`}>{work_email}</a>
                            <a href={`tel:${other_email}`}>{other_email}</a>
                        </Space>
                    )}/>
                    <Column title="GTECH Placement & Rank" render={(_, {gtech_placement, rank}) => (
                        <Space direction={'vertical'} size={1}>
                            {gtech_placement}
                            {rank}
                        </Space>
                    )}/>
                </TlaTableWrapper>
            </ViewAllWrapper>
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
