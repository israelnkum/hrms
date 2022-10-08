import React, {useEffect, useState} from 'react'
import {Layout, Spin} from 'antd'
import {isMobile} from 'react-device-detect'
import PropTypes from 'prop-types'
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {connect} from "react-redux";
import {getActiveRoles} from "../../actions/users/UserAction";
import {handleGetCommonData} from "../../actions/commons/CommonAction";

const AppLayout = (props) => {
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(true)

    const toggle = () => {
        setOpen(!open)
    }
    const { children, getRoles, getCommonData } = props
    useEffect(() => {
        getRoles().then(() => {
            setLoading(false)
        }).then(() => {
            setLoading(true)
            getCommonData().then(() => setLoading(false))
        })
    }, [])
    return (
        <Spin spinning={loading}>
            {
                !loading &&
                <Layout>
                    <AppSidebar setCollapsed={toggle} collapsed={open}/>
                    <Layout style={{ marginLeft: isMobile ? 0 : (open ? 80 : 200) }}>
                        <Layout.Content style={{ margin: '0 15px 50px' }}>
                            <AppHeader/>
                            {/*<PageCrumbs/>*/}
                            <div style={{ minHeight: '100vh', marginTop: 10 }}>
                                {children}
                            </div>
                        </Layout.Content>
                    </Layout>
                </Layout>
            }
        </Spin>
    )
}

AppLayout.propTypes = {
    children: PropTypes.any,
    getCommonData: PropTypes.func,
    getRoles: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6-123a-54c68c0b-1044-41a9-b084-32bfafe6bc84-4ae1-8f09-67e9640df8d6')),
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(AppLayout)
