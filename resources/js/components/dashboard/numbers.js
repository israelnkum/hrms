import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Card, Space} from "antd";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  .col-item {
      padding: 20px;
      min-width: 190px;
       // border: solid #59595963 1px;
  }

  .firstItem {
   border-right: solid #59595963 1px;
  }

  .thirdItem {
   border-right: solid #59595963 1px;
  }

  .secondItem {
    border-right: solid #59595963 1px;
  }

  .item-title {
    font-size: 15px;
    color: #000000b0;
  }

  .item-value {
    font-weight: 900;
  }
  .number-wrapper {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }
`

const Item = ({ title, value, otherClass}) => (
    <div className={`col-item ${otherClass}`}>
        <div>
            <h5 className={'item-title'}>{title}</h5>
            <h2 className={'item-value'}>{value}</h2>
        </div>
    </div>
)

Item.propTypes = {
    title: PropTypes.string,
    otherClass: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}
function Numbers ({ data }) {
    return (
        <Card size={'small'}>
            <GlobalStyles/>
            <Space size={0} wrap className={'number-wrapper'}>
                <Item title={'Total Employees'} value={data.employees.total} otherClass={'firstItem'}/>
                <Item title={'Total Departments'} value={data.departments.length} otherClass={'secondItem'}/>
                <Item title={'Total Ranks'} value={data.ranks.length} otherClass={'thirdItem'}/>
                <Item title={'Total Job Categories'} value={data.jobCategories.length}/>
            </Space>
        </Card>
    )
}

Numbers.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        data : state.commonReducer.commons
    }
}

export default connect(mapStateToProps)(Numbers)
