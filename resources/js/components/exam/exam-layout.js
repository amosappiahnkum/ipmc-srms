import React from 'react'
import {Outlet} from 'react-router'
import NavProfile from "../../commons/app-layout/nav-profile";
import Logo from "../../assets/img/logo.png";
import {Link} from "react-router-dom";

function ExamLayout() {
    return (
        <div className={'bg-white rounded-lg h-screen overflow-hidden max-w-screen-2xl mx-auto'}>
            <div className={'flex items-center justify-between bg-white px-5 h-14'}>
                <Link to={'/'}>
                    <img width={70} src={Logo} alt="IPMC"/>
                </Link>
                <NavProfile/>
            </div>
            <div className={'flex h-full items-center'}>
                <Outlet/>
            </div>
        </div>
    )
}

export default ExamLayout
