import {Button, Dropdown, Spin, theme} from 'antd'
import PropTypes from 'prop-types'
import React from 'react'
import {FiMoreVertical} from "react-icons/fi";
import {LoadingOutlined} from "@ant-design/icons";

const {useToken} = theme;

function TblDropdown({ loading, children }) {
    const {token} = useToken();
    const items = [];

    const contentStyle = {
        backgroundColor: token.colorBgElevated,
        borderRadius: token.borderRadiusLG,
        boxShadow: token.boxShadowSecondary,
        // width: 100
    };

    return (
        <Spin spinning={loading} indicator={<LoadingOutlined />}>
            <Dropdown
                menu={{items}}
                dropdownRender={(menu) => (
                    <div style={contentStyle}>
                        {React.cloneElement(menu, {style: {boxShadow: 'none', width: '100%'},})}
                        <div className={'px-1 pb-2 flex flex-col gap-2'}>
                            {children}
                        </div>
                    </div>
                )}>
                <Button size={'small'}><FiMoreVertical/></Button>
            </Dropdown>
        </Spin>
    )
}

TblDropdown.propTypes = {
    children: PropTypes.node,
    loading: PropTypes.bool,
}

export default TblDropdown
