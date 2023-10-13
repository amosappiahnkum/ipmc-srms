import React, {useState, useEffect} from 'react';
import {Button, Drawer} from 'antd';
import AppMenus from "./app-menus";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {useLocation} from "react-router-dom";

const MobileMenu = (props) => {
    const {name, collapsed} = props
    const [open, setOpen] = useState(false);
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
                <AppMenus showProfile={false} collapsed={collapsed} name={name}/>
            </Drawer>
        </>
    );
};


MobileMenu.defaultProps = {
    collapsed: false,
    name: 'User'
}

MobileMenu.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    name: state.userReducer.loggedInUser.name,
})

export default connect(mapStateToProps)(MobileMenu)
