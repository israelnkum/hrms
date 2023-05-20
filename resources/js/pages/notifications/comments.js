import {Form, Input} from "antd";
import React, {useEffect} from 'react';
import {connect} from 'react-redux';

function Comments() {
    const [form] = Form.useForm();

    useEffect(() => {
    }, [])

    const formValues = {
        id: 0
    };

    const onFinish = (values) => {
        console.log({values})
        // setUpdating(true);
    };

    return (
        <div className={'w-full'}>
            <div className={'mx-auto'}>
                <Form onFinish={onFinish} layout="vertical" initialValues={formValues} form={form}>
                    <Form.Item label={'Comment'}>
                        <Input.TextArea/>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

Comments.propTypes = {
}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Comments)
