import {Col, List, Row} from "antd";
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useParams} from "react-router";
import {handleGetSingleEmployee} from "../../../../actions/employee/EmployeeAction";
import TlaEdit from "../../../../commons/tla-edit";
import ViewAllWrapper from "../../../../commons/view-all-wrapper";
import NextOfKin from "../next-of-kin";
import UpdateNotification from "../../update-notification";

const Item = ({title, value}) => (
    <List.Item>
        <List.Item.Meta
            title={`${title}:`}
            description={value}
        />
    </List.Item>
)

Item.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
}

function PersonalDetails(props) {
    const {getEmployee, employee} = props
    const {id} = useParams()
    const {info_update} = employee
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEmployee(id).then(() => setLoading(false))
    }, [])
    return (
        <ViewAllWrapper loading={loading} noData={false}>
            <Row gutter={10} justify={'space-between'}>
                <Col span={24}>
                    <div className={'flex justify-end'}>
                        <TlaEdit data={employee} icon link={`/employees/${id}/${employee.name}/edit`} text={'Edit'}/>
                    </div>
                </Col>
                <Col span={11}>
                    <List size="small" itemLayout="horizontal">
                        <Item title={'Employee ID'} value={employee.staff_id}/>
                        <Item title={'First Name'} value={
                            <UpdateNotification
                                value={employee?.first_name}
                                updateValue={info_update?.new_info['first_name']}/>
                        }/>
                        <Item title={'Middle Name'} value={
                            <UpdateNotification
                                value={employee?.middle_name}
                                updateValue={info_update?.new_info['middle_name']}/>
                        }/>
                        <Item title={'Last Name'} value={
                            <UpdateNotification
                                value={employee?.last_name}
                                updateValue={info_update?.new_info['last_name']}/>
                        }/>
                        <Item title={'Gender'} value={
                            <UpdateNotification
                                value={employee?.gender}
                                updateValue={info_update?.new_info['gender']}/>
                        }/>

                        <Item title={'Marital Status'} value={
                            <UpdateNotification
                                value={employee?.marital_status}
                                updateValue={info_update?.new_info['marital_status']}/>
                        }/>

                        <Item title={'Date of Birth'} value={
                            <UpdateNotification
                                value={employee?.dob}
                                updateValue={info_update?.new_info['dob']}/>
                        }/>
                    </List>
                </Col>
                <Col span={11}>
                    <List size="small" itemLayout="horizontal">
                        <Item title={'Department'} value={employee.department}/>
                        <Item title={'GTEC Placement'} value={employee.gtec_placement_name}/>
                        <Item title={'Qualification'} value={employee?.qualification}/>
                        <Item title={'Rank'} value={
                            <UpdateNotification
                                value={employee?.rank}
                                updateValue={info_update?.new_info['rank']}/>
                        }/>
                        <Item title={'SSNIT No'} value={
                            <UpdateNotification
                                value={employee?.ssnit_number}
                                updateValue={info_update?.new_info['ssnit_number']}/>
                        }/>
                    </List>
                </Col>
            </Row>
            <NextOfKin/>
        </ViewAllWrapper>
    )
}

PersonalDetails.propTypes = {
    getEmployee: PropTypes.func,
    employee: PropTypes.object,
}

const mapStateToProps = (state) => ({
    employee: state.employeeReducer.employee
})

const mapDispatchToProps = (dispatch) => ({
    getEmployee: (payload) => dispatch(handleGetSingleEmployee(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(PersonalDetails)
