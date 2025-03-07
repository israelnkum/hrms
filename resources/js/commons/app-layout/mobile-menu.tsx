import React, {useEffect, useState} from 'react';
import {Button, Drawer} from 'antd';
import AppMenus from "./app-menus";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {useLocation} from "react-router-dom";

const MobileMenu = (props) => {
    const {collapsed = false} = props
    const [open, setOpen] = useState(false);
    const {loggedInUser } = useSelector(state => state.user)
    const location = useLocation();
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        onClose()
    }, [location])
    return (
        <>
            <Button type="default" onClick={showDrawer}>
                MENU
            </Button>
            <Drawer title="" placement="right" onClose={onClose} open={open}>
                <AppMenus showProfile={false} collapsed={collapsed} name={loggedInUser?.name ?? ""}/>
            </Drawer>
        </>
    );
};

MobileMenu.propTypes = {
    collapsed: PropTypes.bool,
}

export default MobileMenu
