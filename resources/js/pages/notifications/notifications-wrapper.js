import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Outlet } from "react-router";
import { handleGetNotificationNavs } from "../../actions/notifications/Action";
import MenuHelper from "../../commons/menu-helper";
import NotificationHeader from "./notification-header";

function NotificationsWrapper({notificationNavs, getNotificationNavs}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getNotificationNavs().then(() => setLoading(false))
    }, [])

    return (
        <div className={ 'flex' }>
            <div className={ 'min-h-screen w-[250px] bg-white' }>
                <div className={ 'p-3 bg-primary-800 text-white' }>
                    <h3 className={ 'text-lg text-white' }>Notification Group</h3>
                </div>
                <div className={ 'p-3' }>
                    {
                        !loading &&
                        <MenuHelper direction={ 'inline' }
                                    menus={ [{
                                        title: 'Leave Request',
                                        link: '/notifications/leave-request',
                                        children: [
                                            {
                                                title: `Pending (${ notificationNavs.leave_request.pending ?? 0 })`,
                                                link: '/notifications/leave-request/pending',
                                                icon: 'home',
                                                modal: false,
                                                permission: ''
                                            },
                                            {
                                                title: `Approved (${ notificationNavs.leave_request.approved ?? 0 })`,
                                                link: '/notifications/leave-request/approved',
                                                icon: 'home',
                                                modal: false,
                                                permission: ''
                                            },
                                            {
                                                title: `Rejected (${ notificationNavs.leave_request.rejected ?? 0 })`,
                                                link: '/notifications/leave-request/rejected',
                                                icon: 'home',
                                                modal: false,
                                                permission: ''
                                            }
                                        ],
                                        permissions: [],
                                        icon: 'home'
                                    }
                                        // , {
                                        //     title: 'Information Update',
                                        //     link: '#',
                                        //     children: [],
                                        //     permissions: [],
                                        //     icon: 'home'
                                        // }
                                    ] }/>
                    }
                </div>
            </div>
            <div className={ 'grow bg-white border-l' }>
                <NotificationHeader/>
                <div className={ 'p-3' }>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}


NotificationsWrapper.defaultProps = {}

NotificationsWrapper.propTypes = {
    getNotificationNavs: PropTypes.func.isRequired,
    notificationNavs: PropTypes.any
}

const mapStateToProps = (state) => ({
    notificationNavs: state.notificationsReducer.notificationNavs
})
const mapDispatchToProps = (dispatch) => ({
    getNotificationNavs: () => dispatch(handleGetNotificationNavs())
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationsWrapper)
