import React from 'react'
import {connect} from 'react-redux'
import Module from "./module";
import {Col, Row} from "antd";
import {Outlet} from "react-router";

function Configs () {
    const modules = [
        {
            title: 'Departments',
            icon: 'Departments',
        },
        {
            title: 'Users',
            icon: 'Users',
        },
        {
            title: 'Termination Reasons',
            icon: 'Users',
        }
    ]
     return (
        // <PageInner title={'Configs'}>
            <Row gutter={[10, 10]}>
                {
                    modules.map((module) => (
                        <Col key={module.title}>
                            <Module data={module}/>
                        </Col>
                    ))
                }
                <Col span={24}>
                    <Outlet/>
                </Col>
            </Row>
        // </PageInner>
    )
}


Configs.defaultProps = {

}

Configs.propTypes = {
}

export default connect()(Configs)
