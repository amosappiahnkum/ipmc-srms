import {Button, Layout} from 'antd'
import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetCommonData} from "../../actions/commons/CommonAction";
import {getActiveRoles} from "../../actions/users/UserAction";
import AppHeader from "./app-header";
import AppSidebar from "./app-sidebar";
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import MobileMenu from "./mobile-menu";

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
    return (
        <Layout>
            <div className={'hidden md:block'}>
                <AppSidebar collapsed={collapsed}/>
            </div>
            <Layout>
                <AppHeader
                    mobileMenu={<MobileMenu collapsed={collapsed}/>}
                    collapseButton={
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                    }/>
                <Layout.Content
                    style={{margin: '5px', minHeight: '100vh'}}>
                    {children}
                </Layout.Content>
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
    getRoles: () => dispatch(getActiveRoles('21993de6')),
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(AppLayout)
