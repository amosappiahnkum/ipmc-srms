import {Affix, Layout} from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import {connect} from "react-redux";
import AppMenus from "./app-menus";

function AppSidebar(props) {
    const {name, collapsed} = props

    return (
        <Affix offsetTop={1}>
            <Layout.Sider
                style={{overflow: 'auto', height: '100vh'}}
                theme={'light'}
                trigger={null}
                collapsible collapsed={collapsed}>
                <AppMenus collapsed={collapsed} name={name}/>
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
