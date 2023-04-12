import React from 'react'
import { connect } from 'react-redux'

function NotificationHeader() {

    return (
        <div className={'bg-primary-800 text-white p-3'}>
            <h3 className={ 'text-lg text-white' }>Time Off Request</h3>
        </div>
    )
}


NotificationHeader.defaultProps = {}

NotificationHeader.propTypes = {}

export default connect()(NotificationHeader)
