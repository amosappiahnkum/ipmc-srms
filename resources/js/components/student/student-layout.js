import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {handleGetCommonData} from "../../actions/commons/CommonAction";
import {getActiveRoles} from "../../actions/users/UserAction";
import {Outlet} from "react-router";
import NavProfile from "../../commons/app-layout/nav-profile";
import NoTextLogo from "../../assets/img/logo.png";
import PageCrumbs from "../admin/page-crumbs";

const StudentLayout = (props) => {
    const [loading, setLoading] = useState(true)

    const {getRoles, getCommonData} = props

    useEffect(() => {
        getRoles().then(() => {
            setLoading(false)
        }).then(() => {
            setLoading(true)
            getCommonData().then(() => setLoading(false))
        })
    }, [])
    return (
        <div>
            <div className={'flex items-center justify-between px-5 py-3 bg-white shadow-sm'}>
                <img width={70} src={NoTextLogo} alt="IPMC"/>
                <NavProfile/>
            </div>
            <div className={'px-5 mt-2 h-screen'}>
                <div className={'mb-2'}>
                    <PageCrumbs/>
                </div>
                <Outlet/>
            </div>
        </div>
    )
}

StudentLayout.propTypes = {
    getCommonData: PropTypes.func,
    getRoles: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getRoles: () => dispatch(getActiveRoles('21993de6')),
    getCommonData: () => dispatch(handleGetCommonData()),
})

export default connect(null, mapDispatchToProps)(StudentLayout)
