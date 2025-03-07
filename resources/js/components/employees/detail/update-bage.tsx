import {Badge} from "antd";
import PropTypes from 'prop-types'
import React from 'react'

function UpdateBadge({children, display}) {
    return (
        display ?
            <Badge.Ribbon placement={'start'} text="Update(s) pending approval" color="darkgreen">
                {children}
            </Badge.Ribbon> :
            <>{children}</>
    )
}

UpdateBadge.propTypes = {
    display: false
}

UpdateBadge.propTypes = {
    children: PropTypes.any,
    display: PropTypes.bool,
}

export default UpdateBadge
