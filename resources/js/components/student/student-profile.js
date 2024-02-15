import React from "react";
import TlaImage from "../../commons/tla-image";
import {useSelector} from "react-redux";
import TlaAddNew from "../../commons/tla-add-new";
import {FiLock, FiUser} from "react-icons/fi";
import {Link} from "react-router-dom";

const StudentProfile = () => {
    const user = useSelector(state => state.userReducer.loggedInUser)
    return (
        <div className={'bg-white rounded-lg p-5 hidden md:block'}>
            <div className={'text-center mx-auto w-fit'}>
                <TlaImage name={user.name ?? user.username} size={70} src={''}/>
                <p className={'mt-2 text-2xl'}>{user?.name}</p>
                <p className={'bg-red-700 w-fit text-white mx-auto rounded-lg px-2 py-1 text-xs'}>{user?.branch}</p>
            </div>
            <div className={'flex flex-col gap-3 items-start mt-5'}>
                <TlaAddNew link={''}>
                    <p className={'flex items-center gap-x-2 py-2 hover:bg-gray-100 px-3 rounded'}> <FiUser/> My Profile</p>
                </TlaAddNew>
                <Link to={'change-password'}>
                    <p className={'flex items-center gap-x-2 py-2 hover:bg-gray-100 px-3 rounded'}><FiLock/> Change Password</p>
                </Link>
            </div>
        </div>
    )
}

export default StudentProfile
