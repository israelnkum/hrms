import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Col, Row } from "antd";
import Numbers from "./numbers/numbers";
import EmployeeChart from "./employee-chart";
import RanksChart from "./ranks-chart";
import MaleAndFemale from "./male-and-female";
import NumbersOne from "./numbers/numbers-one";

function Dashboard () {
    return (
        <Row gutter={[15, 15]}>
           <Col span={24} xs={24} sm={9} md={9} lg={9}>
               <Numbers/>
           </Col>
            <Col span={6} xs={24} sm={24} md={6} lg={6}>
                <MaleAndFemale/>
            </Col>
            <Col span={24} xs={24} sm={9} md={9} lg={9}>
                <NumbersOne/>
            </Col>
            <Col span={8} xs={24} sm={24} md={12} lg={12}>
                <RanksChart/>
            </Col>
            <Col span={8} xs={24} sm={24} md={12} lg={12}>
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
