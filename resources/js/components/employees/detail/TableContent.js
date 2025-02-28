import {Space, Typography} from 'antd'
import PropTypes from "prop-types";
import React from 'react'

function TableContent({oldData, newData}) {
    return (
        <Space size={0} direction={'vertical'}>
            <Typography.Text>{oldData ?? '-'}</Typography.Text>
            {
                newData &&
                <Typography.Text className={'text-success-700'}>{newData}</Typography.Text>
            }
        </Space>
    )
}

TableContent.propTypes = {
    oldData: null,
    newData: null
}

TableContent.propTypes = {
    oldData: PropTypes.string,
    newData: PropTypes.string
}

export default TableContent
