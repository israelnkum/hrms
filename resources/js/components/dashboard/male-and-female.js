import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Card, Space} from "antd";
import {createGlobalStyle} from "styled-components";
import {IoIosFemale, IoIosMale} from "react-icons/io";

const GlobalStyles = createGlobalStyle`
    .m-col-item {
        padding: 20px;
        min-width: 200px;
    }

    .m-first-item {

    }

    .thirdItem {

    }

    .secondItem {

    }

    .m-item-title {
        font-size: 15px;
        color: #fff;
    }

    .m-item-value {
        font-weight: 900;
        color: #fff;
    }

    .male-and-female {
        background: #0985E2;
    }

    .m-item-user {
        color: #fff;
        font-size: 35px;
    }
`

const Item = ({ title, value, icon, otherClass}) => (
    <div className={`m-col-item ${otherClass}`}>
        <Space align={'center'} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
                <h5 className={'m-item-title'}>{title}</h5>
                <h2 className={'m-item-value'}>{value}</h2>
            </div>
            {icon}
        </Space>
    </div>
)

Item.propTypes = {
    title: PropTypes.string,
    otherClass: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    icon: PropTypes.any
}
function MaleAndFemale ({ data }) {
    return (
        <Card title={<span style={{ color: 'white' }}>EMPLOYEE BY GENDER</span>} className={'male-and-female'}>
            <GlobalStyles/>
            <Space direction={'vertical'} size={0} wrap className={'number-wrapper'}>
                <Item title={'Males'} value={data.employees.male} otherClass={'m-first-item'} icon={<IoIosMale className={'m-item-user'}/>}/>
                <Item title={'Females'} value={data.employees.female} icon={<IoIosFemale className={'m-item-user'}/>}/>
            </Space>
        </Card>
    )
}

MaleAndFemale.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        data : state.commonReducer.commons
    }
}

export default connect(mapStateToProps)(MaleAndFemale)
