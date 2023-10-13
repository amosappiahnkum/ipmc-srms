import React from 'react'
import {FiHome, FiInfo, FiSettings, FiUser} from "react-icons/fi";
import {IoPeopleOutline} from "react-icons/io5";
import Logo from '../../assets/img/logo.png'
import {SidebarMenus} from "../../utils/side-bar-menu";
import MenuHelper from "../menu-helper";
import SideProfile from "./side-profile";
import PropTypes from "prop-types";
import {Certificate, Student, UsersFour}  from "@phosphor-icons/react";

function AppMenus(props) {
    const {name, collapsed, showProfile} = props
    return (
        <>
            <div className={'flex justify-center items-center pt-2'}>
                <img width={collapsed ? 70 :100} src={Logo} alt="IPMC"/>
            </div>
            {
                showProfile &&
                <div align={'center'}>
                    <SideProfile collapsed={collapsed} size={collapsed ? 30 : 50} name={name}/>
                </div>
            }

            <MenuHelper icons={{
                home: <FiHome/>,
                pim: <FiUser/>,
                config: <FiSettings/>,
                teachers: <FiUser/>,
                people: <IoPeopleOutline/>,
                program: <Certificate/>,
                students: <Student/>,
                batch: <UsersFour/>,
                enquiries: <FiInfo/>
            }} menus={SidebarMenus} direction={'inline'}/>
        </>
    )
}


AppMenus.defaultProps = {
    collapsed: false,
    name: 'User',
    showProfile: true
}

AppMenus.propTypes = {
    name: PropTypes.string,
    collapsed: PropTypes.bool,
    showProfile: PropTypes.bool,
}

export default AppMenus
