import React from 'react'
import PropTypes from 'prop-types'
import { PageHeader } from 'antd'
import {useNavigate} from "react-router-dom";
export default function TlaPageHeader (props) {
    const { title, ext, onBack } = props
    const navigate = useNavigate()
    return (
        <>
            <PageHeader
                className="site-page-header"
                onBack={() => navigate(onBack ? onBack : -1)}
                title={title}
                style={{ fontSize: 20 }}
                extra={ext}/>
        </>
    )
}

TlaPageHeader.defaultProps = {
    title: 'Title',
    ext: null,
    onBack: null
}
TlaPageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    ext: PropTypes.node,
    onBack: PropTypes.string
}
