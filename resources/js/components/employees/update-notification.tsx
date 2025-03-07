import PropTypes from 'prop-types'
import React from 'react'

function UpdateNotification(props) {
    const {value, updateValue} = props

    return (
        <div className={'flex gap-2 flex-wrap'}>
            {value}
            {
                updateValue ?
                    <span className={'text-success-700'}>{updateValue}</span> : ''
            }
        </div>
    )
}

UpdateNotification.propTypes = {
    value: PropTypes.string,
    updateValue: PropTypes.string,
}

export default UpdateNotification
