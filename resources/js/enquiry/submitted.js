import React from 'react'
import {FiCheckCircle} from "react-icons/fi";
import {Button, Divider} from "antd";
import Logo from '../assets/img/logo.png'
import {useLocation} from "react-router-dom";

function Submitted() {
    const { state } = useLocation()
    return (
        <div className={'flex justify-center items-center h-screen bg-gray-100'}>
            <div className={'w-11/12 md:w-2/5 text-center shadow-lg p-10 flex flex-col items-center justify-center rounded-lg bg-white gap-5'}>
                <div className={'flex items-center justify-between gap-2 w-full'}>
                    <img height={'auto'} width={70} src={Logo} alt="IPMC"/>
                </div>
                <Divider className={'!m-1'}/>
                <FiCheckCircle size={50} className={'text-error-600'}/>
                <p className={'text-xl md:text-3xl font-bold text-error-600'}>Thank you {state?.firstName}</p>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <p className={''}>We have received your enquiry and we'll get back to you as soon as possible</p>
                <Divider className={'!m-1'}/>
               <Button onClick={() => {
                   window.open("about:blank", "_self");
                   window.close()
               }} danger>Close</Button>
            </div>
        </div>
    )
}

export default Submitted
