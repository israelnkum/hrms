import {Button, Descriptions, Form, Spin} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {useLocation} from "react-router-dom";
import {handleGetInformationUpdate} from "../../../actions/information-updates/Actions";
import UserInfo from "../user-info";
import {capitalize} from "../../../utils";

function InfoUpdateDetail({getInformationUpdate, informationUpdate}) {
    const [loading, setLoading] = useState(true)
    const [updating, setUpdating] = useState(false)
    const {state} = useLocation()

    const [form] = Form.useForm();

    useEffect(() => {
        getInformationUpdate(state.id).then(() => setLoading(false))
    }, [])

    const formValues = {
        id: 0,
        ...informationUpdate
    };

    const onFinish = () => {
        setUpdating(true);
    };

    return (
        <div className={'w-full'}>
            <div className={'mx-auto'}>
                <Spin spinning={loading || updating}>
                    {
                        !loading &&
                        <Form onFinish={onFinish} layout="vertical" initialValues={formValues} form={form}>
                            <div className={'shadow-lg bg-white'}>
                                <div className={'bg-primary-800 p-3 flex justify-between items-center'}>
                                    <p className={'text-white text-lg'}>
                                        Change in Information Request
                                    </p>
                                    <div className={'flex gap-x-2'}>
                                        <Button className={'!bg-white !rounded-none !text-primary-800'}>Approve</Button>
                                        <Button className={'!rounded-none !text-white'}>Reject</Button>
                                    </div>
                                </div>
                                <div className={'p-3'}>
                                    <UserInfo department={informationUpdate?.department}
                                              name={informationUpdate?.requested_by}/>
                                </div>
                                <div className={'p-3 gap-3'}>
                                    <Descriptions title="Changes" bordered size={'small'} column={{
                                        xxl: 1,
                                        xl: 1,
                                        lg: 1,
                                        md: 1,
                                        sm: 1,
                                        xs: 1,
                                    }}>
                                        {
                                            Object.keys(informationUpdate.old_info).map((item, index) => (
                                                <Descriptions.Item
                                                    key={index}
                                                    label={capitalize(item.replaceAll('_', ' '))}>
                                                    <p className={'text-error-700'}>
                                                        {informationUpdate.old_info[item] ? informationUpdate.old_info[item] : '-'}
                                                    </p>

                                                    <p className={'text-success-700'}>
                                                        {informationUpdate.new_info[item] ? informationUpdate.new_info[item] : '-'}
                                                    </p>
                                                </Descriptions.Item>
                                            ))
                                        }
                                    </Descriptions>
                                </div>
                            </div>
                        </Form>
                    }
                </Spin>
            </div>
        </div>
    )
}

InfoUpdateDetail.propTypes = {
    getInformationUpdate: PropTypes.func.isRequired,
    informationUpdate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    informationUpdate: state.informationUpdateReducer.informationUpdate
})

const mapDispatchToProps = (dispatch) => ({
    getInformationUpdate: (id) => dispatch(handleGetInformationUpdate(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoUpdateDetail)
