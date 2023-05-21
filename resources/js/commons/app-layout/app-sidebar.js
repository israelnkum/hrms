import { Affix, Layout } from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import { FiCalendar, FiHome, FiInfo, FiSettings, FiUser } from "react-icons/fi";
import { IoPeopleOutline } from "react-icons/io5";
import { connect } from "react-redux";
import Logo from '../../assets/img/ttuLogo.png'
import NoTextLogo from '../../assets/img/logo-no-text.png'
import { SidebarMenus } from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";

function AppSidebar(props) {
    const {name, collapsed} = props

    return (
        <Affix offsetTop={ 1 }>
            <Layout.Sider style={{
                overflow: 'auto',
                height: '100vh'
            }} theme={ 'light' } trigger={ null } collapsible collapsed={ collapsed }>
                <div className={ 'flex justify-center items-center' }>
                    {
                        collapsed ?
                            <img width={ 50 } src={ NoTextLogo } alt="TTU HRMS"/> :
                            <img width={ 130 } src={ Logo } alt="TTU HRMS"/>
                    }
                </div>
                <div align={ 'center' }>
                    <SideProfile collapsed={ collapsed } size={ collapsed ? 30 : 50 } name={ name }/>
                </div>
                <MenuHelper icons={ {
                    home: <FiHome/>,
                    pim: <FiUser/>,
                    config: <FiSettings/>,
                    'time-off': <FiCalendar/>,
                    people: <IoPeopleOutline/>,
                    info: <FiInfo/>
                } } menus={ SidebarMenus } direction={ 'inline' }/>
            </Layout.Sider>
        </Affix>
    )
}

AppSidebar.defaultProps = {
    collapsed: false,
    name: 'User'
}

AppSidebar.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    name: state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(AppSidebar)
