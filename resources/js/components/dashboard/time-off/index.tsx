import { Button, Spin, Card } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from 'react'
import { AiOutlineFieldTime } from "react-icons/ai";
import { connect } from "react-redux";
import { handleGetLeaveTypes } from "../../../actions/time-off/TimeOffAction";
import Slider from "react-slick";
import TlaAddNew from "../../../commons/tla-add-new";
import ValidateComponent from "../../../commons/validate-component";

function TimeOff({getLeaveTypes, leaveTypes}) {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        getLeaveTypes().then(() => setLoading(false))
    }, [])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Card
            title={
                <div className={ 'flex items-center gap-x-2' }>
                    <AiOutlineFieldTime className={ 'text-3xl' }/>
                    Leave Request
                </div>
            }
            className={ 'px-2 rounded-lg border-none shadow-sm w-full' }>
            <Spin spinning={ loading }>
                <div className={'hidden md:block'}>
                    <Slider { ...settings }>
                        {
                            leaveTypes.map(({id, name}) => (
                                <div key={ id } className={ 'p-3 border-r border-l min-h-[80px]' }>
                                    <div className={ 'flex items-center justify-center m-2' }>
                                        <h6 className={ 'text-center' }>{ name }</h6>
                                    </div>
                                </div>
                            ))
                        }
                    </Slider>
                </div>
                <div className={ 'mt-3' }>
                    <ValidateComponent permissions={['request-leave']}>
                        <TlaAddNew link={ '/time-off/form' }>
                            <Button icon={ <AiOutlineFieldTime className={ 'text-2xl' }/> }
                                    block size={ 'large' }
                                    className={ 'btn-primary' }>&nbsp;Request for leave</Button>
                        </TlaAddNew>
                    </ValidateComponent>
                </div>
            </Spin>
        </Card>
    )
}

TimeOff.propTypes = {
    getLeaveTypes: PropTypes.func.isRequired,
    leaveTypes: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
    leaveTypes: state.timeOffReducer.leaveTypes
})

const mapDispatchToProps = (dispatch) => ({
    getLeaveTypes: () => dispatch(handleGetLeaveTypes())
})

export default connect(mapStateToProps, mapDispatchToProps)(TimeOff)
