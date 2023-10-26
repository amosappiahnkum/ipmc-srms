import {Affix, Dropdown, Space, Spin} from 'antd'
import PropTypes from "prop-types";
import React, {useState} from 'react'
import {FiChevronDown, FiInfo, FiLogOut} from "react-icons/fi";
import {connect, useDispatch} from 'react-redux'
import {Link} from "react-router-dom";
import {logout} from '../../actions/logout/LogoutAction'
import TlaImage from "../tla-image";
import NoTextLogo from "../../assets/img/logo.png";

function AppHeader({user, collapseButton, mobileMenu}) {
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
                </Space>
            </div>
        </Affix>
    )
}

AppHeader.propTypes = {
    user: PropTypes.object.isRequired,
    collapseButton: PropTypes.any,
    mobileMenu: PropTypes.node,
}

const mapStateToProps = (state) => ({
    user: state.userReducer.loggedInUser
})

export default connect(mapStateToProps)(AppHeader)
