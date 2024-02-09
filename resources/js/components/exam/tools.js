import React from 'react';
import {Segmented} from 'antd';
import {AppstoreOutlined} from "@ant-design/icons";
import {FiInfo} from "react-icons/fi";
import {AiOutlineCalculator} from "react-icons/ai";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import Calculator from "../calculator";
import Overview from "./overview";

const Tools = ({handleSwitch}) => {
    const [current, setCurrent] = React.useState('overview');
    const studentName = useSelector(state => state.userReducer.loggedInUser.name)

    const items = {
        info: <div>
            <div className={'mb-3'}>
                <small className={'text-xs !font-medium'}>STUDENT</small>
                <p>{studentName}</p>
            </div>
            <div className={'mb-3'}>
                <small className={'text-xs !font-medium'}>CLASS</small>
                <p>program</p>
            </div>
            <div>
                <small className={'text-xs !font-medium'}>MODULE</small>
                <p>subject</p>
            </div>
        </div>,
        overview: <Overview handleSwitch={handleSwitch}/>,
        calculator: <div className={'mt-2'}><Calculator/></div>,
    };

    return (
        <>
            <Segmented
                defaultValue="overview"
                style={{ width: '100%' }}
                onChange={(value) => setCurrent(value)}
                options={[
                    {
                        value: 'overview',
                        label: (
                            <div className={'segment-label'}>
                                <AppstoreOutlined/>
                                <div>Overview</div>
                            </div>
                        )
                    },
                    {
                        value: 'info',
                        label: (
                            <div className={'segment-label'}>
                                <FiInfo/>
                                <div>Info</div>
                            </div>
                        )
                    },
                    {
                        value: 'calculator',
                        label: (
                            <div className={'segment-label'}>
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

Tools.propTypes = {
    handleSwitch: PropTypes.func.isRequired
}

export default Tools;
