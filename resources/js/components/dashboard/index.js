import React from 'react'
import {Card, Col, Row, Statistic} from "antd";
import * as PropTypes from "prop-types";
import CountUp from 'react-countup';
import {useSelector} from "react-redux";
import {Certificate, Student, UsersFour} from "@phosphor-icons/react";
import {FiUser} from "react-icons/fi";
import EnrollmentChart from "./enrollment-chart";

CountUp.propTypes = {separator: PropTypes.string};


const formatter = (value) => <CountUp end={value} separator=","/>;
// eslint-disable-next-line react/prop-types
const Item = ({icon, title, value}) => (
    <Card>
        <div className={'flex items-center justify-between'}>
            {icon}
            <Statistic title={title} value={value} precision={2}
                       formatter={formatter}/>
        </div>
    </Card>
)

function Dashboard() {
    const commons = useSelector((state) => state.commonReducer.commons)
    const roles = useSelector((state) => state.userReducer.activeRoles)
    return (
        <div className={'pb-10'}>
            <Row gutter={[10, 10]} className={'mb-3'}>
                <Col span={6} xs={12} md={6}>
                    <Item icon={<Certificate size={50}/>} value={commons?.programs} title={'Programs'}/>
                </Col>
                {
                    (
                        roles.includes('administrator') ||
                        roles.includes('super-admin') ||
                        roles.includes('counselor')
                    ) &&
                    <React.Fragment>
                        <Col span={6} xs={12} md={6}>
                            <Item icon={<Student size={50}/>} value={commons?.students?.total} title={'Students'}/>
                        </Col>
                        <Col span={6} xs={12} md={6}>
                            <Item icon={<FiUser size={50}/>} value={commons?.instructors} title={'Instructors'}/>
                        </Col>
                        <Col span={6} xs={12} md={6}>
                            <Item icon={<UsersFour size={50}/>} value={commons?.batches} title={'Batches'}/>
                        </Col>
                    </React.Fragment>
                }
                {
                    (roles.includes('instructor')) &&
                    <Col span={6} xs={12} md={6}>
                        <Item icon={<UsersFour size={50}/>} value={commons?.my_batches} title={'My Batches'}/>
                    </Col>
                }
            </Row>
            <EnrollmentChart roles={roles}/>
        </div>
    )
}

export default Dashboard
