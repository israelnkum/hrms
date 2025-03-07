import React from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import FilterWrapper from "../../../../commons/filter/filter-wrapper";
import {
    handleExportQualifications,
    handleGetAllQualifications
} from "../../../../actions/employee/qualification/QualificationAction";

function FilterQualification (props) {
    const { submitFilter, filter, exportFilter } = props

    return (
        <FilterWrapper initialValue={filter} submitFilter={submitFilter} exportFilter={exportFilter}/>
    )
}

FilterQualification.propTypes = {
    submitFilter: PropTypes.func,
    exportFilter: PropTypes.func,
    filter: PropTypes.object,
}

const mapStateToProps = (state) => ({
    filter: state.qualificationReducer.filter
})

const mapDispatchToProps = (dispatch) => ({
    submitFilter: (params) => dispatch(handleGetAllQualifications(params)),
    exportFilter: (params) => dispatch(handleExportQualifications(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(FilterQualification)
