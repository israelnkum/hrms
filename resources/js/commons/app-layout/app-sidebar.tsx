import PropTypes from "prop-types";
import React from 'react'
import {useSelector} from "react-redux";
import AppMenus from "./app-menus";

function AppSidebar(props) {
    const {loggedInUser } = useSelector((state) => state.user)
    const {collapsed = false} = props

    return (
        <div className={'shadow-lg h-screen'}>
            <AppMenus collapsed={collapsed} name={loggedInUser?.name}/>
        </div>
    )
}

AppSidebar.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
}

export default AppSidebar
