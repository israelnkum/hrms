import React from 'react'
import { connect } from 'react-redux'
import PropTypes from "prop-types";

function NotificationHeader({ title }) {

    return (
        <div className={'bg-primary-800 text-white p-3'}>
            <h3 className={ 'text-lg text-white' }>{title}</h3>
        </div>
    )
}


NotificationHeader.defaultProps = {
    title: ''
}

NotificationHeader.propTypes = {
    title: PropTypes.string
}

export default connect()(NotificationHeader)
