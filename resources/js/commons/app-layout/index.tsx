import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import AppHeader from './app-header';
import AppSidebar from './app-sidebar';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import MobileMenu from './mobile-menu';
import { Outlet } from 'react-router';
import { useAppDispatch } from '../../hooks';
import { fetchActiveRoles } from '../../services/user.service';
import { unwrapResult } from '@reduxjs/toolkit';

const AppLayout: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const dispatch = useAppDispatch();
    const [collapsed, setCollapsed] = useState<boolean>(false);

    useEffect(() => {
        dispatch(fetchActiveRoles(1))
            .then(unwrapResult)
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, [dispatch]);

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sidebar */}
            <div className="hidden md:block w-64 fixed">
                <AppSidebar collapsed={collapsed} />
            </div>

            {/* Main Content */}
            <div className="flex-grow overflow-x-hidden ml-0 md:ml-64">
                {/* Header */}
                <AppHeader
                    mobileMenu={<MobileMenu collapsed={collapsed} />}
                    collapseButton={
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    }
                />

                {/* Main Outlet/Content */}
                <div className="p-4">
                    <Outlet />
                </div>
            </div>

            {/* Mobile Sidebar - Only visible on mobile */}
            <div className="md:hidden">
                <MobileMenu collapsed={collapsed} />
            </div>
        </div>
    );
};

export default AppLayout;
