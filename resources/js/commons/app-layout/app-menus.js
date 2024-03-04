import React from 'react'
import {FiCalendar, FiHome, FiInfo, FiSettings, FiUser} from "react-icons/fi";
import {IoPeopleOutline} from "react-icons/io5";
import Logo from '../../assets/img/ttuLogo.png'
import NoTextLogo from '../../assets/img/logo-no-text.png'
import {SidebarMenus} from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";
import PropTypes from "prop-types";

function AppMenus(props) {
    const {name, collapsed, showProfile} = props
    return (
        <>
            <div className={'flex justify-center items-center'}>
                {
                    collapsed ?
                        <img width={50} src={NoTextLogo} alt="TTU HRMS"/> :
                        <img width={130} src={Logo} alt="TTU HRMS"/>
                }
            </div>
            {
                showProfile &&
                <div align={'center'}>
                    <SideProfile collapsed={collapsed} size={collapsed ? 30 : 50} name={name}/>
                </div>
            }

            <MenuHelper icons={{
                home: <FiHome/>,
                pim: <FiUser/>,
                config: <FiSettings/>,
                'time-off': <FiCalendar/>,
                people: <IoPeopleOutline/>,
                info: <FiInfo/>
            }} menus={SidebarMenus} direction={'inline'}/>
        </>
    )
}


AppMenus.defaultProps = {
    collapsed: false,
    name: 'User',
    showProfile: true
}

AppMenus.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
    showProfile: PropTypes.bool,
}

export default AppMenus
