import React from 'react'
import PropTypes from 'prop-types'
import {Col, Row} from 'antd'
import TlaPageHeader from "./tla-page-header";

export default function PageWrapper (props) {
    const { children, extra, title, onBack } = props
    return (
        <Row style={{ marginBottom: 5 }} justify="space-between" align="middle">
            <Col span={24}>
                <TlaPageHeader onBack={onBack} title={title} ext={extra}/>
            </Col>
            <Col span={24}>
                {children}
            </Col>
        </Row>
    )
}
PageWrapper.defaultProps = {
    extra: [],
    title: 'Page Title',
    onBack: null
}

PageWrapper.propTypes = {
    children: PropTypes.any,
    onBack: PropTypes.string,
    extra: PropTypes.array,
    title: PropTypes.string
}
