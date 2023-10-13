import PropTypes from 'prop-types'
import React, {useEffect, useState} from 'react'
import {connect, useSelector} from "react-redux";
import {handleGetEnrollmentChart} from "../../actions/commons/CommonAction";
import Chart from 'react-apexcharts'
import {Card, Col, Row} from "antd";
import EnrollmentByMonth from "./enrollment-by-month";

function EnrollmentChart({getEnrollmentChart}) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getEnrollmentChart().then(() => {
            setLoading(false)
        })
    }, [])

    const enrollment = useSelector(state => state.commonReducer.enrollmentChart?.enrollment)
    const data = {
        series: [{
            name: 'Enrollment',
            data: Object.values(enrollment ?? {})
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar'
            },
            // colors: colors,
            plotOptions: {
                bar: {
                    columnWidth: '45%',
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
                categories: Object.keys(enrollment ?? {}),
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
            <Col span={12} xs={24} md={12}>
                <Card title={'Enrollment by Program'} loading={loading}>
                    <Chart options={data?.options} series={data?.series} type="bar" height={350}/>
                </Card>
            </Col>
            <Col span={12} xs={24} md={12}>
                <EnrollmentByMonth/>
            </Col>
        </Row>
    )
}

EnrollmentChart.propTypes = {
    getEnrollmentChart: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getEnrollmentChart: () => dispatch(handleGetEnrollmentChart())
})

export default connect(null, mapDispatchToProps)(EnrollmentChart)
