import React from 'react'
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { FiUser } from "react-icons/fi";

const NumberItem = ({ title, value}) => (
    <div className={`rounded bg-white w-[150px] md:w-[200px] h-[150px] md:h-[125px] p-3`}>
        <h5 className={'text-sm'}>{title}</h5>
        <div className={'flex justify-between items-center h-full'}>
            <div>
                <h2 className={'text-2xl font-bold'}>{value}</h2>
            </div>

            <div>
                <FiUser className={'text-5xl'}/>
            </div>
        </div>
    </div>
)


NumberItem.propTypes = {
    title: PropTypes.string,
    otherClass: PropTypes.string,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
}

export default connect()(NumberItem)
