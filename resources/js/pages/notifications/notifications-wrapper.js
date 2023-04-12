import React from 'react'
import { connect } from 'react-redux'
import { Outlet } from "react-router";
import MenuHelper from "../../commons/menu-helper";
import NotificationHeader from "./notification-header";

function NotificationsWrapper() {

    return (
        <div className={ 'flex' }>
            <div className={ 'min-h-screen w-[250px] bg-white' }>
                <div className={'p-3 bg-primary-800 text-white'}>
                    <h3 className={ 'text-lg text-white' }>Notification Group</h3>
                </div>
                <div className={'p-3'}>
                    <MenuHelper direction={ 'inline' } menus={ [{
                        title: 'Leave Request',
                        link: '/notifications/leave-request',
                        children: [],
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
                </div>
            </div>
            <div className={ 'grow bg-white border-l' }>
                <NotificationHeader/>
                <div className={'p-3'}>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}


NotificationsWrapper.defaultProps = {}

NotificationsWrapper.propTypes = {}

export default connect()(NotificationsWrapper)
