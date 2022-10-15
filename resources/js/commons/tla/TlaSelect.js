import React from 'react'
import PropTypes from 'prop-types'
import {Form, Select} from 'antd'


const TlaSelect = (props) => {
    const {options, optionKey, label, name, required} = props

    return (
        <Form.Item
            label={label}
            name={name}
            rules={[
                {
                    required: required,
                    message: 'Required'
                }
            ]}>
            <Select size={'large'}
                    placeholder="Select"
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                    allowClear showSearch>
                {
                    options.map((option) => (
                        <Select.Option key={option.id || option.name}
                                       value={option.id}>{option[optionKey]}</Select.Option>
                    ))
                }
            </Select>
        </Form.Item>
    )
}
TlaSelect.propTypes = {
    required: false
}

TlaSelect.propTypes = {
    label: PropTypes.string,
    optionKey: PropTypes.node,
    required: PropTypes.bool,
    name: PropTypes.string,
    options: PropTypes.array
}

export default TlaSelect
