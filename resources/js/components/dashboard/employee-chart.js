import React, {useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {Card} from "antd";

function EmployeeChart ({ departments }) {
    const data = {
        series: [{
            name: 'Total',
            data: departments.values
        }],
        options: {
            labels: departments.series,
            colors: [ // this array contains different color code for each data
                "#33b2df",
                "#546E7A",
                "#d4526e",
                "#13d8aa",
                "#A5978B",
                "#2b908f",
                "#f9a3a4",
                "#90ee7e",
                "#f48024",
                "#69d2e7"
            ],
            legend: {
                show: false,
                position: 'right'
            },
            chart: {
                height: 350,
                type: 'bar',
            },
            plotOptions: {
                bar: {
                    distributed: true,
                    borderRadius: 10,
                    dataLabels: {
                        position: 'top', // top, center, right
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
                categories: departments.series,
                position: 'top',
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                tooltip: {
                    enabled: false,
                },
                labels: {
                    show: false
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
                    show: true,
                    formatter: function (val) {
                        return val;
                    }
                }
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: '90%'
                    },
                    legend: {
                        show: false,
                        position: 'right'
                    }
                }
            }]
        }
    }

    return (
        <Card size={'small'} title={'DEPARTMENT EMPLOYEE COUNT'} style={{ padding: 10}}>
            <Chart
                options={data.options}
                series={data.series}
                type="bar"
                height={250}
                width={'85%'}
            />
        </Card>
    )
}

EmployeeChart.propTypes = {
    departments: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        departments : state.commonReducer.commons.dashboard.departments
    }
}

export default connect(mapStateToProps)(EmployeeChart)
