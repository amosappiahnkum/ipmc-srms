import React from 'react'
import {connect} from 'react-redux'
import {Card, Space, Typography} from "antd";
import PropTypes from "prop-types";
import {Link, useLocation} from "react-router-dom";
import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
      .active-module {
        background: var(--Primary-50);
      }
    `

function Module ({data}) {
    const url = data.title.toLowerCase().replace(' ','-')
    const location = useLocation()
    const match = location.pathname === `/app/configs/${url}`
     return (
        <Link style={{ textDecoration: 'none'}} to={`/app/configs/${url}`}>
            <GlobalStyles/>
            <Card className={match ? 'active-module' : ''} hoverable size={'small'}>
                <Space direction={'vertical'} style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Typography.Text >
                       {data.title}
                    </Typography.Text>
                </Space>
            </Card>
        </Link>
    )
}


Module.defaultProps = {
    data: {
        title: 'Title',
        icon: <>Icon</>
    }
}

Module.propTypes = {
    data: PropTypes.object
}

export default connect()(Module)
