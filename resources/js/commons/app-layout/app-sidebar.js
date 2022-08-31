import React from 'react'
import {isMobile} from 'react-device-detect'
import {Layout} from 'antd'
import MenuHelper from "../menu-helper";
import {SidebarMenus} from "../../utils";
import {FiHome, FiUser,FiSettings} from "react-icons/fi";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SideProfile from "./side-profile";

function AppSidebar (props) {
    const {name, collapsed, setCollapsed} = props

    return (
        <Layout.Sider theme={'light'} className={'sideBar'} collapsible collapsed={collapsed} onCollapse={setCollapsed}
                      breakpoint="lg" collapsedWidth={isMobile ? 0 : 80}
                      style={isMobile ? { height: '100vh', zIndex: 1, position: 'fixed', left: 0 } : {height: '100vh', position: 'fixed', left: 8, top: 5 }}
        >
            <div align={'center'}>
                <SideProfile name={name}/>
            </div>
            <MenuHelper icons={{
                home: <FiHome/>,
                pim: <FiUser/>,
                config: <FiSettings/>,
            }} menus={SidebarMenus} direction={'inline'}/>
        </Layout.Sider>
    )
}

AppSidebar.defaultProps = {
    collapsed: true,
    setCollapsed: ()=>{},
}
AppSidebar.propTypes = {
    name: PropTypes.string.isRequired,
    collapsed: PropTypes.bool,
    setCollapsed: PropTypes.func,
}
const mapStateToProps = (state) => ({
    name : state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(AppSidebar)
