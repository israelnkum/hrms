import React from 'react'
import PropTypes from 'prop-types'
import {Button, Upload} from 'antd'
import {UploadOutlined} from '@ant-design/icons'

export default function TlaUpload ({file = null, onUpload, handleUpload, loading = false}) {

    const uploadProps = {
        beforeUpload: (file) => {
            onUpload(file)
            return true
        },
        listType: 'text',
        maxCount: 1,
        onRemove: () => {
            onUpload(null)
        },
        accept: ['application/pdf'],
        method: 'get'
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'flex-start'}}>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />}>
                        {file == null ? 'Select' : 'Change'}
                    </Button>
                </Upload>
                <Button loading={loading} onClick={handleUpload} type={'primary'} disabled={file === null}>
                    Upload
                </Button>
            </div>
            <small style={{ color: 'red'}}>
                Only PDF is required
            </small>
        </div>
    )
}

TlaUpload.propTypes = {
    onUpload: PropTypes.func.isRequired,
    handleUpload: PropTypes.func.isRequired,
    loading: PropTypes.bool,
    file: PropTypes.any,
}
