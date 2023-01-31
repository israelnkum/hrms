import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NumberItem from "./number-item";

function Numbers ({ data }) {
    return (
        <div>
            <div className={'flex flex-wrap justify-start gap-3'}>
                <NumberItem title={'Total Employees'} value={data.employees.total}/>
                <NumberItem title={'Total Departments'} value={data.departments.length}/>
                <NumberItem title={'Total Ranks'} value={data.ranks.length}/>
                <NumberItem title={'Job Categories'} value={data.jobCategories.length}/>
            </div>
        </div>
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
