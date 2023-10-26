import PropTypes from "prop-types";
import React from 'react'
import {useSelector} from "react-redux";
import {hasPermission} from "../utils";

function ValidateRole({children, roles}) {
    const userPermissions = useSelector(state => state.userReducer.activeRoles)
    return (hasPermission(userPermissions, roles) ? children : <></>)
}

ValidateRole.propTypes = {
    children: PropTypes.any,
    roles: PropTypes.array,
}

export default ValidateRole
