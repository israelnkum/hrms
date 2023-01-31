import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import NumberItem from "./number-item";

function NumbersOne ({ data }) {
    return (
        <div>
            <div className={'flex flex-wrap justify-start gap-3'}>
                <NumberItem title={'Junior Staff'} value={data.employees.total}/>
                <NumberItem title={'Senior Staff'} value={data.departments.length}/>
                <NumberItem title={'Senior Members'} value={data.ranks.length}/>
                <NumberItem title={'Secondment Staff'} value={data.jobCategories.length}/>
            </div>
        </div>
    )
}

NumbersOne.propTypes = {
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        data : state.commonReducer.commons
    }
}

export default connect(mapStateToProps)(NumbersOne)
