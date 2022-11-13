import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Calendar, Card, Col, Row} from "antd";
import Numbers from "./numbers";
import EmployeeChart from "./employee-chart";
import RanksChart from "./ranks-chart";
import MaleAndFemale from "./male-and-female";

function Dashboard (props) {
    const {activeRoles} = props
    return (
        <Row gutter={[10, 5]} style={{ borderRadius: '10px', padding: '5px'}}>
           <Col span={24} xs={24} sm={24} md={24} lg={24}>
               <Numbers/>
           </Col>
           <Col span={24} xs={24} sm={24} md={10} lg={10}>
               <RanksChart/>
           </Col>
            <Col span={8} xs={24} sm={24} md={8} lg={8}>
                <Card size={'small'}>
                    <Calendar fullscreen={false} />
                </Card>
            </Col>
            <Col span={6} xs={24} sm={24} md={6} lg={6}>
                <MaleAndFemale/>
            </Col>
            <Col className={'hidden md:block'} span={24} xs={24} sm={24} md={24} lg={24}>
                <EmployeeChart/>
            </Col>
        </Row>
    )
}

Dashboard.propTypes = {
    activeRoles: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
    return {
        activeRoles : state.userReducer.activeRoles
    }
}

export default connect(mapStateToProps)(Dashboard)
