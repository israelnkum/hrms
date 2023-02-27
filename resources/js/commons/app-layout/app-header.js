import React, { useState } from 'react'
import { Affix, Button, Col, Dropdown, Layout, Row } from 'antd'
import PoweroffOutlined from '@ant-design/icons/lib/icons/PoweroffOutlined'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/logout/LogoutAction'
import MenuHelper from "../menu-helper";
import { FiHome, FiSettings, FiUser } from "react-icons/fi";
import { SidebarMenus } from "../../utils/side-bar-menu";

export default function AppHeader() {
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

    const menu = (
        <div style={{width: 150}}>
            <MenuHelper icons={{
                home: <FiHome/>,
                pim: <FiUser/>,
                config: <FiSettings/>,
            }} menus={SidebarMenus} direction={'inline'}/>
        </div>
    )

    return (
        <Affix offsetTop={1}>
            <Layout.Header style={{
                backgroundColor: '#fff',
                borderBottom: 'solid #d9d9d9 1px'
            }}>
                <Row justify="space-between" align="middle">
                    <Col span={17} xs={10} sm={18}>
                        TTU HRMS
                    </Col>
                    <Col span={6} xs={10} sm={6}>
                        <div align={'right'} className={'pt-1'}>
                            <Button loading={loading} title={'Logout'}
                                    onClick={() => handleLogout()}
                                    icon={<PoweroffOutlined size={'small'}/>} type={'default'}
                            />
                        </div>
                    </Col>
                </Row>
            </Layout.Header>
        </Affix>
    )
}
