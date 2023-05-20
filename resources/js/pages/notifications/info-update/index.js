import {List, Spin} from "antd";
import PropTypes from "prop-types";
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {useLocation} from "react-router";
import {TlaError} from "../../../utils/messages";
import {Link} from "react-router-dom";
import TlaImage from "../../../commons/tla-image";
import {handleGetAllInformationUpdate} from "../../../actions/information-updates/Actions";
import NotificationHeader from "../notification-header";
import {capitalize} from "../../../utils";

function InfoUpdate({getInformationUpdates, informationUpdates}) {
    const [loading, setLoading] = useState(true)
    const {pathname} = useLocation()
    const status = pathname.split('/').pop()
    useEffect(() => {
        getInformationUpdates(new URLSearchParams(`status=${status}`))
            .then(() => setLoading(false))
            .catch((err) => {
                TlaError(err.response.data.message)
                setLoading(false)
            })
    }, [pathname])

    return (
        <div>
            <NotificationHeader title={`${capitalize(status)} Information Update`}/>
            <Spin spinning={loading}>
                <div className={'p-3'}>
                    <List
                        itemLayout="horizontal"
                        dataSource={informationUpdates?.data || []}
                        renderItem={(item) => (
                            <Link className={'!no-underline'} to={`/notifications/info-update/${item.id}/details`}
                                  state={{id: item.id}}>
                                <List.Item>
                                    <List.Item.Meta
                                        avatar={<TlaImage size={45} name={item.requested_by} preview={false} src={''}/>}
                                        title={`${item.requested_by} requested ${item.information} data update`}
                                        description={item.date_requested}
                                    />
                                    <p className={'text-xs text-gray-500'}>{item?.created_at}</p>
                                </List.Item>
                            </Link>
                        )}
                    />
                </div>
            </Spin>
        </div>
    )
}

InfoUpdate.propTypes = {
    getInformationUpdates: PropTypes.func,
    informationUpdates: PropTypes.object,
}

const mapStateToProps = (state) => ({
    informationUpdates: state.informationUpdateReducer.informationUpdates,
    permissions: state.userReducer.permissions
})

const mapDispatchToProps = (dispatch) => ({
    getInformationUpdates: (payload) => dispatch(handleGetAllInformationUpdate(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(InfoUpdate)
