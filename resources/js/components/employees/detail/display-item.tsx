import {List} from "antd";
import PropTypes from 'prop-types'
import React from 'react'

function DisplayItem({title, value}) {
    return (
        <List.Item>
            <List.Item.Meta className={'!border-b'}
                title={`${title}:`}
                description={value}
            />
        </List.Item>
    )
}

DisplayItem.propTypes = {
    title: PropTypes.string,
    value: PropTypes.any,
}

export default DisplayItem
