import { Affix, Layout } from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import { FiCalendar, FiHome, FiSettings, FiUser, FiInfo } from "react-icons/fi";
import { connect } from "react-redux";
import { SidebarMenus } from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";

function AppSidebar(props) {
    const {name} = props

    return (
        <Affix offsetTop={ 65 }>
            <div className={'hidden md:block'}>
                <Layout.Sider
                    theme={ 'light' }
                    style={ {background: '#fff', height: '100vh'} }>
                    <div align={ 'center' }>
                        <SideProfile size={ 50 } name={ name }/>
                    </div>
                    <MenuHelper icons={ {
                        home: <FiHome/>,
                        pim: <FiUser/>,
                        config: <FiSettings/>,
                        'time-off': <FiCalendar/>,
                        info: <FiInfo/>
                    } } menus={ SidebarMenus } direction={ 'inline' }/>
                </Layout.Sider>
            </div>
        </Affix>
    )
}

AppSidebar.propTypes = {
    name: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    name: state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(AppSidebar)
