import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux";
import {handleGetEnrollmentChart} from "../../actions/commons/CommonAction";
import Chart from 'react-apexcharts'
import {Card, Col, Row} from "antd";
import EnrollmentByMonth from "./registration-by-month";

function RegistrationChart({getEnrollmentChart, roles}) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEnrollmentChart().then(() => {
            setLoading(false)
        })
    }, [])

    const registrations = useSelector(state => state.commonReducer.enrollmentChart?.registrations)
    const data = {
        series: [{
            name: 'Registration',
            data: Object.values(registrations ?? {})
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar'
            },
            // colors: colors,
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: true
            },
            legend: {
                show: true
            },
            xaxis: {
                categories: Object.keys(registrations ?? {}),
                labels: {
                    show: false,
                    style: {
                        // colors: colors,
                        fontSize: '12px'
                    }
                }
            }
        }
    }

    return (
        loading === false &&
        <Row gutter={[10, 10]}>
            {
                (
                    roles.includes('administrator') ||
                    roles.includes('super-admin') ||
                    roles.includes('counselor')
                ) &&
                <>
                    <Col span={12} xs={24} md={12}>
                        <Card title={'Registration by Program'} loading={loading}>
                            <Chart options={data?.options} series={data?.series} type="bar" height={350}/>
                        </Card>
                    </Col>
                    <Col span={12} xs={24} md={12}>
                        <EnrollmentByMonth/>
                    </Col>
                </>
            }
        </Row>
    )
}

RegistrationChart.propTypes = {
    getEnrollmentChart: PropTypes.func,
    roles: PropTypes.array,
}

const mapDispatchToProps = (dispatch) => ({
    getEnrollmentChart: () => dispatch(handleGetEnrollmentChart())
})

export default connect(null, mapDispatchToProps)(RegistrationChart)
