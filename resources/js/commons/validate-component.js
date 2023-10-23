import PropTypes from "prop-types";
import React from 'react'
import {useSelector} from "react-redux";
import {hasPermission} from "../utils";

function ValidateComponent({children, permissions}) {
    const userPermissions = useSelector(state => state.userReducer.permissions)
    return (hasPermission(userPermissions, permissions) ? children : <></>)
}

ValidateComponent.propTypes = {
    children: PropTypes.any,
    permissions: PropTypes.array,
}

export default ValidateComponent
