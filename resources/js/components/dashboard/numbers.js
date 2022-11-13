import React from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Card, Space} from "antd";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
  .col-item {
      padding: 20px;
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
  }
`

const Item = ({ title, value, otherClass}) => (
    <div className={`col-item w-[150px] md:w-[190px] ${otherClass}`}>
        <div>
            <h5 className={'text-sm'}>{title}</h5>
            <h2 className={'text-2xl font-bold'}>{value}</h2>
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
            <div className={'number-wrapper flex flex-wrap justify-between flex-row'}>
                <Item title={'Total Employees'} value={data.employees.total} otherClass={'firstItem'}/>
                <Item title={'Total Departments'} value={data.departments.length} otherClass={'secondItem'}/>
                <Item title={'Total Ranks'} value={data.ranks.length} otherClass={'thirdItem'}/>
                <Item title={'Total Job Categories'} value={data.jobCategories.length}/>
            </div>
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
