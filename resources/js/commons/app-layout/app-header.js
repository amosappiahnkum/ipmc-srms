import {Affix, Space} from 'antd'
import PropTypes from "prop-types";
import React from 'react'
import NoTextLogo from "../../assets/img/logo.png";
import NavProfile from "./nav-profile";

function AppHeader({collapseButton, mobileMenu}) {
    return (
        <Affix offsetTop={1}>
            <div className={'bg-white h-[60px] px-2 md:px-5 flex items-center justify-between border-bottom'}>
                <img className={'block md:hidden'} width={50} src={NoTextLogo} alt="IPMC"/>
                <div className={'hidden md:block'}>
                    {collapseButton}
                </div>
                <div className={'block md:hidden'}>
                    {mobileMenu}
                </div>
                <Space size={'large'} direction={'horizontal'}>
                    <a className="btn btn-outline-dark btn-sm" href="/enquiry" target="_blank">Make Enquiry</a>
                    <NavProfile/>
                </Space>
            </div>
        </Affix>
    )
}

AppHeader.propTypes = {
    collapseButton: PropTypes.any,
    mobileMenu: PropTypes.node,
}

export default AppHeader
