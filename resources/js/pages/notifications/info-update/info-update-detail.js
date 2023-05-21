import {Button, Descriptions, Form, Input, Popconfirm, Spin} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {handleGetInformationUpdate, handleUpdateInformationRequest} from "../../../actions/information-updates/Actions";
import UserInfo from "../user-info";
import {capitalize} from "../../../utils";
import NotificationHeader from "../notification-header";
import {useParams} from "react-router";
import {TlaSuccess} from "../../../utils/messages";
import {FiFile} from "react-icons/fi";

function InfoUpdateDetail({getInformationUpdate, informationUpdate, updateInformationRequest}) {
    const [loading, setLoading] = useState(true)
    const [status, setStatus] = useState(null)
    const {state} = useLocation()
    const {id} = useParams()

    const navigate = useNavigate()
    const [form] = Form.useForm();

    useEffect(() => {
        getInformationUpdate(state?.id ?? id).then(() => setLoading(false))
    }, [])

    const formValues = {
        id: 0,
        ...informationUpdate
    };

    const onFinish = (values) => {
        setLoading(true)
        updateInformationRequest({
            ...values, status
        }).then((res) => {
            setLoading(false)
            TlaSuccess(res.data.message)
            navigate('/notifications/info-update/pending')
        })
    };

    // eslint-disable-next-line react/prop-types
    const PhotoContent = ({value, color, title}) => (
        value === '-' ?
            <p className={`${color}`}>{title}</p> :
            <p>
                <Link target={'blank'}
                      className={`${color} flex gap-2 items-center`}
                      to={`/storage/docs/qualifications/${value}`}>
                    <FiFile/> {title}
                </Link>
            </p>
    )

    return (
        <div className={'w-full'}>
            <Spin spinning={loading}>
                {
                    !loading &&
                    <Form onFinish={onFinish} layout="vertical" initialValues={formValues} form={form}>
                        <div className={'shadow-lg bg-white'}>
                            <NotificationHeader
                                title={`${informationUpdate?.information} Information Update Request`}
                                status={informationUpdate?.status}
                                actions={
                                    <>
                                        <Popconfirm placement={"bottom"} title={'Confirm Approval'} okText={"Confirm"}
                                                    onConfirm={form.submit}
                                                    okButtonProps={{loading: loading}}
                                                    cancelButtonProps={{loading: loading}}>
                                            <Button onClick={() => setStatus('approved')}
                                                    className={'!bg-white !rounded-none !text-primary-800'}>Approve</Button>
                                        </Popconfirm>
                                        <Popconfirm placement={"bottom"} title={'Confirm Rejection'} okText={"Confirm"}
                                                    onConfirm={form.submit}>
                                            <Button onClick={() => setStatus('rejected')}
                                                    className={'!rounded-none !text-white'}>Reject</Button>
                                        </Popconfirm>
                                    </>
                                }
                            />
                            <div className={'p-3'}>
                                <Form.Item hidden name={'id'}>
                                    <Input/>
                                </Form.Item>
                                <UserInfo
                                    department={informationUpdate?.department}
                                    name={informationUpdate?.requested_by}/>
                            </div>
                            <div className={'p-3 gap-3 max-w-[900px]'}>
                                <Descriptions
                                    title="Changes" bordered size={'small'}
                                    column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1,}}>
                                    {
                                        Object.keys(informationUpdate.old_info).map((item, index) => (
                                            <Descriptions.Item
                                                key={index}
                                                label={capitalize(item.replaceAll('_', ' '))}>
                                                {
                                                    informationUpdate.information === 'Photo' ?
                                                        <>
                                                            <PhotoContent
                                                                value={informationUpdate.old_info[item] ? informationUpdate.old_info[item] : '-'}
                                                                color={'text-error-700'}
                                                                title={informationUpdate.old_info[item] ? 'Old File' : '-'}
                                                            />
                                                            <PhotoContent
                                                                value={informationUpdate.new_info[item] ? informationUpdate.new_info[item] : '-'}
                                                                color={'text-success-700'}
                                                                title={'New File'}
                                                            />
                                                        </> :
                                                        <>
                                                            <p className={'text-error-700'}>
                                                                {informationUpdate.old_info[item] ? informationUpdate.old_info[item] : '-'}
                                                            </p>
                                                            <p className={'text-success-700'}>
                                                                {informationUpdate.new_info[item] ? informationUpdate.new_info[item] : '-'}
                                                            </p>
                                                        </>
                                                }

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
    )
}

InfoUpdateDetail.propTypes = {
    getInformationUpdate: PropTypes.func.isRequired,
    updateInformationRequest: PropTypes.func.isRequired,
    informationUpdate: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    informationUpdate: state.informationUpdateReducer.informationUpdate
})

const mapDispatchToProps = (dispatch) => ({
    getInformationUpdate: (id) => dispatch(handleGetInformationUpdate(id)),
    updateInformationRequest: (data) => dispatch(handleUpdateInformationRequest(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoUpdateDetail)
