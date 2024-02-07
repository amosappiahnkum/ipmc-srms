import React from 'react';
import {Segmented} from 'antd';
import {AppstoreOutlined} from "@ant-design/icons";
import {FiInfo} from "react-icons/fi";
import { AiOutlineCalculator } from "react-icons/ai";

const items = {
    info: 'Content of Tab Pane 1',
    overview: 'Content of Tab Pane 2',
    calculator: 'Content of Tab Pane 3',
};

const Tools = () => {
    const [current, setCurrent] = React.useState('info');
    return (
        <>
            <Segmented
                defaultValue="center"
                style={{
                    // width: '100%'
                }}
                onChange={(value) => setCurrent(value)}
                options={[
                    {
                        value: 'overview',
                        label: (
                            <div style={{ padding: 4 }}>
                                <AppstoreOutlined/>
                                <div>Overview</div>
                            </div>
                        )
                    },
                    {
                        value: 'info',
                        label: (
                            <div style={{ padding: 4 }}>
                                <FiInfo/>
                                <div>Info</div>
                            </div>
                        )
                    },
                    {
                        value: 'calculator',
                        label: (
                            <div style={{ padding: 4 }}>
                                <AiOutlineCalculator/>
                                <div>Calculator</div>
                            </div>
                        ),
                    },
                ]}
            />
            <div>
                {items[current]}
            </div>
        </>
    );
};
export default Tools;
