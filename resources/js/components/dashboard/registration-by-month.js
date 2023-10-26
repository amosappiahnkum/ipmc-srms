import PropTypes from 'prop-types'
import React from 'react'
import {connect, useSelector} from "react-redux";
import {handleGetEnrollmentChart} from "../../actions/commons/CommonAction";
import Chart from 'react-apexcharts'
import {Card} from "antd";

function RegistrationByMonth() {
    const registrations = useSelector(state => state.commonReducer.enrollmentChart?.byMonth)
    const data = {
        series: [{
            name: 'Registration',
            data: Object.values(registrations)
        }],
        options: {
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    borderRadius: 10,
                    // columnWidth: '10%',
                    dataLabels: {
                        position: 'top', // top, center, bottom
                    },
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val) {
                    return val;
                },
                offsetY: -20,
                style: {
                    fontSize: '12px',
                    colors: ["#304758"]
                }
            },

            xaxis: {
                categories: Object.keys(registrations),
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                crosshairs: {
                    fill: {
                        type: 'gradient',
                        gradient: {
                            colorFrom: '#D8E3F0',
                            colorTo: '#BED1E6',
                            stops: [0, 100],
                            opacityFrom: 0.4,
                            opacityTo: 0.5,
                        }
                    }
                },
                tooltip: {
                    enabled: true,
                }
            },
            yaxis: {
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false,
                },
                labels: {
                    show: false,
                    formatter: function (val) {
                        return val;
                    }
                }

            },
            title: {
                floating: true,
                offsetY: 330,
                align: 'center',
                style: {
                    color: '#444'
                }
            }
        },
    }

    return (
        <Card title={'Registration by Month'}>
            <Chart options={data?.options} series={data?.series} type="bar" height={350}/>
        </Card>
    )
}

RegistrationByMonth.propTypes = {
    getEnrollmentChart: PropTypes.func,
}

const mapDispatchToProps = (dispatch) => ({
    getEnrollmentChart: () => dispatch(handleGetEnrollmentChart())
})

export default connect(null, mapDispatchToProps)(RegistrationByMonth)
