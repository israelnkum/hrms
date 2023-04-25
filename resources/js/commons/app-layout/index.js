import { Spin } from 'antd'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { handleGetCommonData } from "../../actions/commons/CommonAction";
import { getActiveRoles } from "../../actions/users/UserAction";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {
    MenuFoldOutlined, MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, theme } from 'antd';

const {Header, Sider, Content} = Layout;
const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)

    const {children, getRoles, getCommonData} = props
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {
        getRoles().then(() => {
            setLoading(false)
        }).then(() => {
            setLoading(true)
            getCommonData().then(() => setLoading(false))
        })
    }, [])

    const {
        token: {colorBgContainer},
    } = theme.useToken();
    return (
        /*<Spin spinning={ loading }>
         <div className={ '' }>
         {
         !loading &&
         <div>
         <AppHeader/>
         <div className={'block md:flex gap-x-2'}>
         <AppSidebar/>
         <div className={'mt-1.5 grow p-2 md:pd-0'}>
         { children }
         </div>
         </div>
         </div>
         }
         </div>
         </Spin>*/

        <Layout>
            <AppSidebar collapsed={ collapsed }/>
            <Layout>
                <AppHeader collapseButton={
                    <Button
                        type="text"
                        icon={ collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/> }
                        onClick={ () => setCollapsed(!collapsed) }
                        style={ {
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        } }
                    />
                }/>
                <Content
                    style={ {
                        margin: '5px',
                        minHeight: '100vh'
                    } }
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

AppLayout.propTypes = {
    children: PropTypes.any,
    getCommonData: PropTypes.func,
    getRoles: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6-123a-54c68c0b')),
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(AppLayout)
