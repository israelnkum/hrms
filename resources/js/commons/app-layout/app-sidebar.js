import React from 'react'
import {isMobile} from 'react-device-detect'
import {Affix, Layout} from 'antd'
import MenuHelper from "../menu-helper";
import {SidebarMenus} from "../../utils";
import {FiHome, FiUser,FiSettings} from "react-icons/fi";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import SideProfile from "./side-profile";

function AppSidebar (props) {
    const {name, collapsed, setCollapsed} = props

    return (
        <Affix offsetTop={2} className={'hidden md:block'}>
            <div>
                <Layout.Sider theme={'light'}
                              collapsible
                              style={{ background: '#fff', height: '98vh', borderRadius: '10px' }}>
                    <div align={'center'}>
                        <SideProfile size={50} name={name}/>
                    </div>
                    <MenuHelper icons={{
                        home: <FiHome/>,
                        pim: <FiUser/>,
                        config: <FiSettings/>,
                    }} menus={SidebarMenus} direction={'inline'}/>
                </Layout.Sider>
            </div>
        </Affix>
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
