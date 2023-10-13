import PropTypes from "prop-types";
import React from 'react'
import { connect } from "react-redux";
import { hasPermission } from "../utils";

function ValidateComponent({ allPermissions, permissions, children}) {

    return (
        hasPermission(allPermissions, permissions) ? children : <></>
    )
}

ValidateComponent.propTypes = {
    children: PropTypes.any,
    permissions: PropTypes.array.isRequired,
    allPermissions: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    allPermissions: state.userReducer.permissions
})

export default connect(mapStateToProps)(ValidateComponent)