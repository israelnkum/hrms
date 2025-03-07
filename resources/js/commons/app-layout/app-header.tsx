import {Affix, Badge, Dropdown, Space, Spin} from 'antd'
import PropTypes from "prop-types";
import React, {useState} from 'react'
import {IoNotificationsOutline} from "react-icons/io5";
import {FiChevronDown, FiInfo, FiLogOut} from "react-icons/fi";
import {connect, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {logout} from '../../actions/logout/LogoutAction'
import TlaImage from "../tla-image";
import {formatUrl} from "../../utils";
import NoTextLogo from "../../assets/img/logo-no-text.png";

function AppHeader({user, collapseButton, notificationNavs, mobileMenu}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        setLoading(true)
        dispatch(logout()).then(() => {
            window.location.reload()
            window.location.replace('/login')
            setLoading(false)
        })
    }
    const items = [
        {
            key: '2',
            label: (
                <Link to={`/employees/${user?.employee_id}/${formatUrl(user?.name)}`}>My Info</Link>
            ),
            icon: <FiInfo/>
        },
        {
            key: '4',
            label: <p title={'Logout'} onClick={() => handleLogout()}>Logout</p>,
            icon: <FiLogOut/>
        },
    ];

    return (
        <Affix offsetTop={1}>
            <div className={'bg-white h-[60px] px-2 md:px-5 flex items-center justify-between border-bottom'}>
                <img className={'block md:hidden'} width={ 50 } src={ NoTextLogo } alt="TTU HRMS"/>
                <div className={'block md:hidden'}>
                    {mobileMenu}
                </div>
                <Space size={'large'}>
                    <Link to={'/notifications/leave-request'}>
                        <Badge status="processing" count={notificationNavs?.total} overflowCount={90}>
                            <IoNotificationsOutline className={'text-2xl'}/>
                        </Badge>
                    </Link>

                    <Spin spinning={loading}>
                        <Dropdown
                            menu={{items}}>
                            <a onClick={(e) => e.preventDefault()}>
                                <Space>
                                    Hi {user?.name?.split(' ')[0]}
                                    <TlaImage name={user.name} size={40} src={''}/>
                                    <FiChevronDown/>
                                </Space>
                            </a>
                        </Dropdown>
                    </Spin>
                </Space>
            </div>
        </Affix>
    )
}

AppHeader.propTypes = {
    user: PropTypes.object.isRequired,
    collapseButton: PropTypes.any,
    notificationNavs: PropTypes.any,
    mobileMenu: PropTypes.node,
}

const mapStateToProps = (state) => ({
    user: state.user.loggedInUser,
    notificationNavs: state.notifications.notificationNavs
})

export default connect(mapStateToProps)(AppHeader)
