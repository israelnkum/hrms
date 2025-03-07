import { Card, Spin } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { BsCalendar3 } from "react-icons/bs";
import { connect } from "react-redux";
import { handleGetWhoIsOut } from "../../../actions/commons/CommonAction";

function WhoIsOut({getWhoIsOut}) {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getWhoIsOut().then((res) => {
            console.log(res.data)
            setLoading(false)
        })
    }, [])


    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <BsCalendar3 className={ 'text-xl' }/>
                    <p>Who&rsquo;s out?</p>
                </div>
            }
            className={ 'rounded-lg border-none shadow-sm' }>
            <Spin spinning={ loading }>

            </Spin>
        </Card>
    )
}

WhoIsOut.propTypes = {
    getWhoIsOut: PropTypes.func.isRequired,
    whoIsOut: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    whoIsOut: state.commonReducer.whoIsOut
})

const mapDispatchToProps = (dispatch) => ({
    getWhoIsOut: () => dispatch(handleGetWhoIsOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(WhoIsOut)
