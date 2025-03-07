import React from 'react'
import {connect} from 'react-redux'
import PropTypes from "prop-types";

function NotificationHeader({title = '', status = '', actions = ''}) {

    return (
        <div className={'bg-primary-800 max-h-[60px] p-3 flex justify-between items-center'}>
            <p className={'text-white text-lg'}>
                {title}
            </p>
            <div>
                {
                    status === 'pending' ?
                        <div className={'flex gap-x-2'}>{actions}</div> :
                        <div className={'bg-white h-[60px] p-3'}>{status}</div>
                }
            </div>
        </div>
    )
}

NotificationHeader.propTypes = {
    title: PropTypes.string,
    status: PropTypes.string,
    actions: PropTypes.any,
}

export default connect()(NotificationHeader)
