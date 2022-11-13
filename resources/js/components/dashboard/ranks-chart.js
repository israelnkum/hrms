import React, {useState} from 'react'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import {Card} from "antd";

function RanksChart ({ ranks }) {
    const data ={
        options: {
            labels: ranks.series,
            chart: {
                type: 'donut',
            },
            legend: {
              position: 'bottom'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        }
    }
    return (
        <Card title={'RANKS'} size={'small'}>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Chart
                options={data.options}
                series={ranks.values}
                type="donut"
                height={320}
                width={400}
            />
            </div>
        </Card>
    )
}

RanksChart.propTypes = {
    ranks: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        ranks : state.commonReducer.commons.dashboard.ranks
    }
}

export default connect(mapStateToProps)(RanksChart)
