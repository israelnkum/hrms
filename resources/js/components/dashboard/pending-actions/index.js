import { Card, Spin } from "antd";
import React, { useEffect, useState } from 'react'
import { AiOutlineNotification } from "react-icons/ai";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function PendingActions() {
    const [loading, setLoading] = useState(true)
    useEffect(() => {

    }, [])

    return (
        <Card
            title={
                <div className={ 'flex items-center justify-between gap-x-2' }>
                    <div className={'flex gap-2 items-center'}>
                        <AiOutlineNotification className={ 'text-3xl' }/>
                        What is happening in TTU?
                    </div>
                    <div>
                        <Link to={'/announcements'} className={'bg-blue-800 text-white p-1 text-sm rounded-lg'}>
                            Announcements
                        </Link>
                    </div>
                </div>
            }
            className={ 'px-4 rounded-lg border-none shadow-sm h-full' }>
            <Spin spinning={ loading }>
                <div>

                </div>
            </Spin>
        </Card>
    )
}

PendingActions.propTypes = {
}

const mapStateToProps = (state) => ({
    leaveTypes: state.timeOffReducer.leaveTypes
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(PendingActions)
