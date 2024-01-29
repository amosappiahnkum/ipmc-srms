import {Dropdown, Space, Spin} from 'antd'
import React, {useState} from 'react'
import {FiChevronDown, FiInfo, FiLogOut} from "react-icons/fi";
import {useDispatch, useSelector} from 'react-redux'
import {Link} from "react-router-dom";
import {logout} from '../../actions/logout/LogoutAction'
import TlaImage from "../tla-image";

function NavProfile() {
    const user = useSelector(state => state.userReducer.loggedInUser)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const handleLogout = () => {
        setLoading(true)
        dispatch(logout()).then(() => {
            window.location.reload()
            window.location.replace('/login')
            setLoading(false)
        })
    }
    const items = [
        {
            key: '2',
            label: (
                <Link to={`/employees/1`}>My Info</Link>
            ),
            icon: <FiInfo/>
        },
        {
            key: '4',
            label: <p title={'Logout'} onClick={() => handleLogout()}>Logout</p>,
            icon: <FiLogOut/>
        },
    ];

    return (
        <Spin spinning={loading}>
            <Dropdown
                menu={{items}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space>
                        <span className={'hidden md:block'}>Hi {user?.name?.split(' ')[0] ?? user.username}</span>
                        <TlaImage name={user.name ?? user.username} size={40} src={''}/>
                        <FiChevronDown/>
                    </Space>
                </a>
            </Dropdown>
        </Spin>
    )
}

export default NavProfile
