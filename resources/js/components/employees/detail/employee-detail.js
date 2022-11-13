import React, {useEffect} from 'react'
import {Affix, Card, Col, Row} from 'antd'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {Outlet, useOutletContext, useParams} from 'react-router'
import Navs from "./navs";

function EmployeeDetail () {
    const { name } = useParams()
    const { setPageInfo, setExtra } = useOutletContext();
    useEffect(() => {
        setPageInfo({ title: name, addLink: null, buttonText: 'Employee', image: 'src' })
    }, [])

    return (
        <Row gutter={10}>
            <Col span={18} xs={24} sm={24} md={18} lg={18} xl={18}>
                <Card>
                    <Outlet/>
                </Card>
            </Col>
            <Col span={6} xs={24} sm={24} md={6} lg={6} xl={6}>
                <Affix offsetTop={60}>
                    <Navs/>
                </Affix>
            </Col>
        </Row>
    )
}

EmployeeDetail.propTypes = {
    pageInfo: PropTypes.object,
}

export default connect()(EmployeeDetail)
