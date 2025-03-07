import React from 'react'
import MenuHelper from "../../../../commons/menu-helper";
import {Outlet} from "react-router";

function JobDetailWrapper() {
    return (
        <div>
            <MenuHelper direction={'horizontal'}
                        menus={[
                            {
                                title: 'Job Details',
                                link: '',
                                children: [],
                                permissions: [],
                                icon: 'home'
                            },
                            {
                                title: 'Previous Ranks',
                                link: 'previous-ranks',
                                children: [],
                                permissions: [],
                                icon: 'home'
                            },
                            {
                                title: 'Previous Positions',
                                link: 'previous-positions',
                                children: [],
                                permissions: [],
                                icon: 'home'
                            },
                        ]}/>
            <div className={'mt-2'}>
                <Outlet/>
            </div>
        </div>
    )
}

export default JobDetailWrapper
